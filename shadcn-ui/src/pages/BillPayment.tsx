import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Zap, Droplets, Wifi, Tv, Smartphone, Clock, Shield, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BillPaymentForm from '@/components/bill-payment/BillPaymentForm';
import ServiceProviders from '@/components/bill-payment/ServiceProviders';
import ScheduledPayments from '@/components/bill-payment/ScheduledPayments';
import BillHistory from '@/components/bill-payment/BillHistory';
import QuickActions from '@/components/bill-payment/QuickActions';

const BillPayment = () => {
  const [activeTab, setActiveTab] = useState('pay-bills');

  const features = [
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Pay your bills instantly with real-time processing and confirmation',
      color: 'text-[#dd3333]'
    },
    {
      icon: Clock,
      title: 'Scheduled Payments',
      description: 'Set up recurring payments and never miss a due date again',
      color: 'text-[#000000]'
    },
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'Bank-level security with account verification and fraud protection',
      color: 'text-[#dd3333]'
    },
    {
      icon: CreditCard,
      title: 'Multiple Providers',
      description: 'Support for hundreds of service providers across West Africa',
      color: 'text-[#000000]'
    }
  ];

  const stats = [
    { label: 'Service Providers', value: '500+', icon: CreditCard },
    { label: 'Countries Served', value: '8', icon: Shield },
    { label: 'Bills Paid Monthly', value: '2M+', icon: Zap },
    { label: 'Success Rate', value: '99.8%', icon: Clock }
  ];

  const serviceCategories = [
    { 
      icon: Zap, 
      name: 'Electricity', 
      description: 'Power bills & prepaid meters',
      color: 'text-[#dd3333]',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    { 
      icon: Droplets, 
      name: 'Water', 
      description: 'Municipal & private water services',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      icon: Wifi, 
      name: 'Internet', 
      description: 'ISPs, fiber & mobile internet',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      icon: Tv, 
      name: 'TV/Cable', 
      description: 'Satellite, cable & streaming',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    { 
      icon: Smartphone, 
      name: 'Mobile Data', 
      description: 'Data bundles & mobile internet',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
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
                🧾 Bill & Utility Payments
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#dd3333] to-[#000000] bg-clip-text text-transparent">
                Pay All Your Bills in One Place
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Never miss a payment again. Pay electricity, water, internet, TV, and mobile 
                bills across West Africa with just a few taps.
              </p>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {serviceCategories.map((category, index) => (
                <Card key={index} className={`text-center hover:shadow-md transition-shadow cursor-pointer ${category.bgColor} ${category.borderColor}`}>
                  <CardContent className="pt-6 pb-4">
                    <category.icon className={`h-8 w-8 mx-auto mb-2 ${category.color}`} />
                    <div className="font-semibold text-sm">{category.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{category.description}</div>
                  </CardContent>
                </Card>
              ))}
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
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] mx-auto">
                <TabsTrigger value="pay-bills">Pay Bills</TabsTrigger>
                <TabsTrigger value="providers">Providers</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="pay-bills" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <BillPaymentForm />
                  </div>
                  <div>
                    <QuickActions />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="providers" className="space-y-6">
                <ServiceProviders />
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-6">
                <ScheduledPayments />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <BillHistory />
              </TabsContent>
            </Tabs>

            {/* Features Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#dd3333] to-[#000000] bg-clip-text text-transparent">
                Why Choose NoblePay for Bill Payments?
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

            {/* Security Notice */}
            <Card className="mt-12 bg-gradient-to-r from-red-50 to-gray-50 border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-[#dd3333] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#dd3333] mb-2">Secure Bill Payments</h3>
                    <p className="text-gray-800 text-sm">
                      All bill payments are processed through secure, encrypted channels with real-time 
                      account verification. We partner directly with service providers to ensure your 
                      payments are processed instantly and securely. Your account information is protected 
                      with bank-level security and fraud monitoring.
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

export default BillPayment;