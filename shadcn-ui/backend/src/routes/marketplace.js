const express = require('express');
const { body, validationResult } = require('express-validator');
const { prisma } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get product categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get products
router.get('/products', async (req, res) => {
  try {
    const { categoryId, search, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isActive: true };
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit)
    });

    const total = await prisma.product.count({ where });

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// Place order
router.post('/orders', authMiddleware, [
  body('items').isArray({ min: 1 }),
  body('items.*.productId').isUUID(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('shippingAddress').isObject(),
  body('paymentMethod').isIn(['wallet', 'card'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, shippingAddress, paymentMethod } = req.body;

    // Get products and calculate total
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Check wallet balance if payment method is wallet
    if (paymentMethod === 'wallet') {
      const wallet = await prisma.account.findFirst({
        where: {
          userId: req.user.id,
          accountType: 'wallet',
          isActive: true
        }
      });

      if (!wallet || wallet.balance < total) {
        return res.status(400).json({ error: 'Insufficient wallet balance' });
      }
    }

    // Generate order reference
    const reference = `ORD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order
    const order = await prisma.$transaction(async (tx) => {
      // Deduct from wallet if payment method is wallet
      if (paymentMethod === 'wallet') {
        const wallet = await tx.account.findFirst({
          where: {
            userId: req.user.id,
            accountType: 'wallet',
            isActive: true
          }
        });

        await tx.account.update({
          where: { id: wallet.id },
          data: { balance: { decrement: total } }
        });
      }

      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: req.user.id,
          total,
          shippingAddress,
          paymentMethod,
          reference,
          status: paymentMethod === 'wallet' ? 'confirmed' : 'pending',
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: { product: true }
          }
        }
      });

      // Update product stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'marketplace',
          amount: total,
          currency: 'USD',
          reference,
          description: 'Marketplace purchase',
          status: 'completed',
          metadata: {
            orderId: newOrder.id,
            itemCount: items.length
          }
        }
      });

      return newOrder;
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: order.id,
        reference: order.reference,
        total: order.total,
        status: order.status,
        items: order.items,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get user orders
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.order.count({
      where: { userId: req.user.id }
    });

    res.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

module.exports = router;