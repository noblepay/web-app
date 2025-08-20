const express = require('express');
const { prisma } = require('../config/database');

const router = express.Router();

// Get all supported countries
router.get('/', async (req, res) => {
  try {
    const countries = await prisma.country.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });

    res.json({ countries });
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({ error: 'Failed to get countries' });
  }
});

// Get country by code
router.get('/:code', async (req, res) => {
  try {
    const country = await prisma.country.findUnique({
      where: { code: req.params.code.toUpperCase() }
    });

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    res.json({ country });
  } catch (error) {
    console.error('Get country error:', error);
    res.status(500).json({ error: 'Failed to get country' });
  }
});

module.exports = router;