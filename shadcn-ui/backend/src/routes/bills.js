const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get bill providers
router.get('/providers', async (req, res) => {
  try {
    const { category, country } = req.query;
    
    const where = { isActive: true };
    if (category) where.category = category;
    if (country) where.country = country;

    const providers = await prisma.billProvider.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json({ providers });
  } catch (error) {
    console.error('Get bill providers error:', error);
    res.status(500).json({ error: 'Failed to get bill providers' });
  }
});

// Pay bill
router.post('/pay', authMiddleware, [
  body('providerId').isUUID(),
  body('accountNumber').trim().isLength({ min: 1 }),
  body('amount').isFloat({ min: 0.01 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { providerId, accountNumber, amount } = req.body;

    // Verify provider exists
    const provider = await prisma.billProvider.findUnique({
      where: { id: providerId }
    });

    if (!provider) {
      return res.status(404).json({ error: 'Bill provider not found' });
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

    // Generate bill reference
    const reference = `BILL${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Process payment
    const bill = await prisma.$transaction(async (tx) => {
      // Deduct from wallet
      await tx.account.update({
        where: { id: wallet.id },
        data: { balance: { decrement: amount } }
      });

      // Create bill record
      const newBill = await tx.bill.create({
        data: {
          userId: req.user.id,
          providerId,
          accountNumber,
          amount,
          reference,
          status: 'paid',
          paidAt: new Date()
        },
        include: {
          provider: true
        }
      });

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'bill',
          amount,
          currency: 'USD',
          reference,
          description: `Bill payment to ${provider.name}`,
          status: 'completed',
          metadata: {
            providerId,
            accountNumber,
            providerName: provider.name
          }
        }
      });

      return newBill;
    });

    res.status(201).json({
      message: 'Bill paid successfully',
      bill: {
        id: bill.id,
        reference: bill.reference,
        amount: bill.amount,
        provider: bill.provider.name,
        accountNumber: bill.accountNumber,
        status: bill.status,
        paidAt: bill.paidAt
      }
    });
  } catch (error) {
    console.error('Bill payment error:', error);
    res.status(500).json({ error: 'Failed to pay bill' });
  }
});

// Get bill history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bills = await prisma.bill.findMany({
      where: { userId: req.user.id },
      include: { provider: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.bill.count({
      where: { userId: req.user.id }
    });

    res.json({
      bills,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get bill history error:', error);
    res.status(500).json({ error: 'Failed to get bill history' });
  }
});

module.exports = router;