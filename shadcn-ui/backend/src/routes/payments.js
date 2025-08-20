const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Send money to another user
router.post('/send', authMiddleware, [
  body('recipientEmail').isEmail().normalizeEmail(),
  body('amount').isFloat({ min: 0.01 }),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipientEmail, amount, description } = req.body;

    // Check if recipient exists
    const recipient = await prisma.user.findUnique({
      where: { email: recipientEmail },
      include: { accounts: { where: { accountType: 'wallet', isActive: true } } }
    });

    if (!recipient || recipient.accounts.length === 0) {
      return res.status(404).json({ error: 'Recipient not found or has no active wallet' });
    }

    // Check if trying to send to self
    if (recipient.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot send money to yourself' });
    }

    // Get sender's wallet
    const senderWallet = await prisma.account.findFirst({
      where: {
        userId: req.user.id,
        accountType: 'wallet',
        isActive: true
      }
    });

    if (!senderWallet || senderWallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const recipientWallet = recipient.accounts[0];
    const reference = `PAY${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Process transfer
    const transaction = await prisma.$transaction(async (tx) => {
      // Deduct from sender
      await tx.account.update({
        where: { id: senderWallet.id },
        data: { balance: { decrement: amount } }
      });

      // Credit recipient
      await tx.account.update({
        where: { id: recipientWallet.id },
        data: { balance: { increment: amount } }
      });

      // Create transaction record
      const newTransaction = await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'payment',
          amount,
          currency: 'USD',
          reference,
          description: description || `Payment to ${recipient.firstName} ${recipient.lastName}`,
          status: 'completed',
          recipientInfo: {
            email: recipient.email,
            name: `${recipient.firstName} ${recipient.lastName}`
          }
        }
      });

      return newTransaction;
    });

    res.status(201).json({
      message: 'Payment sent successfully',
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        recipient: `${recipient.firstName} ${recipient.lastName}`,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Failed to send payment' });
  }
});

// Generate QR code for payment
router.post('/qr/generate', authMiddleware, [
  body('amount').isFloat({ min: 0.01 }),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description } = req.body;
    const qrData = {
      userId: req.user.id,
      amount,
      description,
      timestamp: Date.now()
    };

    // In a real app, you'd generate an actual QR code image
    const qrCode = Buffer.from(JSON.stringify(qrData)).toString('base64');

    res.json({
      qrCode,
      data: qrData,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    });
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Pay using QR code
router.post('/qr/pay', authMiddleware, [
  body('qrCode').isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { qrCode } = req.body;

    // Decode QR data
    let qrData;
    try {
      qrData = JSON.parse(Buffer.from(qrCode, 'base64').toString());
    } catch {
      return res.status(400).json({ error: 'Invalid QR code' });
    }

    // Check if QR code is expired (15 minutes)
    if (Date.now() - qrData.timestamp > 15 * 60 * 1000) {
      return res.status(400).json({ error: 'QR code has expired' });
    }

    // Get merchant info
    const merchant = await prisma.user.findUnique({
      where: { id: qrData.userId },
      include: { accounts: { where: { accountType: 'wallet', isActive: true } } }
    });

    if (!merchant || merchant.accounts.length === 0) {
      return res.status(404).json({ error: 'Merchant not found' });
    }

    // Check if trying to pay self
    if (merchant.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot pay yourself' });
    }

    // Get payer's wallet
    const payerWallet = await prisma.account.findFirst({
      where: {
        userId: req.user.id,
        accountType: 'wallet',
        isActive: true
      }
    });

    if (!payerWallet || payerWallet.balance < qrData.amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const merchantWallet = merchant.accounts[0];
    const reference = `QR${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Process QR payment
    const transaction = await prisma.$transaction(async (tx) => {
      // Deduct from payer
      await tx.account.update({
        where: { id: payerWallet.id },
        data: { balance: { decrement: qrData.amount } }
      });

      // Credit merchant
      await tx.account.update({
        where: { id: merchantWallet.id },
        data: { balance: { increment: qrData.amount } }
      });

      // Create transaction record
      const newTransaction = await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'payment',
          amount: qrData.amount,
          currency: 'USD',
          reference,
          description: qrData.description || `QR Payment to ${merchant.firstName} ${merchant.lastName}`,
          status: 'completed',
          recipientInfo: {
            name: `${merchant.firstName} ${merchant.lastName}`,
            qrPayment: true
          }
        }
      });

      return newTransaction;
    });

    res.status(201).json({
      message: 'QR payment successful',
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        merchant: `${merchant.firstName} ${merchant.lastName}`,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    });
  } catch (error) {
    console.error('QR payment error:', error);
    res.status(500).json({ error: 'Failed to process QR payment' });
  }
});

// Get payment history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.id,
        type: 'payment'
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.transaction.count({
      where: {
        userId: req.user.id,
        type: 'payment'
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
    console.error('Get payment history error:', error);
    res.status(500).json({ error: 'Failed to get payment history' });
  }
});

module.exports = router;