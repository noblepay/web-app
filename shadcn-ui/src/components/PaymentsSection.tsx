import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Users, Store, CreditCard, Scan, Send, Receipt, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function PaymentsSection() {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const paymentMethods = [
    {
      id: 'qr',
      name: 'QR Payment',
      icon: QrCode,
      description: 'Scan merchant QR codes to pay instantly',
      color: 'text-[#dd3333]'
    },
    {
      id: 'p2p',
      name: 'Person to Person',
      icon: Users,
      description: 'Send money directly to friends and family',
      color: 'text-[#000000]'
    },
    {
      id: 'merchant',
      name: 'Merchant Payment',
      icon: Store,
      description: 'Pay at registered businesses and vendors',
      color: 'text-[#dd3333]'
    }
  ];

  const recentTransactions = [
    { type: 'QR Payment', merchant: 'Mama\'s Store', amount: '$12.50', time: '2 mins ago', status: 'completed' },
    { type: 'P2P Transfer', recipient: 'John Doe', amount: '$25.00', time: '1 hour ago', status: 'completed' },
    { type: 'Merchant', merchant: 'Gas Station', amount: '$30.00', time: '3 hours ago', status: 'completed' },
  ];

  const merchants = [
    { name: 'Mama\'s Store', category: 'Grocery', distance: '0.2km', rating: 4.8 },
    { name: 'Tech Hub Café', category: 'Restaurant', distance: '0.5km', rating: 4.6 },
    { name: 'Fashion Center', category: 'Clothing', distance: '0.8km', rating: 4.7 },
    { name: 'Pharmacy Plus', category: 'Health', distance: '1.2km', rating: 4.9 },
  ];

  return (
    <section id="payments">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-[#dd3333]">
            <Wallet className="w-4 h-4 mr-1" />
            Pay Local Money / Merchant Integration
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pay Anyone, Anywhere, Anytime
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make payments to merchants, friends, and family with QR codes, 
            phone numbers, or direct transfers. Fast, secure, and convenient.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="qr" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 h-auto">
                {paymentMethods.map((method) => (
                  <TabsTrigger 
                    key={method.id} 
                    value={method.id}
                    className="flex flex-col items-center gap-2 p-3 sm:p-4 h-auto min-h-[70px] text-center"
                  >
                    <method.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${method.color}`} />
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{method.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="qr">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-[#dd3333]" />
                      QR Code Payment
                    </CardTitle>
                    <CardDescription>
                      Scan any merchant QR code to pay instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <Scan className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Tap to scan QR code</p>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                        <Scan className="w-4 h-4 mr-2" />
                        Open Camera
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                      Or enter merchant code manually
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="merchant-code">Merchant Code</Label>
                        <Input
                          id="merchant-code"
                          placeholder="Enter 6-digit merchant code"
                          className="text-center text-lg tracking-widest"
                        />
                      </div>
                      <Button variant="outline" className="w-full border-[#dd3333] text-[#dd3333] hover:bg-[#dd3333] hover:text-white">
                        Find Merchant
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="p2p">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#000000]" />
                      Person to Person Transfer
                    </CardTitle>
                    <CardDescription>
                      Send money to friends and family instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="recipient-phone">Recipient Phone Number</Label>
                      <Input
                        id="recipient-phone"
                        type="tel"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="+233 XX XXX XXXX"
                        className="text-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="p2p-amount">Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">$</span>
                        <Input
                          id="p2p-amount"
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="pl-8 text-lg"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        {['5', '10', '25', '50'].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setPaymentAmount(amount)}
                            className="text-xs"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="note">Note (Optional)</Label>
                      <Input
                        id="note"
                        placeholder="Add a note..."
                        className="text-sm"
                      />
                    </div>

                    <Link to="/remittance">
                      <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Money
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="merchant">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-[#dd3333]" />
                      Nearby Merchants
                    </CardTitle>
                    <CardDescription>
                      Find and pay registered businesses near you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {merchants.map((merchant, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                              <Store className="w-5 h-5 text-[#dd3333]" />
                            </div>
                            <div>
                              <div className="font-semibold">{merchant.name}</div>
                              <div className="text-sm text-gray-600">
                                {merchant.category} • {merchant.distance} • ⭐ {merchant.rating}
                              </div>
                            </div>
                          </div>
                          <Button size="sm">
                            Pay
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recent Transactions & Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-gray-600" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">
                          {transaction.merchant || transaction.recipient}
                        </div>
                        <div className="text-xs text-gray-600">
                          {transaction.type} • {transaction.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{transaction.amount}</div>
                        <div className="text-xs text-green-600">Completed</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: QrCode, label: 'Generate QR Code', desc: 'Let others pay you', color: 'text-[#dd3333]' },
                  { icon: CreditCard, label: 'Payment Links', desc: 'Share payment links', color: 'text-[#000000]' },
                  { icon: Receipt, label: 'Request Money', desc: 'Ask for payments', color: 'text-[#dd3333]' },
                  { icon: Wallet, label: 'Split Bills', desc: 'Share expenses', color: 'text-[#000000]' },
                ].map((feature, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                  >
                    <div className="flex items-center gap-3">
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      <div className="text-left">
                        <div className="font-medium text-sm">{feature.label}</div>
                        <div className="text-xs text-gray-600">{feature.desc}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}