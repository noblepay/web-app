const express = require('express');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all transactions for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { userId: req.user.id };
    if (type) where.type = type;
    if (status) where.status = status;

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit)
    });

    const total = await prisma.transaction.count({ where });

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to get transactions' });
  }
});

// Get single transaction
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ error: 'Failed to get transaction' });
  }
});

// Get transaction statistics
router.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const stats = await prisma.transaction.groupBy({
      by: ['type', 'status'],
      where: {
        userId: req.user.id,
        createdAt: { gte: daysAgo }
      },
      _sum: { amount: true },
      _count: { id: true }
    });

    const summary = {
      totalTransactions: 0,
      totalAmount: 0,
      byType: {},
      byStatus: {}
    };

    stats.forEach(stat => {
      summary.totalTransactions += stat._count.id;
      summary.totalAmount += parseFloat(stat._sum.amount || 0);

      if (!summary.byType[stat.type]) {
        summary.byType[stat.type] = { count: 0, amount: 0 };
      }
      summary.byType[stat.type].count += stat._count.id;
      summary.byType[stat.type].amount += parseFloat(stat._sum.amount || 0);

      if (!summary.byStatus[stat.status]) {
        summary.byStatus[stat.status] = { count: 0, amount: 0 };
      }
      summary.byStatus[stat.status].count += stat._count.id;
      summary.byStatus[stat.status].amount += parseFloat(stat._sum.amount || 0);
    });

    res.json({ summary, period: parseInt(period) });
  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({ error: 'Failed to get transaction statistics' });
  }
});

module.exports = router;