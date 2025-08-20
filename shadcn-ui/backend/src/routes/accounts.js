const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user accounts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'asc' }
    });

    res.json({ accounts });
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ error: 'Failed to get accounts' });
  }
});

// Create new account
router.post('/', authMiddleware, [
  body('accountType').isIn(['wallet', 'savings', 'current']),
  body('currency').isIn(['USD', 'NGN', 'GHS', 'KES', 'UGX', 'TZS', 'XOF', 'XAF'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountType, currency } = req.body;

    // Check if user already has this type of account
    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: req.user.id,
        accountType,
        currency
      }
    });

    if (existingAccount) {
      return res.status(400).json({ error: `You already have a ${accountType} account in ${currency}` });
    }

    const account = await prisma.account.create({
      data: {
        userId: req.user.id,
        accountType,
        currency
      }
    });

    res.status(201).json({
      message: 'Account created successfully',
      account
    });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Get account balance
router.get('/:id/balance', authMiddleware, async (req, res) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({
      accountId: account.id,
      balance: account.balance,
      currency: account.currency,
      accountType: account.accountType
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Failed to get account balance' });
  }
});

// Fund account (simulate)
router.post('/:id/fund', authMiddleware, [
  body('amount').isFloat({ min: 0.01 }),
  body('method').isIn(['card', 'bank', 'cash'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, method } = req.body;

    const account = await prisma.account.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
        isActive: true
      }
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found or inactive' });
    }

    const reference = `FUND${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Fund account and create transaction
    const result = await prisma.$transaction(async (tx) => {
      // Credit account
      const updatedAccount = await tx.account.update({
        where: { id: account.id },
        data: { balance: { increment: amount } }
      });

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'funding',
          amount,
          currency: account.currency,
          reference,
          description: `Account funding via ${method}`,
          status: 'completed',
          metadata: {
            fundingMethod: method,
            accountId: account.id
          }
        }
      });

      return { account: updatedAccount, transaction };
    });

    res.status(201).json({
      message: 'Account funded successfully',
      account: {
        id: result.account.id,
        balance: result.account.balance,
        currency: result.account.currency
      },
      transaction: {
        id: result.transaction.id,
        reference: result.transaction.reference,
        amount: result.transaction.amount
      }
    });
  } catch (error) {
    console.error('Fund account error:', error);
    res.status(500).json({ error: 'Failed to fund account' });
  }
});

module.exports = router;