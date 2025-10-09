import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Zap, Clock, Shield, Users, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RechargeForm from '@/components/mobile-recharge/RechargeForm';
import ProviderSelector from '@/components/mobile-recharge/ProviderSelector';
import AutoTopUpSettings from '@/components/mobile-recharge/AutoTopUpSettings';
import PromoOffers from '@/components/mobile-recharge/PromoOffers';
import TransactionHistory from '@/components/mobile-recharge/TransactionHistory';

const MobileRecharge = () => {
  const [activeTab, setActiveTab] = useState('recharge');

  const features = [
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Airtime and data delivered within 30 seconds to any mobile wallet',
      color: 'text-[#dd3333]'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Direct integration with telecom providers for guaranteed delivery',
      color: 'text-[#000000]'
    },
    {
      icon: Clock,
      title: 'Auto Top-Up',
      description: 'Set recurring top-ups and never run out of airtime or data',
      color: 'text-[#dd3333]'
    },
    {
      icon: Globe,
      title: 'Cross-Border',
      description: 'Send airtime from anywhere to family across West Africa',
      color: 'text-[#000000]'
    }
  ];

  const stats = [
    { label: 'Mobile Providers', value: '25+', icon: Smartphone },
    { label: 'Countries Served', value: '8', icon: Globe },
    { label: 'Success Rate', value: '99.9%', icon: Shield },
    { label: 'Average Delivery', value: '< 30s', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="pt-20 bg-gradient-to-br from-red-50 via-white to-gray-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-red-100 text-[#dd3333] hover:bg-red-100">
                📱 Mobile Money Integration
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#dd3333] to-[#000000] bg-clip-text text-transparent">
                Connect to Every Mobile Wallet
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Top up any mobile money account across West Africa. Direct integration with 
                MTN, Airtel, Orange Money, Lonestar Cell, Africell, and more.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-[#dd3333]" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-[800px] mx-auto">
                <TabsTrigger value="recharge">Quick Recharge</TabsTrigger>
                <TabsTrigger value="providers">Providers</TabsTrigger>
                <TabsTrigger value="auto-topup">Auto Top-Up</TabsTrigger>
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="recharge" className="space-y-6">
                <RechargeForm />
              </TabsContent>

              <TabsContent value="providers" className="space-y-6">
                <ProviderSelector />
              </TabsContent>

              <TabsContent value="auto-topup" className="space-y-6">
                <AutoTopUpSettings />
              </TabsContent>

              <TabsContent value="offers" className="space-y-6">
                <PromoOffers />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <TransactionHistory />
              </TabsContent>
            </Tabs>

            {/* Features Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Why Choose NoblePay Mobile Recharge?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Coverage Notice */}
            <Card className="mt-12 bg-gradient-to-r from-red-50 to-gray-50 border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-[#dd3333] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#dd3333] mb-2">Extensive Network Coverage</h3>
                    <p className="text-gray-800 text-sm">
                      Our partnerships with leading mobile money providers across West Africa ensure your 
                      top-ups reach recipients instantly. We support over 110 million mobile wallet users 
                      across 8 countries with 99.9% success rate and 24/7 customer support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MobileRecharge;