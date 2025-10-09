import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Zap, Droplets, Wifi, Tv, Settings, Trash2, Plus, Edit } from 'lucide-react';

const ScheduledPayments = () => {
  const [scheduledPayments, setScheduledPayments] = useState([
    {
      id: 1,
      provider: 'ECG Ghana',
      service: 'Electricity',
      icon: Zap,
      color: 'text-[#dd3333]',
      bgColor: 'bg-red-50',
      account: 'Account ending in 4567',
      amount: 45.00,
      frequency: 'Monthly',
      nextPayment: '2024-02-15',
      enabled: true,
      lastPayment: '2024-01-15'
    },
    {
      id: 2,
      provider: 'DStv Ghana',
      service: 'Satellite TV',
      icon: Tv,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      account: 'Smart Card 2345',
      amount: 35.00,
      frequency: 'Monthly',
      nextPayment: '2024-02-10',
      enabled: true,
      lastPayment: '2024-01-10'
    },
    {
      id: 3,
      provider: 'Vodafone Ghana',
      service: 'Internet',
      icon: Wifi,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      account: 'Account 7890',
      amount: 55.00,
      frequency: 'Monthly',
      nextPayment: '2024-02-20',
      enabled: false,
      lastPayment: '2024-01-20'
    },
    {
      id: 4,
      provider: 'GWCL',
      service: 'Water',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      account: 'Account ending in 8901',
      amount: 28.50,
      frequency: 'Monthly',
      nextPayment: '2024-02-25',
      enabled: true,
      lastPayment: '2024-01-25'
    }
  ]);

  const togglePayment = (id: number) => {
    setScheduledPayments(payments => 
      payments.map(payment => 
        payment.id === id ? { ...payment, enabled: !payment.enabled } : payment
      )
    );
  };

  const deletePayment = (id: number) => {
    setScheduledPayments(payments => payments.filter(payment => payment.id !== id));
  };

  const getStatusBadge = (enabled: boolean, nextPayment: string) => {
    const isUpcoming = new Date(nextPayment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    if (!enabled) {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-600">Paused</Badge>;
    }
    
    if (isUpcoming) {
      return <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
    }
    
    return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  };

  const totalMonthlyAmount = scheduledPayments
    .filter(payment => payment.enabled)
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#dd3333]" />
            Scheduled Payments
          </CardTitle>
          <CardDescription>
            Manage your recurring bill payments and never miss a due date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-[#dd3333]">{scheduledPayments.filter(p => p.enabled).length}</div>
              <div className="text-sm text-gray-600">Active Schedules</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${totalMonthlyAmount.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Monthly Total</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {scheduledPayments.filter(p => p.enabled && new Date(p.nextPayment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-gray-600">Due This Week</div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Payments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Scheduled Payments</h3>
        {scheduledPayments.map((payment) => (
          <Card key={payment.id} className={`${payment.bgColor} border-l-4 ${payment.enabled ? 'border-l-green-500' : 'border-l-gray-400'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${payment.bgColor}`}>
                    <payment.icon className={`h-6 w-6 ${payment.color}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{payment.provider}</div>
                    <div className="text-sm text-gray-600">{payment.service} - {payment.account}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(payment.enabled, payment.nextPayment)}
                      <Badge variant="outline" className="text-xs">
                        {payment.frequency}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${payment.amount.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Next Payment:</span>
                    <div className="font-medium">{payment.nextPayment}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Payment:</span>
                    <div className="font-medium">{payment.lastPayment}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Frequency:</span>
                    <div className="font-medium">{payment.frequency}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <div className="font-medium">{payment.enabled ? 'Active' : 'Paused'}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={payment.enabled}
                        onCheckedChange={() => togglePayment(payment.id)}
                      />
                      <span className="text-sm">{payment.enabled ? 'Active' : 'Paused'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deletePayment(payment.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#dd3333]" />
            Upcoming Payments (Next 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledPayments
              .filter(payment => payment.enabled && new Date(payment.nextPayment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
              .sort((a, b) => new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime())
              .map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <payment.icon className={`h-5 w-5 ${payment.color}`} />
                    <div>
                      <div className="font-medium">{payment.provider}</div>
                      <div className="text-sm text-gray-600">{payment.service}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${payment.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{payment.nextPayment}</div>
                  </div>
                </div>
              ))}
            
            {scheduledPayments.filter(payment => payment.enabled && new Date(payment.nextPayment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No payments due in the next 7 days</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#dd3333]" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Notification Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email reminders (3 days before)</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment confirmations</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Auto-Payment Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Retry failed payments</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pause on insufficient funds</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly spending limit</span>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduledPayments;