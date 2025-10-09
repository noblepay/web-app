import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, Clock, CheckCircle, XCircle, RefreshCw, DollarSign } from 'lucide-react';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN-2024-001',
      phoneNumber: '+233 24 123 4567',
      provider: 'MTN Ghana',
      type: 'airtime',
      amount: 25.00,
      fee: 0.99,
      status: 'completed',
      date: '2024-01-20 14:30',
      recipient: 'Kwame Asante',
      reference: 'MTN-GH-789456'
    },
    {
      id: 'TXN-2024-002',
      phoneNumber: '+234 80 987 6543',
      provider: 'Airtel Nigeria',
      type: 'data',
      amount: 12.00,
      fee: 0.99,
      status: 'completed',
      date: '2024-01-19 09:15',
      recipient: 'Adaora Okafor',
      reference: 'ART-NG-123789'
    },
    {
      id: 'TXN-2024-003',
      phoneNumber: '+231 77 555 0123',
      provider: 'Lonestar Cell MTN',
      type: 'airtime',
      amount: 15.00,
      fee: 0.99,
      status: 'pending',
      date: '2024-01-20 16:45',
      recipient: 'Moses Johnson',
      reference: 'LSC-LR-456123'
    },
    {
      id: 'TXN-2024-004',
      phoneNumber: '+232 76 888 9999',
      provider: 'Africell Sierra Leone',
      type: 'data',
      amount: 8.00,
      fee: 0.99,
      status: 'failed',
      date: '2024-01-18 11:20',
      recipient: 'Fatima Kamara',
      reference: 'AFC-SL-789012',
      failureReason: 'Invalid phone number'
    },
    {
      id: 'TXN-2024-005',
      phoneNumber: '+233 54 777 8888',
      provider: 'Vodafone Ghana',
      type: 'airtime',
      amount: 50.00,
      fee: 0.99,
      status: 'completed',
      date: '2024-01-17 13:10',
      recipient: 'Ama Serwaa',
      reference: 'VDF-GH-345678'
    },
    {
      id: 'TXN-2024-006',
      phoneNumber: '+224 62 111 2222',
      provider: 'Orange Guinea',
      type: 'data',
      amount: 20.00,
      fee: 0.99,
      status: 'completed',
      date: '2024-01-16 08:30',
      recipient: 'Mamadou Diallo',
      reference: 'ORG-GN-567890'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.phoneNumber.includes(searchTerm) || 
                         transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalSpent = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount + t.fee, 0);

  const successfulTransactions = transactions.filter(t => t.status === 'completed').length;
  const successRate = ((successfulTransactions / transactions.length) * 100).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-[#dd3333]">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-[#dd3333]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{successRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#dd3333]" />
            Transaction History
          </CardTitle>
          <CardDescription>
            View and manage all your mobile recharge transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by phone number, recipient, or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="airtime">Airtime</SelectItem>
                <SelectItem value="data">Data</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div>
                    <div className="font-semibold">{transaction.phoneNumber}</div>
                    <div className="text-sm text-gray-600">{transaction.recipient}</div>
                    <div className="text-xs text-gray-500">{transaction.provider}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">${transaction.amount.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">
                    {transaction.type === 'airtime' ? 'Airtime' : 'Data Bundle'}
                  </div>
                  <Badge className={`${getStatusColor(transaction.status)} text-xs mt-1`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Transaction ID:</span>
                    <div className="font-medium">{transaction.id}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Date & Time:</span>
                    <div className="font-medium">{transaction.date}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Reference:</span>
                    <div className="font-medium">{transaction.reference}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Fee:</span>
                    <div className="font-medium">${transaction.fee.toFixed(2)}</div>
                  </div>
                </div>

                {transaction.status === 'failed' && transaction.failureReason && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-red-800">
                      <strong>Failure Reason:</strong> {transaction.failureReason}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                  {transaction.status === 'failed' && (
                    <Button size="sm">
                      Retry Transaction
                    </Button>
                  )}
                  {transaction.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      Send Again
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransactionHistory;