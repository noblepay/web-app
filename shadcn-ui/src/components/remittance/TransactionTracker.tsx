import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, MapPin, Clock, CheckCircle, AlertCircle, Package, Truck, Home } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TransactionTracker = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  // Mock transaction data
  const mockTransactions = {
    'NP240001': {
      id: 'NP240001',
      status: 'completed',
      amount: { sent: 500, received: 825000, currency: 'NGN' },
      recipient: { name: 'John Adebayo', country: 'Nigeria', method: 'Bank Account' },
      timeline: [
        { step: 'initiated', title: 'Transfer Initiated', time: '2024-01-15 10:30 AM', completed: true },
        { step: 'verified', title: 'Identity Verified', time: '2024-01-15 10:32 AM', completed: true },
        { step: 'processing', title: 'Payment Processing', time: '2024-01-15 10:35 AM', completed: true },
        { step: 'sent', title: 'Sent to Partner Bank', time: '2024-01-15 11:15 AM', completed: true },
        { step: 'delivered', title: 'Delivered to Recipient', time: '2024-01-15 12:45 PM', completed: true }
      ],
      estimatedDelivery: '2024-01-15 2:00 PM',
      actualDelivery: '2024-01-15 12:45 PM'
    },
    'NP240002': {
      id: 'NP240002',
      status: 'processing',
      amount: { sent: 250, received: 312500, currency: 'KES' },
      recipient: { name: 'Mary Wanjiku', country: 'Kenya', method: 'Mobile Money' },
      timeline: [
        { step: 'initiated', title: 'Transfer Initiated', time: '2024-01-16 2:15 PM', completed: true },
        { step: 'verified', title: 'Identity Verified', time: '2024-01-16 2:17 PM', completed: true },
        { step: 'processing', title: 'Payment Processing', time: '2024-01-16 2:20 PM', completed: false },
        { step: 'sent', title: 'Sent to Partner Network', time: '', completed: false },
        { step: 'delivered', title: 'Delivered to Recipient', time: '', completed: false }
      ],
      estimatedDelivery: '2024-01-16 4:00 PM',
      actualDelivery: null
    },
    'NP240003': {
      id: 'NP240003',
      status: 'on_hold',
      amount: { sent: 1000, received: 745000, currency: 'GHS' },
      recipient: { name: 'Kwame Asante', country: 'Ghana', method: 'Cash Pickup' },
      timeline: [
        { step: 'initiated', title: 'Transfer Initiated', time: '2024-01-16 9:00 AM', completed: true },
        { step: 'verified', title: 'Additional Verification Required', time: '2024-01-16 9:05 AM', completed: false },
        { step: 'processing', title: 'Payment Processing', time: '', completed: false },
        { step: 'sent', title: 'Sent to Partner Network', time: '', completed: false },
        { step: 'delivered', title: 'Available for Pickup', time: '', completed: false }
      ],
      estimatedDelivery: 'Pending verification',
      actualDelivery: null,
      holdReason: 'Additional documentation required for compliance verification'
    }
  };

  const handleSearch = () => {
    const result = mockTransactions[trackingNumber as keyof typeof mockTransactions];
    setSearchResult(result || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'on_hold': return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStepIcon = (step: string, completed: boolean) => {
    const iconClass = completed ? 'text-green-600' : 'text-gray-400';
    
    switch (step) {
      case 'initiated': return <Package className={`h-5 w-5 ${iconClass}`} />;
      case 'verified': return <CheckCircle className={`h-5 w-5 ${iconClass}`} />;
      case 'processing': return <Clock className={`h-5 w-5 ${iconClass}`} />;
      case 'sent': return <Truck className={`h-5 w-5 ${iconClass}`} />;
      case 'delivered': return <Home className={`h-5 w-5 ${iconClass}`} />;
      default: return <Package className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const recentTransactions = Object.values(mockTransactions).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Track Your Transfer
          </CardTitle>
          <CardDescription>
            Enter your transaction reference number to track your transfer status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter tracking number (e.g., NP240001)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={!trackingNumber}>
              <Search className="h-4 w-4 mr-2" />
              Track
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            <strong>Try these sample tracking numbers:</strong> NP240001, NP240002, NP240003
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResult && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Transfer #{searchResult.id}</CardTitle>
                <CardDescription>
                  ${searchResult.amount.sent} USD → {searchResult.amount.received.toLocaleString()} {searchResult.amount.currency}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(searchResult.status)}>
                {getStatusIcon(searchResult.status)}
                <span className="ml-1 capitalize">{searchResult.status.replace('_', ' ')}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Transfer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Sent:</span>
                    <span className="font-medium">${searchResult.amount.sent} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount to Receive:</span>
                    <span className="font-medium">
                      {searchResult.amount.received.toLocaleString()} {searchResult.amount.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Method:</span>
                    <span className="font-medium">{searchResult.recipient.method}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Recipient Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{searchResult.recipient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <span className="font-medium">{searchResult.recipient.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{searchResult.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hold Alert */}
            {searchResult.status === 'on_hold' && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Transfer On Hold:</strong> {searchResult.holdReason}
                  <br />
                  Please contact our support team or upload the required documents to proceed.
                </AlertDescription>
              </Alert>
            )}

            <Separator />

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-medium">Transfer Timeline</h4>
              <div className="space-y-4">
                {searchResult.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {getStepIcon(item.step, item.completed)}
                      {index < searchResult.timeline.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${item.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.title}
                      </div>
                      {item.time && (
                        <div className="text-sm text-gray-600">{item.time}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline">
                Download Receipt
              </Button>
              <Button variant="outline">
                Contact Support
              </Button>
              {searchResult.status === 'completed' && (
                <Button>
                  Send Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {trackingNumber && searchResult === null && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Transfer Not Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find a transfer with tracking number "{trackingNumber}". 
                Please check the number and try again.
              </p>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest transfer activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div>
                    <div className="font-medium">#{transaction.id}</div>
                    <div className="text-sm text-gray-600">
                      To {transaction.recipient.name} • {transaction.recipient.country}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${transaction.amount.sent} USD</div>
                  <Badge className={`${getStatusColor(transaction.status)} text-xs`}>
                    {transaction.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionTracker;