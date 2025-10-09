import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Globe, DollarSign, Clock, Shield, TrendingDown, Zap } from 'lucide-react';
import { useState } from 'react';

export default function RemittanceSection() {
  const countries = [
    { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', rate: 1650 },
    { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭', rate: 12.5 },
    { code: 'CI', name: 'Côte d\'Ivoire', currency: 'XOF', flag: '🇨🇮', rate: 615 },
    { code: 'BF', name: 'Burkina Faso', currency: 'XOF', flag: '🇧🇫', rate: 615 },
    { code: 'BJ', name: 'Benin', currency: 'XOF', flag: '🇧🇯', rate: 615 },
    { code: 'LR', name: 'Liberia', currency: 'LRD', flag: '🇱🇷', rate: 185 },
    { code: 'SL', name: 'Sierra Leone', currency: 'SLL', flag: '🇸🇱', rate: 22500 },
    { code: 'GN', name: 'Guinea', currency: 'GNF', flag: '🇬🇳', rate: 8750 },
  ];

  const [sendAmount, setSendAmount] = useState('100');
  const [selectedCountry, setSelectedCountry] = useState('NG');
  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];
  const receiveAmount = (parseFloat(sendAmount) * currentCountry.rate).toLocaleString();

  const features = [
    { icon: TrendingDown, title: 'Low Fees', desc: 'From $2.99 per transfer', color: 'text-[#dd3333]' },
    { icon: Zap, title: 'Fast Transfer', desc: 'Money arrives in minutes', color: 'text-[#000000]' },
    { icon: Shield, title: 'Secure', desc: 'Bank-level encryption', color: 'text-[#dd3333]' },
    { icon: DollarSign, title: 'Transparent', desc: 'Real-time exchange rates', color: 'text-[#000000]' },
  ];

  return (
    <section id="remittance">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-[#dd3333]">
            <Globe className="w-4 h-4 mr-1" />
            Cross-Border Remittance
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Send Money from US to West Africa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transfer money instantly with transparent exchange rates and low fees. 
            Your family receives more money, faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Transfer Calculator */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#dd3333]" />
                Send Money Calculator
              </CardTitle>
              <CardDescription>
                See exactly how much your recipient will receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="send-amount">You Send</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="send-amount"
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="pl-10"
                      placeholder="100"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">USD</p>
                </div>
                <div>
                  <Label htmlFor="receive-country">To Country</Label>
                  <Select defaultValue="NG" onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-red-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Exchange Rate</span>
                  <span className="font-semibold">1 USD = {currentCountry.rate.toLocaleString()} {currentCountry.currency}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Transfer Fee</span>
                  <span className="font-semibold">$2.99</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Recipient Gets</span>
                    <span className="text-2xl font-bold text-[#dd3333]">
                      {currentCountry.currency === 'NGN' ? '₦' : 
                       currentCountry.currency === 'GHS' ? '₵' : 
                       currentCountry.currency === 'LRD' ? 'L$' : 
                       currentCountry.currency === 'SLL' ? 'Le' : 
                       currentCountry.currency === 'GNF' ? 'FG' : 
                       currentCountry.currency === 'XOF' ? 'CFA' : ''}{receiveAmount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Money typically arrives in 1-5 minutes</span>
              </div>

              <Link to="/remittance">
                <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                  Send Money Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Why Choose NoblePay?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <feature.icon className={`w-8 h-8 mb-3 ${feature.color}`} />
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Supported Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country) => (
                    <div key={country.code} className="flex items-center gap-2 p-2 rounded-lg border">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-semibold text-sm">{country.name}</div>
                        <div className="text-xs text-gray-600">{country.currency}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}