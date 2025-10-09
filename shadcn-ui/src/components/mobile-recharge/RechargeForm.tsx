import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Zap, Globe, Clock, DollarSign } from 'lucide-react';

const RechargeForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [rechargeType, setRechargeType] = useState('airtime');
  const [amount, setAmount] = useState('');

  const countries = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', prefix: '+234' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', prefix: '+233' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷', prefix: '+231' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', prefix: '+232' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳', prefix: '+224' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', prefix: '+226' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', prefix: '+223' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', prefix: '+225' }
  ];

  const providers = {
    'NG': [
      { id: 'mtn-ng', name: 'MTN Nigeria', logo: '📱', color: 'bg-[#dd3333]', users: '77M+' },
      { id: 'airtel-ng', name: 'Airtel Nigeria', logo: '📲', color: 'bg-[#dd3333]', users: '61M+' },
      { id: 'glo-ng', name: 'Glo Mobile', logo: '🟢', color: 'bg-green-600', users: '55M+' },
      { id: '9mobile-ng', name: '9mobile', logo: '🟡', color: 'bg-green-500', users: '20M+' }
    ],
    'GH': [
      { id: 'mtn-gh', name: 'MTN Ghana', logo: '📱', color: 'bg-[#dd3333]', users: '25M+' },
      { id: 'vodafone-gh', name: 'Vodafone Ghana', logo: '📶', color: 'bg-red-600', users: '12M+' },
      { id: 'airteltigo-gh', name: 'AirtelTigo', logo: '📲', color: 'bg-[#dd3333]', users: '8M+' }
    ],
    'LR': [
      { id: 'lonestar-lr', name: 'Lonestar Cell MTN', logo: '⭐', color: 'bg-[#dd3333]', users: '2M+' },
      { id: 'orange-lr', name: 'Orange Liberia', logo: '🧡', color: 'bg-orange-500', users: '1.5M+' }
    ],
    'SL': [
      { id: 'africell-sl', name: 'Africell Sierra Leone', logo: '🌍', color: 'bg-blue-600', users: '2.5M+' },
      { id: 'orange-sl', name: 'Orange Sierra Leone', logo: '🧡', color: 'bg-orange-500', users: '1.8M+' }
    ],
    'GN': [
      { id: 'mtn-gn', name: 'MTN Guinea', logo: '📱', color: 'bg-[#dd3333]', users: '4M+' },
      { id: 'orange-gn', name: 'Orange Guinea', logo: '🧡', color: 'bg-orange-500', users: '3M+' },
      { id: 'africell-gn', name: 'Africell Guinea', logo: '🌍', color: 'bg-blue-600', users: '1M+' }
    ]
  };

  const quickAmounts = [10, 25, 50, 100];

  const dataBundles = [
    { size: '1GB', price: 3.50, validity: '30 days' },
    { size: '2GB', price: 6.00, validity: '30 days' },
    { size: '5GB', price: 12.00, validity: '30 days' },
    { size: '10GB', price: 20.00, validity: '30 days' },
    { size: '20GB', price: 35.00, validity: '30 days' }
  ];

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    // Auto-detect country and provider based on phone number
    if (value.length > 4) {
      const prefix = value.substring(0, 4);
      const country = countries.find(c => prefix.startsWith(c.prefix));
      if (country) {
        setSelectedCountry(country.code);
      }
    }
  };

  const calculateTotal = () => {
    const baseAmount = parseFloat(amount) || 0;
    const fee = 0.99;
    return baseAmount + fee;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#dd3333]" />
            Quick Mobile Recharge
          </CardTitle>
          <CardDescription>
            Send airtime or data to any mobile number across West Africa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Country and Phone Number */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="text-gray-500">({country.prefix})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-gray-500">
                We'll detect the provider automatically
              </p>
            </div>
          </div>

          {/* Provider Selection */}
          {selectedCountry && providers[selectedCountry as keyof typeof providers] && (
            <div className="space-y-2">
              <Label>Mobile Provider</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {providers[selectedCountry as keyof typeof providers].map(provider => (
                  <div
                    key={provider.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProvider === provider.id 
                        ? 'border-[#dd3333] bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{provider.logo}</span>
                      <span className="font-medium text-sm">{provider.name}</span>
                    </div>
                    <div className="text-xs text-gray-600">{provider.users} users</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recharge Type */}
          <Tabs value={rechargeType} onValueChange={setRechargeType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="airtime">Airtime</TabsTrigger>
              <TabsTrigger value="data">Data Bundles</TabsTrigger>
            </TabsList>

            <TabsContent value="airtime" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-lg"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="text-xs"
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Data Bundle</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dataBundles.map((bundle, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        amount === bundle.price.toString() 
                          ? 'border-[#dd3333] bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setAmount(bundle.price.toString())}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{bundle.size}</div>
                          <div className="text-sm text-gray-600">{bundle.validity}</div>
                        </div>
                        <div className="text-lg font-bold text-[#dd3333]">
                          ${bundle.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Transaction Summary */}
          {amount && selectedProvider && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Transaction Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {rechargeType === 'airtime' ? 'Airtime Amount:' : 'Data Bundle:'}
                  </span>
                  <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span className="font-medium">$0.99</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-[#dd3333]">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
            <Clock className="h-4 w-4 text-green-600" />
            <span>
              {rechargeType === 'airtime' ? 'Airtime' : 'Data'} will be delivered within 30 seconds
            </span>
          </div>

          {/* Submit Button */}
          <Button 
            className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white"
            disabled={!phoneNumber || !selectedProvider || !amount}
          >
            <Zap className="h-4 w-4 mr-2" />
            Send {rechargeType === 'airtime' ? 'Airtime' : 'Data'} Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RechargeForm;