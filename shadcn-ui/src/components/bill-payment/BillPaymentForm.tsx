import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Zap, Droplets, Wifi, Tv, Smartphone, DollarSign, Clock, CheckCircle } from 'lucide-react';

const BillPaymentForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('electricity');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');

  const countries = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' }
  ];

  const serviceProviders = {
    'NG': {
      electricity: [
        { id: 'nepa', name: 'NEPA/PHCN', type: 'Prepaid/Postpaid' },
        { id: 'eko-electric', name: 'Eko Electric', type: 'Postpaid' },
        { id: 'ikeja-electric', name: 'Ikeja Electric', type: 'Prepaid/Postpaid' },
        { id: 'abuja-electric', name: 'Abuja Electric', type: 'Postpaid' }
      ],
      water: [
        { id: 'lagos-water', name: 'Lagos Water Corporation', type: 'Municipal' },
        { id: 'abuja-water', name: 'Abuja Water Board', type: 'Municipal' }
      ],
      internet: [
        { id: 'mtn-ng', name: 'MTN Nigeria', type: 'Mobile Internet' },
        { id: 'airtel-ng', name: 'Airtel Nigeria', type: 'Mobile Internet' },
        { id: 'spectranet', name: 'Spectranet', type: 'Fiber Internet' },
        { id: 'swift', name: 'Swift Networks', type: 'Fiber Internet' }
      ],
      tv: [
        { id: 'dstv-ng', name: 'DStv Nigeria', type: 'Satellite TV' },
        { id: 'gotv-ng', name: 'GOtv Nigeria', type: 'Digital TV' },
        { id: 'startimes-ng', name: 'StarTimes Nigeria', type: 'Digital TV' }
      ]
    },
    'GH': {
      electricity: [
        { id: 'ecg', name: 'ECG (Electricity Company of Ghana)', type: 'Prepaid/Postpaid' },
        { id: 'nedco', name: 'NEDCo', type: 'Postpaid' },
        { id: 'enclave', name: 'Enclave Power', type: 'Prepaid' }
      ],
      water: [
        { id: 'gwcl', name: 'Ghana Water Company Limited', type: 'Municipal' },
        { id: 'avrl', name: 'Aqua Vitens Rand Limited', type: 'Private' }
      ],
      internet: [
        { id: 'vodafone-gh', name: 'Vodafone Ghana', type: 'Mobile/Fiber' },
        { id: 'airteltigo', name: 'AirtelTigo', type: 'Mobile Internet' },
        { id: 'surfline', name: 'Surfline Communications', type: 'Fiber Internet' }
      ],
      tv: [
        { id: 'dstv-gh', name: 'DStv Ghana', type: 'Satellite TV' },
        { id: 'gotv-gh', name: 'GOtv Ghana', type: 'Digital TV' },
        { id: 'multitv', name: 'MultiTV', type: 'Digital TV' }
      ]
    }
  };

  const categories = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-[#dd3333]' },
    { id: 'water', name: 'Water', icon: Droplets, color: 'text-blue-600' },
    { id: 'internet', name: 'Internet', icon: Wifi, color: 'text-green-600' },
    { id: 'tv', name: 'TV/Cable', icon: Tv, color: 'text-purple-600' },
    { id: 'mobile', name: 'Mobile Data', icon: Smartphone, color: 'text-orange-600' }
  ];

  const currentProviders = selectedCountry && serviceProviders[selectedCountry as keyof typeof serviceProviders] 
    ? serviceProviders[selectedCountry as keyof typeof serviceProviders][selectedCategory as keyof typeof serviceProviders['NG']] || []
    : [];

  const verifyAccount = () => {
    // Simulate account verification
    if (accountNumber.length >= 8) {
      setCustomerName('John Doe'); // Mock customer name
    }
  };

  const calculateTotal = () => {
    const baseAmount = parseFloat(amount) || 0;
    const fee = 1.50;
    return baseAmount + fee;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#dd3333]" />
          Pay Your Bills
        </CardTitle>
        <CardDescription>
          Select your service provider and pay your bills instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country Selection */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service Category */}
        <div className="space-y-2">
          <Label>Service Category</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="h-auto p-3 flex-col gap-1"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className={`h-5 w-5 ${category.color}`} />
                <span className="text-xs">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Service Provider */}
        {selectedCountry && currentProviders.length > 0 && (
          <div className="space-y-2">
            <Label>Service Provider</Label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your provider" />
              </SelectTrigger>
              <SelectContent>
                {currentProviders.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex flex-col">
                      <span>{provider.name}</span>
                      <span className="text-xs text-gray-500">{provider.type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Account/Meter Number */}
        <div className="space-y-2">
          <Label htmlFor="account">Account/Meter Number</Label>
          <div className="flex gap-2">
            <Input
              id="account"
              placeholder="Enter your account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={verifyAccount}
              disabled={!accountNumber || accountNumber.length < 8}
            >
              Verify
            </Button>
          </div>
          {customerName && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Account verified: {customerName}</span>
            </div>
          )}
        </div>

        {/* Amount */}
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
              className="pl-10"
            />
          </div>
        </div>

        {/* Payment Options */}
        <Tabs defaultValue="one-time" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-time Payment</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="one-time">
            <div className="text-sm text-gray-600">
              Pay this bill once immediately after confirmation.
            </div>
          </TabsContent>

          <TabsContent value="recurring" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Transaction Summary */}
        {amount && selectedProvider && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bill Amount:</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee:</span>
                <span className="font-medium">$1.50</span>
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

        {/* Payment Button */}
        <Button 
          className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white"
          disabled={!selectedProvider || !accountNumber || !amount}
        >
          <Zap className="h-4 w-4 mr-2" />
          Pay Bill Now
        </Button>

        {/* Processing Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <Clock className="h-4 w-4 text-blue-600" />
          <span>Payment will be processed instantly and confirmation sent via SMS/Email</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillPaymentForm;