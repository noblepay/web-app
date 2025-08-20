import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Droplets, Wifi, Tv, Smartphone, CreditCard, Clock, CheckCircle } from 'lucide-react';

export default function BillsSection() {
  const billCategories = [
    {
      id: 'electricity',
      name: 'Electricity',
      icon: Zap,
      color: 'text-[#dd3333]',
      providers: ['NEPA', 'KPLC', 'ECG', 'SONABEL', 'LEC (Liberia)', 'EDSA (Sierra Leone)', 'EDG (Guinea)']
    },
    {
      id: 'water',
      name: 'Water',
      icon: Droplets,
      color: 'text-[#000000]',
      providers: ['GWCL', 'Lagos Water', 'SDE', 'ONEA', 'LWSC (Liberia)', 'Guma Valley (Sierra Leone)', 'SEG (Guinea)']
    },
    {
      id: 'internet',
      name: 'Internet',
      icon: Wifi,
      color: 'text-[#dd3333]',
      providers: ['MTN Fiber', 'Airtel', 'Orange', 'Surfline', 'Lonestar Cell', 'Africell', 'Sonatel Guinea']
    },
    {
      id: 'tv',
      name: 'TV/Cable',
      icon: Tv,
      color: 'text-[#000000]',
      providers: ['DSTV', 'GOtv', 'StarTimes', 'Canal+', 'MultiTV', 'AYV TV (Sierra Leone)']
    },
    {
      id: 'mobile',
      name: 'Mobile Data',
      icon: Smartphone,
      color: 'text-[#dd3333]',
      providers: ['MTN', 'Airtel', 'Orange', 'Moov', 'Lonestar Cell', 'Africell', 'Cellcom']
    }
  ];

  const recentBills = [
    { type: 'Electricity', provider: 'ECG', amount: '$25.50', status: 'paid', date: '2 days ago' },
    { type: 'Internet', provider: 'MTN Fiber', amount: '$45.00', status: 'pending', date: '5 days ago' },
    { type: 'TV', provider: 'DSTV', amount: '$30.00', status: 'paid', date: '1 week ago' },
  ];

  return (
    <section id="bills" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-[#dd3333]">
            <CreditCard className="w-4 h-4 mr-1" />
            Bill & Utility Payments
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pay All Your Bills in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Never miss a payment again. Pay electricity, water, internet, TV, 
            and mobile bills across West Africa with just a few taps.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bill Categories */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="electricity" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-6 h-auto">
                {billCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col items-center gap-1 p-2 sm:p-3 h-auto min-h-[60px] text-center"
                  >
                    <category.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${category.color}`} />
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {billCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                        {category.name} Bills
                      </CardTitle>
                      <CardDescription>
                        Pay your {category.name.toLowerCase()} bills instantly
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="provider">Select Provider</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {category.providers.map((provider) => (
                              <SelectItem key={provider} value={provider.toLowerCase()}>
                                {provider}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="account-number">Account/Meter Number</Label>
                        <Input
                          id="account-number"
                          placeholder="Enter your account number"
                          className="text-lg"
                        />
                      </div>

                      <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                        <category.icon className="w-4 h-4 mr-2" />
                        Pay {category.name} Bill
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Recent Bills */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Recent Bills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBills.map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bill.status === 'paid' ? 'bg-red-50' : 'bg-gray-100'
                        }`}>
                          {bill.status === 'paid' ? 
                            <CheckCircle className="w-4 h-4 text-[#dd3333]" /> :
                            <Clock className="w-4 h-4 text-[#000000]" />
                          }
                        </div>
                        <div>
                          <div className="font-semibold">{bill.provider}</div>
                          <div className="text-sm text-gray-600">{bill.type} • {bill.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{bill.amount}</div>
                        <div className={`text-sm ${
                          bill.status === 'paid' ? 'text-[#dd3333]' : 'text-[#000000]'
                        }`}>
                          {bill.status === 'paid' ? 'Paid' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common bill payments and top-ups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Zap, label: 'Electricity', color: 'text-[#dd3333]' },
                  { icon: Smartphone, label: 'Mobile Data', color: 'text-[#000000]' },
                  { icon: Tv, label: 'Cable TV', color: 'text-[#dd3333]' },
                  { icon: Wifi, label: 'Internet', color: 'text-[#000000]' },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
                    Pay {action.label}
                  </Button>
                ))}

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Set Up Auto-Pay</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Never miss a payment with automatic bill payments
                  </p>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Enable Auto-Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}