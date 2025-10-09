import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, Droplets, Wifi, Tv, Settings, Clock } from 'lucide-react';

const QuickActions = () => {
  const quickPayments = [
    {
      icon: Zap,
      title: 'Pay Electricity',
      description: 'ECG - Account ending in 4567',
      amount: '$45.00',
      color: 'text-[#dd3333]'
    },
    {
      icon: Droplets,
      title: 'Pay Water Bill',
      description: 'GWCL - Account ending in 8901',
      amount: '$28.50',
      color: 'text-blue-600'
    },
    {
      icon: Tv,
      title: 'Pay Cable TV',
      description: 'DStv - Smart Card 2345',
      amount: '$35.00',
      color: 'text-purple-600'
    },
    {
      icon: Wifi,
      title: 'Pay Internet',
      description: 'Vodafone - Account 7890',
      amount: '$55.00',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common bill payments and top-ups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickPayments.map((payment, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-auto p-4 justify-start hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 w-full">
                <payment.icon className={`h-5 w-5 ${payment.color}`} />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{payment.title}</div>
                  <div className="text-xs text-gray-600">{payment.description}</div>
                </div>
                <div className="font-semibold text-sm">{payment.amount}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Auto-Pay Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5 text-[#dd3333]" />
            Set Up Auto-Pay
          </CardTitle>
          <CardDescription>Never miss a payment with automatic bill payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-electricity">Electricity Bills</Label>
                <p className="text-xs text-gray-600">ECG - Monthly auto-payment</p>
              </div>
              <Switch id="auto-electricity" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-water">Water Bills</Label>
                <p className="text-xs text-gray-600">GWCL - Monthly auto-payment</p>
              </div>
              <Switch id="auto-water" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-internet">Internet Bills</Label>
                <p className="text-xs text-gray-600">Vodafone - Monthly auto-payment</p>
              </div>
              <Switch id="auto-internet" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-tv">TV Subscription</Label>
                <p className="text-xs text-gray-600">DStv - Monthly auto-payment</p>
              </div>
              <Switch id="auto-tv" defaultChecked />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Manage Auto-Pay Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-[#dd3333]" />
            Upcoming Bills
          </CardTitle>
          <CardDescription>Bills due in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="font-medium text-sm">Electricity Bill</div>
                <div className="text-xs text-gray-600">Due in 2 days</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-yellow-700">$45.00</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-3">
              <Tv className="h-4 w-4 text-red-600" />
              <div>
                <div className="font-medium text-sm">DStv Subscription</div>
                <div className="text-xs text-gray-600">Due tomorrow</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-red-700">$35.00</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Droplets className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium text-sm">Water Bill</div>
                <div className="text-xs text-gray-600">Due in 5 days</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-blue-700">$28.50</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;