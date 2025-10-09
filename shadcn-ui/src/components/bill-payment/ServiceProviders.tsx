import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Zap, Droplets, Wifi, Tv, Smartphone, Star } from 'lucide-react';

const ServiceProviders = () => {
  const [selectedCountry, setSelectedCountry] = useState('NG');
  const [searchTerm, setSearchTerm] = useState('');

  const countries = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' }
  ];

  const serviceProviders = {
    'NG': {
      electricity: [
        { 
          name: 'NEPA/PHCN', 
          type: 'National Power Authority',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Nationwide',
          rating: 4.2,
          users: '45M+',
          processingTime: 'Instant'
        },
        { 
          name: 'Eko Electric', 
          type: 'Distribution Company',
          services: ['Postpaid Bills'],
          coverage: 'Lagos State',
          rating: 4.5,
          users: '8M+',
          processingTime: 'Instant'
        },
        { 
          name: 'Ikeja Electric', 
          type: 'Distribution Company',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Lagos State',
          rating: 4.3,
          users: '6M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'Lagos Water Corporation', 
          type: 'Municipal Water Service',
          services: ['Monthly Bills'],
          coverage: 'Lagos State',
          rating: 4.0,
          users: '12M+',
          processingTime: '2-5 minutes'
        },
        { 
          name: 'Abuja Water Board', 
          type: 'Municipal Water Service',
          services: ['Monthly Bills'],
          coverage: 'FCT Abuja',
          rating: 3.8,
          users: '3M+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'MTN Nigeria', 
          type: 'Mobile Network Operator',
          services: ['Data Plans', 'Home Internet'],
          coverage: 'Nationwide',
          rating: 4.6,
          users: '77M+',
          processingTime: 'Instant'
        },
        { 
          name: 'Airtel Nigeria', 
          type: 'Mobile Network Operator',
          services: ['Data Plans', 'Home Internet'],
          coverage: 'Nationwide',
          rating: 4.4,
          users: '61M+',
          processingTime: 'Instant'
        },
        { 
          name: 'Spectranet', 
          type: 'Internet Service Provider',
          services: ['Fiber Internet', 'Wireless'],
          coverage: 'Major Cities',
          rating: 4.7,
          users: '500K+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'DStv Nigeria', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.8,
          users: '15M+',
          processingTime: 'Instant'
        },
        { 
          name: 'GOtv Nigeria', 
          type: 'Digital TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.5,
          users: '8M+',
          processingTime: 'Instant'
        }
      ]
    },
    'GH': {
      electricity: [
        { 
          name: 'ECG (Electricity Company of Ghana)', 
          type: 'National Electricity Provider',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Southern Ghana',
          rating: 4.1,
          users: '4M+',
          processingTime: 'Instant'
        },
        { 
          name: 'NEDCo', 
          type: 'Northern Electricity Distribution',
          services: ['Postpaid Bills'],
          coverage: 'Northern Ghana',
          rating: 3.9,
          users: '1.5M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'Ghana Water Company Limited', 
          type: 'National Water Provider',
          services: ['Monthly Bills'],
          coverage: 'Nationwide',
          rating: 4.0,
          users: '8M+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'Vodafone Ghana', 
          type: 'Mobile & Internet Provider',
          services: ['Mobile Data', 'Fiber Internet'],
          coverage: 'Nationwide',
          rating: 4.5,
          users: '12M+',
          processingTime: 'Instant'
        },
        { 
          name: 'AirtelTigo', 
          type: 'Mobile Network Operator',
          services: ['Mobile Data', 'Home Internet'],
          coverage: 'Nationwide',
          rating: 4.3,
          users: '8M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'DStv Ghana', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.8,
          users: '2M+',
          processingTime: 'Instant'
        },
        { 
          name: 'MultiTV', 
          type: 'Digital TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Major Cities',
          rating: 4.4,
          users: '800K+',
          processingTime: 'Instant'
        }
      ]
    },
    'CI': {
      electricity: [
        { 
          name: 'CIE (Compagnie Ivoirienne d\'Électricité)', 
          type: 'National Electricity Provider',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Nationwide',
          rating: 4.2,
          users: '6M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'SODECI', 
          type: 'National Water Provider',
          services: ['Monthly Bills'],
          coverage: 'Nationwide',
          rating: 4.1,
          users: '5M+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'Orange Côte d\'Ivoire', 
          type: 'Mobile & Internet Provider',
          services: ['Mobile Data', 'Fiber Internet'],
          coverage: 'Nationwide',
          rating: 4.4,
          users: '15M+',
          processingTime: 'Instant'
        },
        { 
          name: 'MTN Côte d\'Ivoire', 
          type: 'Mobile Network Operator',
          services: ['Mobile Data', 'Home Internet'],
          coverage: 'Nationwide',
          rating: 4.3,
          users: '12M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'Canal+ Côte d\'Ivoire', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.7,
          users: '1.5M+',
          processingTime: 'Instant'
        }
      ]
    },
    'BF': {
      electricity: [
        { 
          name: 'SONABEL', 
          type: 'National Electricity Provider',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Nationwide',
          rating: 4.0,
          users: '2M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'ONEA', 
          type: 'National Water Provider',
          services: ['Monthly Bills'],
          coverage: 'Nationwide',
          rating: 3.9,
          users: '1.8M+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'Orange Burkina Faso', 
          type: 'Mobile & Internet Provider',
          services: ['Mobile Data', 'Fiber Internet'],
          coverage: 'Nationwide',
          rating: 4.2,
          users: '8M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'Canal+ Burkina', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.6,
          users: '600K+',
          processingTime: 'Instant'
        }
      ]
    },
    'BJ': {
      electricity: [
        { 
          name: 'SBEE', 
          type: 'Société Béninoise d\'Énergie Électrique',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Nationwide',
          rating: 4.1,
          users: '2M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'SONEB', 
          type: 'Société Nationale des Eaux du Bénin',
          services: ['Monthly Bills'],
          coverage: 'Urban Areas',
          rating: 3.8,
          users: '1.5M+',
          processingTime: 'Instant'
        }
      ],
      internet: [
        { 
          name: 'MTN Benin', 
          type: 'Mobile Network Operator',
          services: ['Mobile Data', 'Home Internet'],
          coverage: 'Nationwide',
          rating: 4.3,
          users: '6M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'Canal+ Benin', 
          type: 'Satellite TV Provider',
          services: ['Monthly Subscription'],
          coverage: 'Nationwide',
          rating: 4.5,
          users: '800K+',
          processingTime: 'Instant'
        }
      ]
    },
    'LR': {
      electricity: [
        { 
          name: 'LEC', 
          type: 'Liberia Electricity Corporation',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Major Cities',
          rating: 3.8,
          users: '800K+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'LWSC', 
          type: 'Liberia Water and Sewer Corporation',
          services: ['Monthly Bills'],
          coverage: 'Major Cities',
          rating: 3.7,
          users: '600K+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'Orange Liberia', 
          type: 'Mobile & Internet Provider',
          services: ['Mobile Data'],
          coverage: 'Nationwide',
          rating: 4.1,
          users: '2M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'DStv Liberia', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.6,
          users: '300K+',
          processingTime: 'Instant'
        }
      ]
    },
    'SL': {
      electricity: [
        { 
          name: 'EDSA', 
          type: 'Electricity Distribution & Supply Authority',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Nationwide',
          rating: 3.9,
          users: '1.2M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'Guma Valley Water Company', 
          type: 'Municipal Water Provider',
          services: ['Monthly Bills'],
          coverage: 'Freetown Area',
          rating: 3.8,
          users: '800K+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'Orange Sierra Leone', 
          type: 'Mobile & Internet Provider',
          services: ['Mobile Data'],
          coverage: 'Nationwide',
          rating: 4.2,
          users: '4M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'DStv Sierra Leone', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.7,
          users: '400K+',
          processingTime: 'Instant'
        }
      ]
    },
    'GN': {
      electricity: [
        { 
          name: 'EDG', 
          type: 'Électricité de Guinée',
          services: ['Prepaid', 'Postpaid'],
          coverage: 'Major Cities',
          rating: 3.7,
          users: '1.5M+',
          processingTime: 'Instant'
        }
      ],
      water: [
        { 
          name: 'SEG', 
          type: 'Société des Eaux de Guinée',
          services: ['Monthly Bills'],
          coverage: 'Major Cities',
          rating: 3.6,
          users: '1M+',
          processingTime: '2-5 minutes'
        }
      ],
      internet: [
        { 
          name: 'Orange Guinea', 
          type: 'Mobile & Internet Provider',
          services: ['Mobile Data', 'Home Internet'],
          coverage: 'Nationwide',
          rating: 4.1,
          users: '6M+',
          processingTime: 'Instant'
        }
      ],
      tv: [
        { 
          name: 'Canal+ Guinea', 
          type: 'Satellite TV Provider',
          services: ['Subscription Packages'],
          coverage: 'Nationwide',
          rating: 4.5,
          users: '500K+',
          processingTime: 'Instant'
        }
      ]
    }
  };

  const categories = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-[#dd3333]' },
    { id: 'water', name: 'Water', icon: Droplets, color: 'text-blue-600' },
    { id: 'internet', name: 'Internet', icon: Wifi, color: 'text-green-600' },
    { id: 'tv', name: 'TV/Cable', icon: Tv, color: 'text-purple-600' }
  ];

  const currentProviders = serviceProviders[selectedCountry as keyof typeof serviceProviders] || {};

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Country Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#dd3333]" />
            Service Providers by Country
          </CardTitle>
          <CardDescription>
            Browse available bill payment providers in each country
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Provider Categories */}
      <Tabs defaultValue="electricity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className={`h-4 w-4 ${category.color}`} />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentProviders[category.id as keyof typeof currentProviders] || []).map((provider, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        category.id === 'electricity' ? 'bg-red-100' :
                        category.id === 'water' ? 'bg-blue-100' :
                        category.id === 'internet' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        <category.icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.type}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium text-sm">{provider.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({provider.users} users)</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Coverage:</span>
                        <p className="text-gray-600">{provider.coverage}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Processing:</span>
                        <p className="text-gray-600">{provider.processingTime}</p>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                      <category.icon className="h-4 w-4 mr-2" />
                      Pay Bills
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Coverage Summary */}
      <Card className="bg-gradient-to-r from-red-50 to-gray-50 border-red-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-[#dd3333]" />
            <h3 className="text-xl font-semibold text-[#dd3333] mb-2">
              Comprehensive Service Provider Network
            </h3>
            <p className="text-gray-800 mb-4 max-w-2xl mx-auto">
              Our partnerships with leading service providers across West Africa ensure your 
              bill payments are processed instantly and securely, with 24/7 customer support.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">500+</div>
                <div className="text-sm text-gray-700">Service Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">200M+</div>
                <div className="text-sm text-gray-700">Customers Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">8</div>
                <div className="text-sm text-gray-700">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#dd3333]">99.8%</div>
                <div className="text-sm text-gray-700">Success Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceProviders;