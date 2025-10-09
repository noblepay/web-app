import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle, FileText, DollarSign, ArrowRight } from 'lucide-react';

interface KYCVerificationProps {
  formData: any;
  setFormData: (data: any) => void;
  onBack: () => void;
  onContinue: () => void;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ formData, setFormData, onBack, onContinue }) => {
  const purposes = [
    'Family Support',
    'Education Expenses',
    'Medical Treatment',
    'Business Investment',
    'Property Purchase',
    'Savings & Investment',
    'Loan Repayment',
    'Gift',
    'Other'
  ];

  const sourceOfFunds = [
    'Employment Income',
    'Business Revenue',
    'Investment Returns',
    'Savings',
    'Gift from Family',
    'Loan Proceeds',
    'Sale of Assets',
    'Other'
  ];

  const getTransactionLimits = () => {
    const amount = parseFloat(formData.sendAmount) || 0;
    
    if (amount <= 1000) {
      return {
        level: 'Standard',
        color: 'bg-green-100 text-green-800',
        requirements: ['Valid ID verification', 'Purpose of transfer'],
        additionalDocs: false
      };
    } else if (amount <= 5000) {
      return {
        level: 'Enhanced',
        color: 'bg-yellow-100 text-yellow-800',
        requirements: ['Valid ID verification', 'Proof of address', 'Source of funds documentation'],
        additionalDocs: true
      };
    } else {
      return {
        level: 'High Value',
        color: 'bg-red-100 text-red-800',
        requirements: ['Enhanced due diligence', 'Bank statements', 'Employment verification', 'Additional documentation'],
        additionalDocs: true
      };
    }
  };

  const limits = getTransactionLimits();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Compliance & Verification
        </CardTitle>
        <CardDescription>
          Required information for regulatory compliance and fraud prevention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transaction Classification */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Transaction Classification</h4>
            <Badge className={limits.color}>
              {limits.level} Verification
            </Badge>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Amount:</strong> ${formData.sendAmount} USD</p>
            <p><strong>Required Documentation:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              {limits.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Purpose of Transfer */}
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose of Transfer *</Label>
          <Select 
            value={formData.purpose} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select the purpose of this transfer" />
            </SelectTrigger>
            <SelectContent>
              {purposes.map(purpose => (
                <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Required for regulatory compliance and fraud prevention
          </p>
        </div>

        {/* Source of Funds */}
        <div className="space-y-2">
          <Label htmlFor="sourceOfFunds">Source of Funds *</Label>
          <Select 
            value={formData.sourceOfFunds} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, sourceOfFunds: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select the source of these funds" />
            </SelectTrigger>
            <SelectContent>
              {sourceOfFunds.map(source => (
                <SelectItem key={source} value={source}>{source}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Help us understand where the money is coming from
          </p>
        </div>

        {/* Additional Details for Other */}
        {(formData.purpose === 'Other' || formData.sourceOfFunds === 'Other') && (
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details *</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Please provide more details about the purpose or source of funds..."
              value={formData.additionalDetails || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>
        )}

        {/* Enhanced Verification for Large Amounts */}
        {limits.additionalDocs && (
          <div className="space-y-4">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Enhanced Verification Required:</strong> Due to the transfer amount, 
                additional documentation may be required to complete this transaction.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Additional Information
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                    placeholder="Your occupation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer">Employer/Company</Label>
                  <Input
                    id="employer"
                    value={formData.employer || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, employer: e.target.value }))}
                    placeholder="Employer name (if applicable)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome">Estimated Annual Income Range</Label>
                <Select 
                  value={formData.annualIncome || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, annualIncome: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-25k">Under $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                    <SelectItem value="over-250k">Over $250,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Regulatory Notice */}
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Regulatory Compliance:</strong> This information is collected in accordance with 
            U.S. federal regulations including the Bank Secrecy Act (BSA) and Anti-Money Laundering (AML) 
            requirements. Your data is protected and used only for compliance purposes.
          </AlertDescription>
        </Alert>

        {/* Transaction Monitoring Notice */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Transaction Monitoring
          </h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              All transactions are monitored for suspicious activity as required by law. 
              Factors that may trigger additional review include:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Large or unusual transaction amounts</li>
              <li>Frequent transfers to the same recipient</li>
              <li>Transfers to high-risk countries or regions</li>
              <li>Inconsistent information or documentation</li>
            </ul>
            <p className="mt-2">
              <strong>Processing time:</strong> Most transfers are processed immediately. 
              Transactions requiring additional review may take 1-3 business days.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={onContinue} 
            className="flex-1"
            disabled={
              !formData.purpose || 
              !formData.sourceOfFunds || 
              (limits.additionalDocs && !formData.occupation) ||
              ((formData.purpose === 'Other' || formData.sourceOfFunds === 'Other') && !formData.additionalDetails)
            }
          >
            Continue to Review
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCVerification;