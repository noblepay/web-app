const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Send money (remittance)
router.post('/send', authMiddleware, [
  body('recipientPhone').isMobilePhone(),
  body('recipientName').trim().isLength({ min: 1 }),
  body('amount').isFloat({ min: 0.01 }),
  body('currency').isIn(['USD', 'NGN', 'GHS', 'KES', 'UGX', 'TZS', 'XOF', 'XAF']),
  body('recipientCountry').trim().isLength({ min: 2 }),
  body('purpose').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipientPhone, recipientName, amount, currency, recipientCountry, purpose } = req.body;

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

    // Calculate fee (2% of amount, minimum $1)
    const fee = Math.max(amount * 0.02, 1);
    const totalAmount = parseFloat(amount) + fee;

    if (wallet.balance < totalAmount) {
      return res.status(400).json({ error: 'Insufficient balance including fees' });
    }

    // Generate transaction reference
    const reference = `REM${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create transaction
    const transaction = await prisma.$transaction(async (tx) => {
      // Deduct from sender's wallet
      await tx.account.update({
        where: { id: wallet.id },
        data: { balance: { decrement: totalAmount } }
      });

      // Create transaction record
      const newTransaction = await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'remittance',
          amount: amount,
          currency: currency,
          fee: fee,
          recipientInfo: {
            phone: recipientPhone,
            name: recipientName,
            country: recipientCountry
          },
          description: purpose || 'Money transfer',
          reference: reference,
          status: 'completed'
        }
      });

      return newTransaction;
    });

    res.status(201).json({
      message: 'Money sent successfully',
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        fee: transaction.fee,
        currency: transaction.currency,
        recipientInfo: transaction.recipientInfo,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    });
  } catch (error) {
    console.error('Remittance error:', error);
    res.status(500).json({ error: 'Failed to send money' });
  }
});

// Get remittance history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.id,
        type: 'remittance'
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.transaction.count({
      where: {
        userId: req.user.id,
        type: 'remittance'
      }
    });

    res.json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get remittance history error:', error);
    res.status(500).json({ error: 'Failed to get remittance history' });
  }
});

// Get exchange rates
router.get('/rates', async (req, res) => {
  try {
    const rates = await prisma.exchangeRate.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    // If no rates in database, return default rates
    if (rates.length === 0) {
      const defaultRates = [
        { fromCurrency: 'USD', toCurrency: 'NGN', rate: 850 },
        { fromCurrency: 'USD', toCurrency: 'GHS', rate: 12 },
        { fromCurrency: 'USD', toCurrency: 'KES', rate: 150 },
        { fromCurrency: 'USD', toCurrency: 'UGX', rate: 3700 },
        { fromCurrency: 'USD', toCurrency: 'TZS', rate: 2500 },
        { fromCurrency: 'USD', toCurrency: 'XOF', rate: 600 },
        { fromCurrency: 'USD', toCurrency: 'XAF', rate: 600 }
      ];
      return res.json({ rates: defaultRates });
    }

    res.json({ rates });
  } catch (error) {
    console.error('Get exchange rates error:', error);
    res.status(500).json({ error: 'Failed to get exchange rates' });
  }
});

module.exports = router;