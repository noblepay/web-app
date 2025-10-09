import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingDown, Clock, Shield } from 'lucide-react';

interface FeeBreakdownProps {
  sendAmount: number;
  receiveCurrency: string;
  payoutMethod: string;
}

const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ sendAmount, receiveCurrency, payoutMethod }) => {
  // Mock exchange rates
  const exchangeRates: { [key: string]: number } = {
    'NGN': 1650.50,
    'GHS': 12.45,
    'KES': 149.75,
    'XOF': 618.30
  };

  // Mock fees based on payout method
  const methodFees: { [key: string]: { fee: number; name: string } } = {
    'bank': { fee: 2.99, name: 'Bank Transfer' },
    'mobile': { fee: 1.99, name: 'Mobile Money' },
    'cash': { fee: 4.99, name: 'Cash Pickup' }
  };

  const exchangeRate = exchangeRates[receiveCurrency] || 1;
  const transferFee = methodFees[payoutMethod]?.fee || 2.99;
  const fxMargin = 0.015; // 1.5% FX margin
  const partnerFee = 0.50; // Partner network fee

  // Calculations
  const grossAmount = sendAmount - transferFee;
  const fxMarginAmount = grossAmount * fxMargin;
  const netUsdAmount = grossAmount - fxMarginAmount - partnerFee;
  const receiveAmount = netUsdAmount * exchangeRate;
  const totalFees = transferFee + fxMarginAmount + partnerFee;
  const feePercentage = (totalFees / sendAmount) * 100;

  const midMarketRate = exchangeRate * (1 + fxMargin);
  const ourRate = exchangeRate;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <DollarSign className="h-5 w-5" />
          Fee Breakdown & Exchange Rate
        </CardTitle>
        <CardDescription className="text-blue-700">
          Transparent pricing with no hidden fees
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Conversion Display */}
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">${sendAmount.toFixed(2)}</div>
              <div className="text-sm text-gray-600">You Send (USD)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {receiveAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">Recipient Gets ({receiveCurrency})</div>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Fee Details</h4>
          
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transfer Fee ({methodFees[payoutMethod]?.name}):</span>
              <span className="font-medium">${transferFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">FX Margin (1.5%):</span>
              <span className="font-medium">${fxMarginAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Partner Network Fee:</span>
              <span className="font-medium">${partnerFee.toFixed(2)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium">
              <span>Total Fees:</span>
              <span className="text-red-600">${totalFees.toFixed(2)} ({feePercentage.toFixed(1)}%)</span>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Exchange Rate Information</h4>
          
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Mid-market rate:</span>
              <span className="font-medium">1 USD = {midMarketRate.toFixed(2)} {receiveCurrency}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Our rate:</span>
              <span className="font-medium text-green-600">1 USD = {ourRate.toFixed(2)} {receiveCurrency}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rate difference:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <TrendingDown className="h-3 w-3 mr-1" />
                {((midMarketRate - ourRate) / midMarketRate * 100).toFixed(2)}% better
              </Badge>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Estimated Delivery:</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {payoutMethod === 'mobile' ? 'Instant' : 
               payoutMethod === 'bank' ? '1-4 hours' : '15 minutes'}
            </Badge>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Rate Locked for 30 minutes</span>
          </div>
          <div className="bg-white rounded-lg p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">100% Money-back guarantee</span>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="text-sm text-yellow-800">
            <strong>💡 Pro tip:</strong> Our rates are typically 2-5% better than traditional banks and 
            money transfer services. You save approximately ${((sendAmount * 0.035) - totalFees).toFixed(2)} 
            compared to bank wire transfers.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeBreakdown;