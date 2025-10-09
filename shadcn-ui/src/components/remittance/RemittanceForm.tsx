import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, DollarSign, Clock, Shield, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FeeBreakdown from './FeeBreakdown';
import KYCVerification from './KYCVerification';

const RemittanceForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sendAmount: '',
    sendCurrency: 'USD',
    receiveCurrency: 'NGN',
    receiveCountry: 'NG',
    payoutMethod: '',
    recipient: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: '',
      address: '',
      city: '',
      accountNumber: '',
      bankCode: '',
      mobileWallet: ''
    },
    purpose: '',
    sourceOfFunds: ''
  });

  const countries = [
    { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
    { code: 'CI', name: 'Côte d\'Ivoire', currency: 'XOF', flag: '🇨🇮' },
    { code: 'BF', name: 'Burkina Faso', currency: 'XOF', flag: '🇧🇫' },
    { code: 'BJ', name: 'Benin', currency: 'XOF', flag: '🇧🇯' },
    { code: 'LR', name: 'Liberia', currency: 'LRD', flag: '🇱🇷' },
    { code: 'SL', name: 'Sierra Leone', currency: 'SLL', flag: '🇸🇱' },
    { code: 'GN', name: 'Guinea', currency: 'GNF', flag: '🇬🇳' }
  ];

  const payoutMethods = [
    { id: 'bank', name: 'Bank Account', description: 'Direct deposit to bank account', fee: '$2.99', time: '1-24 hours' },
    { id: 'mobile', name: 'Mobile Money', description: 'MTN, Airtel, Vodafone wallets', fee: '$1.99', time: 'Instant' },
    { id: 'cash', name: 'Cash Pickup', description: 'Pickup at agent locations', fee: '$4.99', time: '15 minutes' }
  ];

  const purposes = [
    'Family Support',
    'Education',
    'Medical Expenses',
    'Business Investment',
    'Property Purchase',
    'Savings',
    'Other'
  ];

  const relationships = [
    'Spouse',
    'Parent',
    'Child',
    'Sibling',
    'Relative',
    'Friend',
    'Business Partner',
    'Self'
  ];

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    setFormData(prev => ({
      ...prev,
      receiveCountry: countryCode,
      receiveCurrency: country?.currency || 'NGN'
    }));
  };

  const calculateReceiveAmount = () => {
    const rates: { [key: string]: number } = {
      'NGN': 1650,
      'GHS': 12.5,
      'XOF': 620,
      'LRD': 190,
      'SLL': 22000,
      'GNF': 8600
    };
    
    const sendAmount = parseFloat(formData.sendAmount) || 0;
    const rate = rates[formData.receiveCurrency] || 1;
    const fee = payoutMethods.find(m => m.id === formData.payoutMethod)?.fee.replace('$', '') || '2.99';
    const netAmount = sendAmount - parseFloat(fee);
    
    return {
      receiveAmount: (netAmount * rate).toLocaleString(),
      rate,
      fee: parseFloat(fee)
    };
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Transfer Details
        </CardTitle>
        <CardDescription>
          Enter the amount and destination for your transfer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="sendAmount">You Send</Label>
            <div className="relative">
              <Input
                id="sendAmount"
                type="number"
                placeholder="0.00"
                value={formData.sendAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, sendAmount: e.target.value }))}
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiveCountry">Destination Country</Label>
            <Select value={formData.receiveCountry} onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Payout Method</Label>
          <div className="grid gap-3">
            {payoutMethods.map(method => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.payoutMethod === method.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, payoutMethod: method.id }))}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{method.fee}</div>
                    <div className="text-xs text-gray-500">{method.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formData.sendAmount && formData.payoutMethod && (
          <FeeBreakdown
            sendAmount={parseFloat(formData.sendAmount)}
            receiveCurrency={formData.receiveCurrency}
            payoutMethod={formData.payoutMethod}
          />
        )}

        <Button 
          onClick={() => setStep(2)} 
          className="w-full"
          disabled={!formData.sendAmount || !formData.payoutMethod}
        >
          Continue to Recipient Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Recipient Information</CardTitle>
        <CardDescription>
          Enter details of the person receiving the money
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.recipient.firstName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recipient: { ...prev.recipient, firstName: e.target.value }
              }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.recipient.lastName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recipient: { ...prev.recipient, lastName: e.target.value }
              }))}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.recipient.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recipient: { ...prev.recipient, email: e.target.value }
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.recipient.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recipient: { ...prev.recipient, phone: e.target.value }
              }))}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="relationship">Relationship to Recipient *</Label>
          <Select 
            value={formData.recipient.relationship} 
            onValueChange={(value) => setFormData(prev => ({
              ...prev,
              recipient: { ...prev.recipient, relationship: value }
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              {relationships.map(rel => (
                <SelectItem key={rel} value={rel}>{rel}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.payoutMethod === 'bank' && (
          <div className="space-y-4">
            <Separator />
            <h4 className="font-medium">Bank Account Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.recipient.accountNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    recipient: { ...prev.recipient, accountNumber: e.target.value }
                  }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankCode">Bank *</Label>
                <Select 
                  value={formData.recipient.bankCode}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    recipient: { ...prev.recipient, bankCode: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gtb">GTBank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="uba">UBA</SelectItem>
                    <SelectItem value="fcmb">FCMB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {formData.payoutMethod === 'mobile' && (
          <div className="space-y-4">
            <Separator />
            <h4 className="font-medium">Mobile Money Details</h4>
            <div className="space-y-2">
              <Label htmlFor="mobileWallet">Mobile Wallet Number *</Label>
              <Input
                id="mobileWallet"
                value={formData.recipient.mobileWallet}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  recipient: { ...prev.recipient, mobileWallet: e.target.value }
                }))}
                placeholder="Enter mobile money number"
                required
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button 
            onClick={() => setStep(3)} 
            className="flex-1"
            disabled={!formData.recipient.firstName || !formData.recipient.lastName || !formData.recipient.phone}
          >
            Continue to Compliance
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <KYCVerification 
      formData={formData}
      setFormData={setFormData}
      onBack={() => setStep(2)}
      onContinue={() => setStep(4)}
    />
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Review & Confirm
        </CardTitle>
        <CardDescription>
          Review your transfer details before submitting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Transfer Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">You Send:</span>
                <span className="font-medium">${formData.sendAmount} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient Gets:</span>
                <span className="font-medium">
                  {calculateReceiveAmount().receiveAmount} {formData.receiveCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange Rate:</span>
                <span className="font-medium">1 USD = {calculateReceiveAmount().rate} {formData.receiveCurrency}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Recipient</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{formData.recipient.firstName} {formData.recipient.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span className="font-medium">
                  {countries.find(c => c.code === formData.receiveCountry)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payout Method:</span>
                <span className="font-medium">
                  {payoutMethods.find(m => m.id === formData.payoutMethod)?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            By proceeding, you confirm that all information is accurate and you agree to our terms of service.
            This transaction will be processed according to applicable regulations and may be subject to additional verification.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(3)}>
            Back
          </Button>
          <Button className="flex-1">
            Send Money
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const steps = [
    { number: 1, title: 'Transfer Details', active: step >= 1, completed: step > 1 },
    { number: 2, title: 'Recipient Info', active: step >= 2, completed: step > 2 },
    { number: 3, title: 'Compliance', active: step >= 3, completed: step > 3 },
    { number: 4, title: 'Review & Send', active: step >= 4, completed: step > 4 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.number}>
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${stepItem.completed ? 'bg-green-500 text-white' : 
                      stepItem.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    {stepItem.completed ? '✓' : stepItem.number}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className={`text-sm font-medium ${stepItem.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {stepItem.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${stepItem.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default RemittanceForm;