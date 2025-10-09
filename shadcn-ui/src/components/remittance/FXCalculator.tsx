import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw, Calculator, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FXCalculator = () => {
  const [fromAmount, setFromAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
    { code: 'XOF', name: 'West African CFA', symbol: 'CFA', flag: '🌍' }
  ];

  const exchangeRates = {
    'USD-NGN': { rate: 1650.50, change: 2.3, trend: 'up' },
    'USD-GHS': { rate: 12.45, change: -0.8, trend: 'down' },
    'USD-KES': { rate: 149.75, change: 1.2, trend: 'up' },
    'USD-XOF': { rate: 618.30, change: 0.5, trend: 'up' },
    'NGN-USD': { rate: 0.000606, change: -2.3, trend: 'down' },
    'GHS-USD': { rate: 0.0803, change: 0.8, trend: 'up' },
    'KES-USD': { rate: 0.00668, change: -1.2, trend: 'down' },
    'XOF-USD': { rate: 0.00162, change: -0.5, trend: 'down' }
  };

  // Mock historical data for the chart
  const historicalData = [
    { date: '2024-01-01', rate: 1620 },
    { date: '2024-01-15', rate: 1635 },
    { date: '2024-02-01', rate: 1642 },
    { date: '2024-02-15', rate: 1638 },
    { date: '2024-03-01', rate: 1645 },
    { date: '2024-03-15', rate: 1650 },
  ];

  const getRateKey = () => `${fromCurrency}-${toCurrency}`;
  const currentRate = exchangeRates[getRateKey() as keyof typeof exchangeRates] || { rate: 1, change: 0, trend: 'up' };

  const calculateConversion = () => {
    const amount = parseFloat(fromAmount) || 0;
    return (amount * currentRate.rate).toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const refreshRates = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch new rates from an API
  };

  const getFromCurrency = () => currencies.find(c => c.code === fromCurrency);
  const getToCurrency = () => currencies.find(c => c.code === toCurrency);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Foreign Exchange Calculator
          </CardTitle>
          <CardDescription>
            Get real-time exchange rates and calculate conversion amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {/* From Currency */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromAmount">Amount</Label>
                <div className="relative">
                  <Input
                    id="fromAmount"
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="pl-8"
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {getFromCurrency()?.symbol}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-gray-500">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="rounded-full"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Converted Amount</Label>
                <div className="relative">
                  <Input
                    value={calculateConversion()}
                    readOnly
                    className="pl-8 bg-gray-50"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {getToCurrency()?.symbol}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-gray-500">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  1 {fromCurrency} = {currentRate.rate.toLocaleString()} {toCurrency}
                </span>
                <Badge variant={currentRate.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                  {currentRate.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(currentRate.change)}%
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={refreshRates}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Trends (Last 3 Months)</CardTitle>
          <CardDescription>
            Historical exchange rate for {fromCurrency}/{toCurrency}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any) => [value.toLocaleString(), 'Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Conversion Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Conversion Reference</CardTitle>
          <CardDescription>
            Common amounts converted from {fromCurrency} to {toCurrency}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 10, 50, 100, 500, 1000, 5000, 10000].map(amount => (
              <div key={amount} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">
                  {getFromCurrency()?.symbol}{amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  {getToCurrency()?.symbol}{(amount * currentRate.rate).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rate Alert */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Rate Alert Service</h3>
            <p className="text-blue-800 text-sm mb-4">
              Get notified when exchange rates reach your target level. Set up alerts for better timing on your transfers.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Set Rate Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FXCalculator;