const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Migration endpoint to seed Supabase with initial data
router.post('/migrate', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }

    console.log('Starting Supabase migration...');

    // Seed mobile money providers
    const mobileMoneyProviders = [
      {
        name: 'MTN Mobile Money',
        code: 'MTN_MOMO',
        country: 'GH',
        logo_url: '/images/MTNMoMo.jpg',
        supported_currencies: ['GHS', 'UGX', 'RWF'],
        fee_structure: {
          percentage: 2.5,
          minimum: 1.00,
          maximum: 50.00
        }
      },
      {
        name: 'Airtel Money',
        code: 'AIRTEL_MONEY',
        country: 'KE',
        logo_url: '/images/AirtelMoney.jpg',
        supported_currencies: ['KES', 'TZS', 'UGX'],
        fee_structure: {
          percentage: 2.0,
          minimum: 0.50,
          maximum: 30.00
        }
      },
      {
        name: 'M-Pesa',
        code: 'MPESA',
        country: 'KE',
        logo_url: '/images/MPesa.jpg',
        supported_currencies: ['KES'],
        fee_structure: {
          percentage: 1.5,
          minimum: 1.00,
          maximum: 25.00
        }
      },
      {
        name: 'Orange Money',
        code: 'ORANGE_MONEY',
        country: 'SN',
        logo_url: '/images/Orange.jpg',
        supported_currencies: ['XOF', 'XAF'],
        fee_structure: {
          percentage: 2.8,
          minimum: 2.00,
          maximum: 40.00
        }
      }
    ];

    const { data: providersData, error: providersError } = await supabase
      .from('mobile_money_providers')
      .upsert(mobileMoneyProviders, { onConflict: 'code' });

    if (providersError) throw providersError;

    // Seed bill providers
    const billProviders = [
      {
        name: 'Electricity Company of Ghana (ECG)',
        category: 'electricity',
        country: 'GH',
        logo_url: '/images/Electricity.jpg',
        fee_structure: {
          percentage: 1.0,
          minimum: 0.50,
          maximum: 10.00
        }
      },
      {
        name: 'Kenya Power (KPLC)',
        category: 'electricity',
        country: 'KE',
        logo_url: '/images/KPLCLogo.jpg',
        fee_structure: {
          percentage: 1.2,
          minimum: 1.00,
          maximum: 15.00
        }
      },
      {
        name: 'DStv',
        category: 'cable_tv',
        country: 'NG',
        logo_url: '/images/DStv.jpg',
        fee_structure: {
          percentage: 0.8,
          minimum: 0.30,
          maximum: 5.00
        }
      },
      {
        name: 'Ghana Water Company',
        category: 'water',
        country: 'GH',
        logo_url: '/images/GhanaWaterCompany.jpg',
        fee_structure: {
          percentage: 1.5,
          minimum: 0.75,
          maximum: 8.00
        }
      }
    ];

    const { data: billsData, error: billsError } = await supabase
      .from('bill_providers')
      .upsert(billProviders, { onConflict: 'name' });

    if (billsError) throw billsError;

    // Seed marketplace products
    const marketplaceProducts = [
      {
        vendor_id: '00000000-0000-0000-0000-000000000001', // Default vendor
        name: 'African Traditional Dress',
        description: 'Beautiful handcrafted traditional African clothing',
        price: 45.99,
        currency: 'USD',
        category: 'Fashion',
        image_url: '/images/AfricanDress.jpg',
        stock_quantity: 50
      },
      {
        vendor_id: '00000000-0000-0000-0000-000000000001',
        name: 'Samsung Galaxy Phone',
        description: 'Latest Samsung Galaxy smartphone with advanced features',
        price: 299.99,
        currency: 'USD',
        category: 'Electronics',
        image_url: '/images/SamsungGalaxy.jpg',
        stock_quantity: 25
      },
      {
        vendor_id: '00000000-0000-0000-0000-000000000001',
        name: 'MacBook Air',
        description: 'Apple MacBook Air with M1 chip - perfect for work and creativity',
        price: 899.99,
        currency: 'USD',
        category: 'Electronics',
        image_url: '/images/MacBookAir.jpg',
        stock_quantity: 10
      },
      {
        vendor_id: '00000000-0000-0000-0000-000000000001',
        name: 'Solar Panel Kit',
        description: 'Complete solar panel system for home energy solutions',
        price: 149.99,
        currency: 'USD',
        category: 'Home & Garden',
        image_url: '/images/SolarPanel.jpg',
        stock_quantity: 30
      }
    ];

    const { data: productsData, error: productsError } = await supabase
      .from('marketplace_products')
      .upsert(marketplaceProducts, { onConflict: 'name' });

    if (productsError) throw productsError;

    console.log('Supabase migration completed successfully');

    res.json({
      success: true,
      message: 'Supabase migration completed successfully',
      data: {
        mobileMoneyProviders: providersData?.length || 0,
        billProviders: billsData?.length || 0,
        marketplaceProducts: productsData?.length || 0
      }
    });

  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint for Supabase connection
router.get('/health', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ 
        status: 'unavailable',
        message: 'Supabase not configured'
      });
    }

    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) throw error;

    res.json({
      status: 'healthy',
      message: 'Supabase connection successful',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;