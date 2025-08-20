const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get mobile money providers
router.get('/providers', async (req, res) => {
  try {
    const { country } = req.query;
    
    const where = { isActive: true };
    if (country) {
      where.countries = { has: country };
    }

    const providers = await prisma.mobileMoneyProvider.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json({ providers });
  } catch (error) {
    console.error('Get mobile money providers error:', error);
    res.status(500).json({ error: 'Failed to get mobile money providers' });
  }
});

// Top up mobile money
router.post('/topup', authMiddleware, [
  body('providerId').isUUID(),
  body('phone').isMobilePhone(),
  body('amount').isFloat({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { providerId, phone, amount } = req.body;

    // Verify provider exists
    const provider = await prisma.mobileMoneyProvider.findUnique({
      where: { id: providerId }
    });

    if (!provider) {
      return res.status(404).json({ error: 'Mobile money provider not found' });
    }

    // Get user's wallet
    const wallet = await prisma.account.findFirst({
      where: {
        userId: req.user.id,
        accountType: 'wallet',
        isActive: true
      }
    });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Generate topup reference
    const reference = `TOPUP${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Process topup
    const topup = await prisma.$transaction(async (tx) => {
      // Deduct from wallet
      await tx.account.update({
        where: { id: wallet.id },
        data: { balance: { decrement: amount } }
      });

      // Create topup record
      const newTopup = await tx.mobileMoneyTopup.create({
        data: {
          userId: req.user.id,
          providerId,
          phone,
          amount,
          reference,
          status: 'completed'
        },
        include: {
          provider: true
        }
      });

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'topup',
          amount,
          currency: 'USD',
          reference,
          description: `Mobile money topup - ${provider.name}`,
          status: 'completed',
          metadata: {
            providerId,
            phone,
            providerName: provider.name
          }
        }
      });

      return newTopup;
    });

    res.status(201).json({
      message: 'Mobile money topup successful',
      topup: {
        id: topup.id,
        reference: topup.reference,
        amount: topup.amount,
        provider: topup.provider.name,
        phone: topup.phone,
        status: topup.status,
        createdAt: topup.createdAt
      }
    });
  } catch (error) {
    console.error('Mobile money topup error:', error);
    res.status(500).json({ error: 'Failed to process mobile money topup' });
  }
});

// Get topup history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const topups = await prisma.mobileMoneyTopup.findMany({
      where: { userId: req.user.id },
      include: { provider: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.mobileMoneyTopup.count({
      where: { userId: req.user.id }
    });

    res.json({
      topups,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get topup history error:', error);
    res.status(500).json({ error: 'Failed to get topup history' });
  }
});

module.exports = router;