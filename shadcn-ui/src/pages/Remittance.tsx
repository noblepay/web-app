import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Globe, Shield, Clock, DollarSign, Users, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemittanceForm from '@/components/remittance/RemittanceForm';
import FXCalculator from '@/components/remittance/FXCalculator';
import TransactionTracker from '@/components/remittance/TransactionTracker';
import PayoutMethods from '@/components/remittance/PayoutMethods';

const Remittance = () => {
  const [activeTab, setActiveTab] = useState('send');

  const features = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Send money to 8+ West African countries with extensive payout network'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Full KYC/AML compliance with bank-level security and encryption'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Real-time to 24-hour delivery with transparent tracking'
    },
    {
      icon: DollarSign,
      title: 'Competitive Rates',
      description: 'Live FX rates with transparent fees and no hidden charges'
    }
  ];

  const stats = [
    { label: 'Countries Served', value: '8', icon: MapPin },
    { label: 'Payout Partners', value: '150+', icon: Users },
    { label: 'Average Transfer Time', value: '< 2hrs', icon: Clock },
    { label: 'Customer Satisfaction', value: '98%', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="pt-20 bg-gradient-to-br from-red-50 via-gray-50 to-black/5">
          <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-red-100 text-[#dd3333] hover:bg-red-100">
            🚀 Empowering West Africa's Financial Future
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#dd3333] to-[#000000] bg-clip-text text-transparent">
            International Remittance
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Send money securely to West Africa with competitive rates, transparent fees, and fast delivery
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-red-100 text-[#dd3333]">
              Licensed & Regulated
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-[#dd3333]">
              Real-time FX Rates
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-[#dd3333]">
              24/7 Support
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
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
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
            <TabsTrigger value="send">Send Money</TabsTrigger>
            <TabsTrigger value="calculator">FX Calculator</TabsTrigger>
            <TabsTrigger value="track">Track Transfer</TabsTrigger>
            <TabsTrigger value="methods">Payout Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            <RemittanceForm />
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <FXCalculator />
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <TransactionTracker />
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <PayoutMethods />
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#dd3333] to-[#000000] bg-clip-text text-transparent">
            Why Choose NoblePay for Remittance?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-[#dd3333]" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance Notice */}
        <Card className="mt-12 bg-gradient-to-r from-red-50 to-gray-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-[#dd3333] mt-1" />
              <div>
                <h3 className="font-semibold text-[#dd3333] mb-2">Regulatory Compliance</h3>
                <p className="text-gray-800 text-sm">
                  NoblePay is licensed as a Money Services Business (MSB) and complies with all U.S. federal and state 
                  remittance regulations. We follow strict KYC/AML procedures and partner only with licensed financial 
                  institutions in destination countries. Your funds are protected and transactions are monitored for security.
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

export default Remittance;