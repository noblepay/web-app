import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Globe, Zap, Shield, Users, TrendingUp } from 'lucide-react';

export default function Hero() {
  const stats = [
    { icon: Users, label: 'Users Served', value: '1M+', color: 'text-[#dd3333]' },
    { icon: Globe, label: 'Countries', value: '8', color: 'text-[#000000]' },
    { icon: TrendingUp, label: 'Transactions', value: '$50M+', color: 'text-[#dd3333]' },
    { icon: Zap, label: 'Transfer Speed', value: '<1min', color: 'text-[#000000]' },
  ];

  return (
    <section id="home" className="pt-32 pb-24 bg-gradient-to-br from-red-50 via-gray-50 to-black/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge className="mb-6 bg-red-100 text-[#dd3333] hover:bg-red-100">
            🚀 Empowering West Africa's Financial Future
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#dd3333] to-[#000000] bg-clip-text text-transparent">
            Digital Financial Ecosystem for Everyone
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            NoblePay bridges the financial gap in West Africa with AI-driven tools, 
            cross-border remittance, mobile money integration, and a comprehensive 
            marketplace - all designed for the underserved and underbanked.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button size="lg" className="bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-lg px-8">
              <Smartphone className="w-5 h-5 mr-2" />
              Download Mobile App
            </Button>
            <Link to="/remittance">
              <Button size="lg" variant="outline" className="border-[#dd3333] text-[#dd3333] hover:bg-red-50 text-lg px-8">
                <Globe className="w-5 h-5 mr-2" />
                Send Money Now
              </Button>
            </Link>
          </div>

          {/* Key Features Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {[
              { icon: Globe, label: 'Cross-Border Remittance', desc: 'US to West Africa' },
              { icon: Smartphone, label: 'Mobile Money', desc: 'MTN, Airtel, Orange' },
              { icon: Zap, label: 'Bill Payments', desc: 'Utilities & Services' },
              { icon: Shield, label: 'Secure & Fast', desc: 'AI-Powered Security' },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-[#dd3333]" />
                <h3 className="font-semibold text-sm mb-2">{feature.label}</h3>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}