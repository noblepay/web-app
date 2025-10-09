import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Users, MapPin, Star } from 'lucide-react';

const ProviderSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState('NG');

  const countries = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' }
  ];

  const mobileProviders = {
    'NG': [
      { 
        name: 'MTN Mobile Money', 
        logo: '📱', 
        color: 'bg-[#dd3333]', 
        countries: ['Nigeria'],
        users: '77M+',
        rating: 4.8,
        features: ['Airtime', 'Data', 'Bill Payments', 'Money Transfer']
      },
      { 
        name: 'Airtel Money', 
        logo: '📲', 
        color: 'bg-[#dd3333]', 
        countries: ['Nigeria'],
        users: '61M+',
        rating: 4.7,
        features: ['Airtime', 'Data', 'International Transfer', 'Savings']
      },
      { 
        name: 'Glo Mobile Money', 
        logo: '🟢', 
        color: 'bg-green-600', 
        countries: ['Nigeria'],
        users: '55M+',
        rating: 4.5,
        features: ['Airtime', 'Data', 'Bill Payments']
      },
      { 
        name: '9mobile', 
        logo: '🟡', 
        color: 'bg-green-500', 
        countries: ['Nigeria'],
        users: '20M+',
        rating: 4.3,
        features: ['Airtime', 'Data', 'Voice Bundles']
      }
    ],
    'GH': [
      { 
        name: 'MTN Mobile Money', 
        logo: '📱', 
        color: 'bg-[#dd3333]', 
        countries: ['Ghana'],
        users: '25M+',
        rating: 4.9,
        features: ['Airtime', 'Data', 'Mobile Money', 'Bill Payments']
      },
      { 
        name: 'Vodafone Cash', 
        logo: '📶', 
        color: 'bg-red-600', 
        countries: ['Ghana'],
        users: '12M+',
        rating: 4.6,
        features: ['Airtime', 'Data', 'Money Transfer', 'Merchant Pay']
      },
      { 
        name: 'AirtelTigo Money', 
        logo: '📲', 
        color: 'bg-[#dd3333]', 
        countries: ['Ghana'],
        users: '8M+',
        rating: 4.5,
        features: ['Airtime', 'Data', 'International Transfer']
      }
    ],
    'LR': [
      { 
        name: 'Lonestar Cell MTN', 
        logo: '⭐', 
        color: 'bg-[#dd3333]', 
        countries: ['Liberia'],
        users: '2M+',
        rating: 4.6,
        features: ['Airtime', 'Data', 'Mobile Money', 'International']
      },
      { 
        name: 'Orange Money', 
        logo: '🧡', 
        color: 'bg-orange-500', 
        countries: ['Liberia'],
        users: '1.5M+',
        rating: 4.4,
        features: ['Airtime', 'Data', 'Money Transfer']
      }
    ],
    'SL': [
      { 
        name: 'Africell Money', 
        logo: '🌍', 
        color: 'bg-blue-600', 
        countries: ['Sierra Leone'],
        users: '2.5M+',
        rating: 4.5,
        features: ['Airtime', 'Data', 'Mobile Money', 'Bill Payments']
      },
      { 
        name: 'Orange Money', 
        logo: '🧡', 
        color: 'bg-orange-500', 
        countries: ['Sierra Leone'],
        users: '1.8M+',
        rating: 4.3,
        features: ['Airtime', 'Data', 'Money Transfer']
      }
    ],
    'GN': [
      { 
        name: 'MTN Guinea', 
        logo: '📱', 
        color: 'bg-[#dd3333]', 
        countries: ['Guinea'],
        users: '4M+',
        rating: 4.7,
        features: ['Airtime', 'Data', 'Mobile Money']
      },
      { 
        name: 'Orange Money', 
        logo: '🧡', 
        color: 'bg-orange-500', 
        countries: ['Guinea'],
        users: '3M+',
        rating: 4.4,
        features: ['Airtime', 'Data', 'Money Transfer']
      },
      { 
        name: 'Africell Money', 
        logo: '🌍', 
        color: 'bg-blue-600', 
        countries: ['Guinea'],
        users: '1M+',
        rating: 4.2,
        features: ['Airtime', 'Data', 'Mobile Money']
      }
    ]
  };

  const currentProviders = mobileProviders[selectedCountry as keyof typeof mobileProviders] || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Country Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#dd3333]" />
            Supported Mobile Money Providers
          </CardTitle>
          <CardDescription>
            Choose your country to see available mobile providers and their features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {countries.map(country => (
              <Button
                key={country.code}
                variant={selectedCountry === country.code ? "default" : "outline"}
                className="h-auto p-3 flex-col gap-2"
                onClick={() => setSelectedCountry(country.code)}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="text-sm font-medium">{country.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provider Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProviders.map((provider, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${provider.color} rounded-full flex items-center justify-center text-white text-2xl`}>
                  {provider.logo}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">{provider.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{provider.users} users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-2">Available Services:</h5>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <Button className="w-full" size="sm">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Select Provider
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coverage Summary */}
      <Card className="bg-gradient-to-r from-red-50 to-gray-50 border-red-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-[#dd3333]" />
            <h3 className="text-xl font-semibold text-[#dd3333] mb-2">
              Comprehensive Mobile Network Coverage
            </h3>
            <p className="text-gray-800 mb-4 max-w-2xl mx-auto">
              Our partnerships with leading mobile providers across West Africa ensure your 
              airtime and data top-ups reach recipients instantly, anywhere in the region.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">25+</div>
                <div className="text-sm text-gray-700">Mobile Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">110M+</div>
                <div className="text-sm text-gray-700">Mobile Users Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">8</div>
                <div className="text-sm text-gray-700">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">99.9%</div>
                <div className="text-sm text-gray-700">Success Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderSelector;