import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wallet, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'How it Works', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const services = [
    { name: 'Send Money', href: '#remittance' },
    { name: 'Mobile Money', href: '#mobile-money' },
    { name: 'Pay Bills', href: '#bills' },
    { name: 'Merchant Pay', href: '#payments' },
    { name: 'Marketplace', href: '#marketplace' },
  ];

  const countries = [
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Ghana', flag: '🇬🇭' },
    { name: 'Ivory Coast', flag: '🇨🇮' },
    { name: 'Burkina Faso', flag: '🇧🇫' },
    { name: 'Benin', flag: '🇧🇯' },
    { name: 'Liberia', flag: '🇱🇷' },
    { name: 'Sierra Leone', flag: '🇸🇱' },
    { name: 'Guinea', flag: '🇬🇳' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with NoblePay</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest updates on new features, supported countries, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Button className="bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="bg-white p-2 rounded-lg inline-block">
                <img 
                  src="/noblepay-logo.webp" 
                  alt="NoblePay" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering underserved and underbanked populations in West Africa with 
              comprehensive digital financial services. Send money, pay bills, shop, 
              and manage your finances - all in one secure platform.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>Serving 9 countries across West Africa</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-green-400" />
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-green-400" />
                <span>support@noblepay.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h4 className="font-semibold text-lg mb-4">We Serve</h4>
            <div className="space-y-2">
              {countries.map((country) => (
                <div key={country.name} className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-gray-300">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Trust Badges */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="font-semibold text-lg mb-4 text-center">Trusted & Secure</h4>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="border-green-600 text-green-400">
              🔒 SSL Encrypted
            </Badge>
            <Badge variant="outline" className="border-blue-600 text-blue-400">
              🛡️ PCI Compliant
            </Badge>
            <Badge variant="outline" className="border-purple-600 text-purple-400">
              ✅ Licensed & Regulated
            </Badge>
            <Badge variant="outline" className="border-orange-600 text-orange-400">
              🏦 Bank-Level Security
            </Badge>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 NoblePay. All rights reserved.
              </p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <a href="#" className="hover:text-green-400">Privacy Policy</a>
                <a href="#" className="hover:text-green-400">Terms of Service</a>
                <a href="#" className="hover:text-green-400">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}