import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, DollarSign, Smartphone, Building2, Users, CheckCircle, Star } from 'lucide-react';

const PayoutMethods = () => {
  const [selectedCountry, setSelectedCountry] = useState('NG');

  const countries = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', currency: 'XOF' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', currency: 'XOF' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯', currency: 'XOF' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷', currency: 'LRD' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', currency: 'SLL' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳', currency: 'GNF' }
  ];

  const payoutMethods = {
    NG: {
      banks: [
        { name: 'GTBank', logo: '🏦', fee: '$2.99', time: '1-4 hours', rating: 4.8, coverage: 'Nationwide' },
        { name: 'Access Bank', logo: '🏦', fee: '$2.99', time: '1-4 hours', rating: 4.7, coverage: 'Nationwide' },
        { name: 'Zenith Bank', logo: '🏦', fee: '$2.99', time: '1-4 hours', rating: 4.6, coverage: 'Nationwide' },
        { name: 'UBA', logo: '🏦', fee: '$2.99', time: '1-4 hours', rating: 4.5, coverage: 'Nationwide' },
        { name: 'First Bank', logo: '🏦', fee: '$2.99', time: '1-4 hours', rating: 4.4, coverage: 'Nationwide' }
      ],
      mobile: [
        { name: 'MTN MoMo', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.9, coverage: '35M+ users' },
        { name: 'Airtel Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.7, coverage: '20M+ users' },
        { name: 'Glo Mobile Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.5, coverage: '15M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.6, coverage: '2,500+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.5, coverage: '1,800+ locations' },
        { name: 'MoneyGram', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.4, coverage: '1,200+ locations' }
      ]
    },
    GH: {
      banks: [
        { name: 'GCB Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.7, coverage: 'Nationwide' },
        { name: 'Ecobank Ghana', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.6, coverage: 'Nationwide' },
        { name: 'Standard Chartered', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.5, coverage: 'Major cities' },
        { name: 'Absa Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.4, coverage: 'Nationwide' }
      ],
      mobile: [
        { name: 'MTN Mobile Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.8, coverage: '18M+ users' },
        { name: 'Vodafone Cash', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.6, coverage: '12M+ users' },
        { name: 'AirtelTigo Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.5, coverage: '8M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.5, coverage: '800+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.4, coverage: '600+ locations' }
      ]
    },
    CI: {
      banks: [
        { name: 'Ecobank Côte d\'Ivoire', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.6, coverage: 'Nationwide' },
        { name: 'SGBCI', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.5, coverage: 'Major cities' },
        { name: 'BICICI', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.4, coverage: 'Nationwide' },
        { name: 'UBA Côte d\'Ivoire', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.3, coverage: 'Major cities' }
      ],
      mobile: [
        { name: 'Orange Money CI', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.8, coverage: '15M+ users' },
        { name: 'MTN Mobile Money CI', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.7, coverage: '12M+ users' },
        { name: 'Moov Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.5, coverage: '8M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.5, coverage: '600+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.4, coverage: '400+ locations' }
      ]
    },
    BF: {
      banks: [
        { name: 'Ecobank Burkina', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.5, coverage: 'Nationwide' },
        { name: 'BOA Burkina Faso', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.4, coverage: 'Major cities' },
        { name: 'Coris Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.3, coverage: 'Nationwide' },
        { name: 'UBA Burkina Faso', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.2, coverage: 'Major cities' }
      ],
      mobile: [
        { name: 'Orange Money BF', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.7, coverage: '8M+ users' },
        { name: 'Coris Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.5, coverage: '3M+ users' },
        { name: 'Telecel Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.3, coverage: '2M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.4, coverage: '300+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.3, coverage: '200+ locations' }
      ]
    },
    BJ: {
      banks: [
        { name: 'Ecobank Benin', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.5, coverage: 'Nationwide' },
        { name: 'BOA Benin', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.4, coverage: 'Major cities' },
        { name: 'UBA Benin', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.3, coverage: 'Major cities' },
        { name: 'Diamond Bank Benin', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.2, coverage: 'Urban areas' }
      ],
      mobile: [
        { name: 'MTN Mobile Money Benin', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.6, coverage: '6M+ users' },
        { name: 'Moov Money Benin', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.4, coverage: '4M+ users' },
        { name: 'Libercom Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.2, coverage: '2M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.3, coverage: '250+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.2, coverage: '180+ locations' }
      ]
    },
    LR: {
      banks: [
        { name: 'Ecobank Liberia', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.3, coverage: 'Major cities' },
        { name: 'UBA Liberia', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.2, coverage: 'Major cities' },
        { name: 'First National Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.1, coverage: 'Urban areas' },
        { name: 'LBDI Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.0, coverage: 'Major cities' }
      ],
      mobile: [
        { name: 'Orange Money Liberia', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.4, coverage: '2M+ users' },
        { name: 'Lonestar Cell MTN', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.2, coverage: '1.8M+ users' },
        { name: 'Novafone Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.0, coverage: '800K+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.2, coverage: '150+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.1, coverage: '120+ locations' }
      ]
    },
    SL: {
      banks: [
        { name: 'Ecobank Sierra Leone', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.2, coverage: 'Major cities' },
        { name: 'UBA Sierra Leone', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.1, coverage: 'Major cities' },
        { name: 'Sierra Leone Commercial Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.0, coverage: 'Nationwide' },
        { name: 'Rokel Commercial Bank', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 3.9, coverage: 'Major cities' }
      ],
      mobile: [
        { name: 'Orange Money SL', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.3, coverage: '4M+ users' },
        { name: 'Africell Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.1, coverage: '3M+ users' },
        { name: 'Qcell Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 3.9, coverage: '1.5M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.1, coverage: '100+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 4.0, coverage: '80+ locations' }
      ]
    },
    GN: {
      banks: [
        { name: 'Ecobank Guinea', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.1, coverage: 'Major cities' },
        { name: 'UBA Guinea', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 4.0, coverage: 'Major cities' },
        { name: 'Société Générale Guinea', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 3.9, coverage: 'Urban areas' },
        { name: 'BICIGUI', logo: '🏦', fee: '$2.99', time: '2-6 hours', rating: 3.8, coverage: 'Major cities' }
      ],
      mobile: [
        { name: 'Orange Money Guinea', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.2, coverage: '6M+ users' },
        { name: 'MTN Mobile Money Guinea', logo: '📱', fee: '$1.99', time: 'Instant', rating: 4.0, coverage: '4M+ users' },
        { name: 'Cellcom Money', logo: '📱', fee: '$1.99', time: 'Instant', rating: 3.8, coverage: '2M+ users' }
      ],
      cash: [
        { name: 'Ria Money Transfer', logo: '🏪', fee: '$4.99', time: '15 minutes', rating: 4.0, coverage: '120+ locations' },
        { name: 'Western Union', logo: '🏪', fee: '$5.99', time: '15 minutes', rating: 3.9, coverage: '100+ locations' }
      ]
    }
  };

  const currentCountry = countries.find(c => c.code === selectedCountry);
  const currentMethods = payoutMethods[selectedCountry as keyof typeof payoutMethods] || payoutMethods.NG;

  const renderMethodCard = (method: any, type: string) => (
    <Card key={method.name} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{method.logo}</div>
            <div>
              <h4 className="font-medium">{method.name}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{method.rating}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {type === 'banks' ? 'Bank' : type === 'mobile' ? 'Mobile' : 'Cash'}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Fee:</span>
            <span className="font-medium">{method.fee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-medium">{method.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Coverage:</span>
            <span className="font-medium text-xs">{method.coverage}</span>
          </div>
        </div>
        
        <Button className="w-full mt-4" size="sm">
          Select Method
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Country Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Destination Country
          </CardTitle>
          <CardDescription>
            Choose the country where your recipient will receive the money
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

      {/* Payout Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{currentCountry?.flag}</span>
            Payout Methods in {currentCountry?.name}
          </CardTitle>
          <CardDescription>
            Choose how your recipient will receive the money
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="banks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="banks" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Bank Transfer
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Money
              </TabsTrigger>
              <TabsTrigger value="cash" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Cash Pickup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="banks" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">Bank Transfer Options</h3>
                <Badge className="bg-blue-100 text-blue-800">Most Popular</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentMethods.banks?.map(method => renderMethodCard(method, 'banks'))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">Bank Transfer Benefits</p>
                    <ul className="text-blue-800 space-y-1">
                      <li>• Direct deposit to recipient's bank account</li>
                      <li>• Secure and trackable transactions</li>
                      <li>• Available 24/7 for most banks</li>
                      <li>• Higher transfer limits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium">Mobile Money Options</h3>
                <Badge className="bg-green-100 text-green-800">Fastest</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentMethods.mobile?.map(method => renderMethodCard(method, 'mobile'))}
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-900 mb-1">Mobile Money Benefits</p>
                    <ul className="text-green-800 space-y-1">
                      <li>• Instant delivery to mobile wallet</li>
                      <li>• No bank account required</li>
                      <li>• Lower fees than other methods</li>
                      <li>• Wide accessibility in rural areas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cash" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-medium">Cash Pickup Options</h3>
                <Badge className="bg-orange-100 text-orange-800">No Account Needed</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentMethods.cash?.map(method => renderMethodCard(method, 'cash'))}
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-900 mb-1">Cash Pickup Benefits</p>
                    <ul className="text-orange-800 space-y-1">
                      <li>• No bank account or mobile wallet required</li>
                      <li>• Available at thousands of agent locations</li>
                      <li>• Recipient gets cash in hand immediately</li>
                      <li>• Perfect for recipients without bank access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Coverage Map Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Extensive Payout Network
            </h3>
            <p className="text-blue-800 mb-4 max-w-2xl mx-auto">
              Our partnerships with leading financial institutions across West Africa ensure your recipients 
              can access their money through the most convenient method available in their location.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">150+</div>
                <div className="text-sm text-blue-700">Bank Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">25+</div>
                <div className="text-sm text-blue-700">Mobile Money Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">8,000+</div>
                <div className="text-sm text-blue-700">Cash Pickup Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">99.9%</div>
                <div className="text-sm text-blue-700">Successful Deliveries</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutMethods;