import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Percent, Clock, Star, Zap, Globe, Users } from 'lucide-react';

const PromoOffers = () => {
  const featuredOffers = [
    {
      id: 1,
      title: 'MTN Ghana Bonus Weekend',
      description: 'Get 50% extra airtime on all top-ups above $20',
      discount: '50% Bonus',
      provider: 'MTN Ghana',
      validUntil: '2024-01-31',
      minAmount: 20,
      maxBonus: 25,
      color: 'bg-[#dd3333]',
      logo: '📱'
    },
    {
      id: 2,
      title: 'Airtel Nigeria Data Boost',
      description: 'Double data on all 5GB and 10GB bundles',
      discount: '100% Data',
      provider: 'Airtel Nigeria',
      validUntil: '2024-02-15',
      minAmount: 12,
      maxBonus: 20,
      color: 'bg-red-600',
      logo: '📲'
    },
    {
      id: 3,
      title: 'Orange Money Special',
      description: 'Free international calls credit with data bundles',
      discount: 'Free Calls',
      provider: 'Orange Liberia',
      validUntil: '2024-01-28',
      minAmount: 15,
      maxBonus: 10,
      color: 'bg-orange-500',
      logo: '🧡'
    }
  ];

  const regularOffers = [
    {
      title: 'First Time Bonus',
      description: 'Get $5 bonus on your first mobile recharge',
      discount: '$5 Bonus',
      condition: 'New users only',
      icon: Gift,
      color: 'text-green-600'
    },
    {
      title: 'Bulk Top-Up Discount',
      description: 'Save 5% on top-ups above $100',
      discount: '5% Off',
      condition: 'Min. $100 top-up',
      icon: Percent,
      color: 'text-blue-600'
    },
    {
      title: 'Family Plan Special',
      description: 'Top-up 3+ numbers and get 10% off each',
      discount: '10% Off',
      condition: '3+ recipients',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Weekend Flash Sale',
      description: 'Extra 25% airtime every Saturday & Sunday',
      discount: '25% Extra',
      condition: 'Weekends only',
      icon: Clock,
      color: 'text-[#dd3333]'
    }
  ];

  const internationalOffers = [
    {
      title: 'Global SIM Card',
      description: 'Stay connected in 200+ countries with our international SIM',
      price: '$29.99',
      features: ['200+ Countries', '4G/5G Data', 'Local Numbers', 'No Roaming Fees'],
      popular: true
    },
    {
      title: 'Roaming Data Pass',
      description: 'Affordable data packages for travelers',
      price: 'From $9.99',
      features: ['1GB - 10GB Options', '30-Day Validity', 'High-Speed 4G', 'Easy Activation'],
      popular: false
    },
    {
      title: 'International Calling',
      description: 'Cheap international calls to West Africa',
      price: '$0.05/min',
      features: ['Low Per-Minute Rates', 'Crystal Clear Quality', 'No Connection Fees', '24/7 Access'],
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Featured Promotions */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-6 w-6 text-[#dd3333]" />
          <h2 className="text-2xl font-bold">Featured Promotions</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOffers.map((offer) => (
            <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-4 right-4">
                <Badge className="bg-[#dd3333] text-white">
                  {offer.discount}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 ${offer.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {offer.logo}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                    <p className="text-sm text-gray-600">{offer.provider}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {offer.description}
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Min. Amount:</span>
                    <span className="font-medium">${offer.minAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max. Bonus:</span>
                    <span className="font-medium">${offer.maxBonus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <span className="font-medium">{offer.validUntil}</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Regular Offers */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Gift className="h-6 w-6 text-[#dd3333]" />
          <h2 className="text-2xl font-bold">Special Offers</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {regularOffers.map((offer, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <offer.icon className={`h-8 w-8 ${offer.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{offer.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {offer.discount}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{offer.description}</p>
                    <p className="text-xs text-gray-500">{offer.condition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* International Services */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-6 w-6 text-[#dd3333]" />
          <h2 className="text-2xl font-bold">International Services</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {internationalOffers.map((service, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-shadow ${
              service.popular ? 'ring-2 ring-[#dd3333]' : ''
            }`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#dd3333] text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <div className="text-2xl font-bold text-[#dd3333]">{service.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#dd3333] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    service.popular 
                      ? 'bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900' 
                      : ''
                  }`}
                  variant={service.popular ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Terms Notice */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Terms & Conditions</h4>
            <p className="text-sm text-gray-600">
              All promotional offers are subject to terms and conditions. Offers may vary by provider and region. 
              Bonus amounts and discounts are applied automatically at checkout. International services require 
              separate registration and may have additional fees.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromoOffers;