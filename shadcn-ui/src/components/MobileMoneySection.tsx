import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Zap, Shield, Users, Plus, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function MobileMoneySection() {
  const [topupAmount, setTopupAmount] = useState('20');

  const mobileProviders = [
    { 
      name: 'MTN Mobile Money', 
      logo: '📱', 
      color: 'bg-[#dd3333]', 
      countries: ['Ghana', 'Nigeria', 'Benin'],
      users: '50M+'
    },
    { 
      name: 'Airtel Money', 
      logo: '📲', 
      color: 'bg-[#dd3333]', 
      countries: ['Nigeria', 'Chad', 'Niger', 'Sierra Leone', 'Guinea'],
      users: '28M+'
    },
    { 
      name: 'Orange Money', 
      logo: '🧡', 
      color: 'bg-[#dd3333]', 
      countries: ['Mali', 'Burkina Faso', 'Liberia', 'Sierra Leone', 'Guinea'],
      users: '20M+'
    },
    { 
      name: 'Moov Money', 
      logo: '💙', 
      color: 'bg-[#000000]', 
      countries: ['Benin', 'Togo', 'Ivory Coast', 'Burkina Faso'],
      users: '8M+'
    },
    { 
      name: 'Lonestar Cell MTN', 
      logo: '⭐', 
      color: 'bg-[#dd3333]', 
      countries: ['Liberia'],
      users: '2M+'
    },
    { 
      name: 'Africell Money', 
      logo: '🌍', 
      color: 'bg-[#dd3333]', 
      countries: ['Sierra Leone', 'Guinea'],
      users: '3M+'
    },
  ];

  const features = [
    { icon: Zap, title: 'Instant Top-ups', desc: 'Add money to any mobile wallet instantly' },
    { icon: Shield, title: 'Secure Integration', desc: 'Direct API connections with all major providers' },
    { icon: Users, title: 'Wide Coverage', desc: 'Reach 110M+ mobile money users across West Africa' },
    { icon: Wallet, title: 'Multi-Wallet', desc: 'Manage multiple mobile money accounts in one app' },
  ];

  return (
    <section id="mobile-money">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-[#dd3333]">
            <Smartphone className="w-4 h-4 mr-1" />
            Mobile Money Integration
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect to Every Mobile Wallet
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Top up any mobile money account across West Africa. Direct integration 
            with MTN, Airtel, Orange Money, Lonestar Cell, Africell, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mobile Providers */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Supported Mobile Money Providers</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {mobileProviders.map((provider, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${provider.color} rounded-full flex items-center justify-center text-white text-2xl`}>
                        {provider.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{provider.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{provider.users} users</p>
                        <div className="flex flex-wrap gap-1">
                          {provider.countries.map((country) => (
                            <Badge key={country} variant="secondary" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <feature.icon className="w-8 h-8 mb-3 text-[#dd3333]" />
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Top-up Interface */}
          <div>
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#dd3333]" />
                  Quick Top-up
                </CardTitle>
                <CardDescription>
                  Add money to any mobile wallet instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll detect the provider automatically
                  </p>
                </div>

                <div>
                  <Label htmlFor="topup-amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <Input
                      id="topup-amount"
                      type="number"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                      className="pl-8 text-lg"
                      placeholder="20"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['10', '25', '50', '100'].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setTopupAmount(amount)}
                        className="text-xs"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-red-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Top-up Amount</span>
                    <span className="font-semibold">${topupAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Fee</span>
                    <span className="font-semibold">$0.99</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-[#dd3333]">
                        ${(parseFloat(topupAmount) + 0.99).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Top Up Now
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Money will be added to the mobile wallet within 30 seconds
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}