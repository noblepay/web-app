import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Clock, Bell, Repeat, Zap, Settings, Trash2, Plus } from 'lucide-react';

const AutoTopUpSettings = () => {
  const [autoTopUps, setAutoTopUps] = useState([
    {
      id: 1,
      phoneNumber: '+233 24 123 4567',
      provider: 'MTN Ghana',
      amount: 25,
      frequency: 'weekly',
      type: 'airtime',
      enabled: true,
      nextTopUp: '2024-01-22'
    },
    {
      id: 2,
      phoneNumber: '+234 80 987 6543',
      provider: 'MTN Nigeria',
      amount: 10,
      frequency: 'monthly',
      type: 'data',
      enabled: false,
      nextTopUp: '2024-02-01'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAutoTopUp, setNewAutoTopUp] = useState({
    phoneNumber: '',
    provider: '',
    amount: '',
    frequency: 'weekly',
    type: 'airtime',
    lowBalanceAlert: true,
    alertThreshold: 5
  });

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  const providers = [
    'MTN Ghana', 'MTN Nigeria', 'Airtel Nigeria', 'Vodafone Ghana', 
    'Orange Liberia', 'Africell Sierra Leone', 'Lonestar Cell MTN'
  ];

  const toggleAutoTopUp = (id: number) => {
    setAutoTopUps(autoTopUps.map(topup => 
      topup.id === id ? { ...topup, enabled: !topup.enabled } : topup
    ));
  };

  const deleteAutoTopUp = (id: number) => {
    setAutoTopUps(autoTopUps.filter(topup => topup.id !== id));
  };

  const addAutoTopUp = () => {
    const newId = Math.max(...autoTopUps.map(t => t.id)) + 1;
    setAutoTopUps([...autoTopUps, {
      id: newId,
      phoneNumber: newAutoTopUp.phoneNumber,
      provider: newAutoTopUp.provider,
      amount: parseFloat(newAutoTopUp.amount),
      frequency: newAutoTopUp.frequency,
      type: newAutoTopUp.type,
      enabled: true,
      nextTopUp: '2024-01-25'
    }]);
    setNewAutoTopUp({
      phoneNumber: '',
      provider: '',
      amount: '',
      frequency: 'weekly',
      type: 'airtime',
      lowBalanceAlert: true,
      alertThreshold: 5
    });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Repeat className="h-5 w-5 text-[#dd3333]" />
            Auto Top-Up Settings
          </CardTitle>
          <CardDescription>
            Set up recurring top-ups and low balance alerts for your family and friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Never Run Out of Airtime or Data</h4>
              <p className="text-sm text-gray-600">
                Automatically top up mobile accounts based on your schedule or when balance is low
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Auto Top-Up
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add New Auto Top-Up Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Auto Top-Up</CardTitle>
            <CardDescription>
              Set up automatic recurring top-ups for any mobile number
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={newAutoTopUp.phoneNumber}
                  onChange={(e) => setNewAutoTopUp({...newAutoTopUp, phoneNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select 
                  value={newAutoTopUp.provider} 
                  onValueChange={(value) => setNewAutoTopUp({...newAutoTopUp, provider: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map(provider => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="25.00"
                  value={newAutoTopUp.amount}
                  onChange={(e) => setNewAutoTopUp({...newAutoTopUp, amount: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select 
                  value={newAutoTopUp.frequency} 
                  onValueChange={(value) => setNewAutoTopUp({...newAutoTopUp, frequency: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map(freq => (
                      <SelectItem key={freq.value} value={freq.value}>{freq.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select 
                  value={newAutoTopUp.type} 
                  onValueChange={(value) => setNewAutoTopUp({...newAutoTopUp, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airtime">Airtime</SelectItem>
                    <SelectItem value="data">Data Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="lowBalanceAlert" 
                checked={newAutoTopUp.lowBalanceAlert}
                onCheckedChange={(checked) => setNewAutoTopUp({...newAutoTopUp, lowBalanceAlert: checked})}
              />
              <Label htmlFor="lowBalanceAlert">Enable low balance alerts</Label>
            </div>

            <div className="flex gap-4">
              <Button onClick={addAutoTopUp} className="flex-1">
                Create Auto Top-Up
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Auto Top-Ups */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Auto Top-Ups</h3>
        {autoTopUps.map((topup) => (
          <Card key={topup.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    topup.enabled ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {topup.enabled ? (
                      <Zap className="h-6 w-6 text-green-600" />
                    ) : (
                      <Clock className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{topup.phoneNumber}</div>
                    <div className="text-sm text-gray-600">{topup.provider}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        ${topup.amount} {topup.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {topup.frequency}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Next top-up</div>
                    <div className="font-medium">{topup.nextTopUp}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={topup.enabled}
                      onCheckedChange={() => toggleAutoTopUp(topup.id)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteAutoTopUp(topup.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-[#dd3333]" />
              Smart Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Low balance notifications</li>
              <li>• Successful top-up confirmations</li>
              <li>• Failed transaction alerts</li>
              <li>• Monthly spending summaries</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-[#dd3333]" />
              Flexible Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Daily, weekly, or monthly top-ups</li>
              <li>• Custom date scheduling</li>
              <li>• Balance-triggered top-ups</li>
              <li>• Pause/resume anytime</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoTopUpSettings;