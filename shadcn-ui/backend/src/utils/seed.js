const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create countries
  const countries = [
    { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', exchangeRate: 850 },
    { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭', exchangeRate: 12 },
    { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪', exchangeRate: 150 },
    { code: 'UG', name: 'Uganda', currency: 'UGX', flag: '🇺🇬', exchangeRate: 3700 },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS', flag: '🇹🇿', exchangeRate: 2500 },
    { code: 'SN', name: 'Senegal', currency: 'XOF', flag: '🇸🇳', exchangeRate: 600 },
    { code: 'CI', name: 'Côte d\'Ivoire', currency: 'XOF', flag: '🇨🇮', exchangeRate: 600 },
    { code: 'CM', name: 'Cameroon', currency: 'XAF', flag: '🇨🇲', exchangeRate: 600 }
  ];

  await prisma.country.createMany({
    data: countries
  });

  // Create exchange rates
  const exchangeRates = [
    { fromCurrency: 'USD', toCurrency: 'NGN', rate: 850 },
    { fromCurrency: 'USD', toCurrency: 'GHS', rate: 12 },
    { fromCurrency: 'USD', toCurrency: 'KES', rate: 150 },
    { fromCurrency: 'USD', toCurrency: 'UGX', rate: 3700 },
    { fromCurrency: 'USD', toCurrency: 'TZS', rate: 2500 },
    { fromCurrency: 'USD', toCurrency: 'XOF', rate: 600 },
    { fromCurrency: 'USD', toCurrency: 'XAF', rate: 600 }
  ];

  await prisma.exchangeRate.createMany({
    data: exchangeRates
  });

  // Create bill providers
  const billProviders = [
    { name: 'EKEDC', category: 'electricity', country: 'NG', logo: '/images/EKEDCLogo.jpg' },
    { name: 'IKEDC', category: 'electricity', country: 'NG', logo: '/images/IKEDC.jpg' },
    { name: 'DStv', category: 'tv', country: 'NG', logo: '/images/DStv.jpg' },
    { name: 'GOtv', category: 'tv', country: 'NG', logo: '/images/GOtv.jpg' },
    { name: 'MTN', category: 'mobile', country: 'NG', logo: '/images/MTN.jpg' },
    { name: 'Airtel', category: 'mobile', country: 'NG', logo: '/images/Airtel.jpg' },
    { name: 'ECG', category: 'electricity', country: 'GH', logo: '/images/Electricity.jpg' },
    { name: 'Ghana Water', category: 'water', country: 'GH', logo: '/images/GhanaWaterCompany.jpg' },
    { name: 'KPLC', category: 'electricity', country: 'KE', logo: '/images/KPLCLogo.jpg' },
    { name: 'Safaricom', category: 'mobile', country: 'KE', logo: '/images/Mobile.jpg' }
  ];

  await prisma.billProvider.createMany({
    data: billProviders
  });

  // Create mobile money providers
  const mobileMoneyProviders = [
    { name: 'M-Pesa', logo: '/images/MPesa.jpg', countries: 'KE,TZ' },
    { name: 'MTN MoMo', logo: '/images/MTNMoMo.jpg', countries: 'GH,UG,CI' },
    { name: 'Airtel Money', logo: '/images/AirtelMoney.jpg', countries: 'KE,UG,TZ' },
    { name: 'Orange Money', logo: '/images/Orange.jpg', countries: 'SN,CI,CM' },
    { name: 'Tigo Pesa', logo: '/images/TigoPesa.jpg', countries: 'TZ' }
  ];

  await prisma.mobileMoneyProvider.createMany({
    data: mobileMoneyProviders
  });

  // Create product categories
  const productCategories = [
    { name: 'Electronics', icon: '📱', color: '#3B82F6' },
    { name: 'Fashion', icon: '👕', color: '#EF4444' },
    { name: 'Home & Garden', icon: '🏠', color: '#10B981' },
    { name: 'Books', icon: '📚', color: '#8B5CF6' },
    { name: 'Sports', icon: '⚽', color: '#F59E0B' },
    { name: 'Beauty', icon: '💄', color: '#EC4899' }
  ];

  for (const category of productCategories) {
    await prisma.productCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  // Get category IDs for products
  const categories = await prisma.productCategory.findMany();
  const electronicsCategory = categories.find(c => c.name === 'Electronics');
  const fashionCategory = categories.find(c => c.name === 'Fashion');
  const homeCategory = categories.find(c => c.name === 'Home & Garden');

  // Create sample products
  const products = [
    {
      categoryId: electronicsCategory.id,
      name: 'Samsung Galaxy Phone',
      description: 'Latest Samsung smartphone with advanced features',
      price: 599,
      image: '/images/SamsungGalaxy.jpg',
      seller: 'TechStore Nigeria',
      rating: 4.5,
      stock: 25
    },
    {
      categoryId: electronicsCategory.id,
      name: 'Apple MacBook Air',
      description: 'Lightweight laptop perfect for professionals',
      price: 1299,
      image: '/images/MacBookAir.jpg',
      seller: 'Apple Store Ghana',
      rating: 4.8,
      stock: 10
    },
    {
      categoryId: fashionCategory.id,
      name: 'African Print Dress',
      description: 'Beautiful traditional African print dress',
      price: 45,
      image: '/images/AfricanDress.jpg',
      seller: 'Fashion Hub Kenya',
      rating: 4.3,
      stock: 50
    },
    {
      categoryId: homeCategory.id,
      name: 'Solar Panel Kit',
      description: 'Complete solar energy solution for homes',
      price: 850,
      image: '/images/SolarPanel.jpg',
      seller: 'Green Energy Solutions',
      rating: 4.6,
      stock: 15
    }
  ];

  await prisma.product.createMany({
    data: products
  });

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@noblepay.com' },
    update: {},
    create: {
      email: 'demo@noblepay.com',
      phone: '+1234567890',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      country: 'NG',
      isVerified: true,
      accounts: {
        create: {
          accountType: 'wallet',
          balance: 1000,
          currency: 'USD'
        }
      }
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log(`📧 Demo user created: demo@noblepay.com / demo123`);
  console.log(`💰 Demo wallet balance: $1,000`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });