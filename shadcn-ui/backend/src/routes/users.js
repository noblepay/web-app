const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user dashboard data
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Get user with accounts
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        accounts: true
      }
    });

    // Get recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get transaction stats for current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyStats = await prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId: req.user.id,
        createdAt: { gte: startOfMonth }
      },
      _sum: { amount: true },
      _count: { id: true }
    });

    // Calculate total wallet balance
    const totalBalance = user.accounts
      .filter(acc => acc.isActive)
      .reduce((sum, acc) => sum + parseFloat(acc.balance), 0);

    const dashboard = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
        country: user.country
      },
      accounts: user.accounts,
      totalBalance,
      recentTransactions,
      monthlyStats: monthlyStats.reduce((acc, stat) => {
        acc[stat.type] = {
          count: stat._count.id,
          amount: parseFloat(stat._sum.amount || 0)
        };
        return acc;
      }, {})
    };

    res.json({ dashboard });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

// Search users (for payments)
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 3) {
      return res.status(400).json({ error: 'Search query must be at least 3 characters' });
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: req.user.id } }, // Exclude current user
          {
            OR: [
              { email: { contains: q, mode: 'insensitive' } },
              { firstName: { contains: q, mode: 'insensitive' } },
              { lastName: { contains: q, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        country: true
      },
      take: 10
    });

    res.json({ users });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

module.exports = router;