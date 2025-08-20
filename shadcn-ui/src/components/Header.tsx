import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wallet, Globe, Smartphone, CreditCard, Store, Home } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Globe, label: 'Remittance', href: '#remittance' },
    { icon: Smartphone, label: 'Mobile Money', href: '#mobile-money' },
    { icon: CreditCard, label: 'Bills', href: '#bills' },
    { icon: Wallet, label: 'Payments', href: '#payments' },
    { icon: Store, label: 'Marketplace', href: '#marketplace' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/noblepay-logo.webp" 
            alt="NoblePay" 
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="flex items-center space-x-1 text-gray-600 hover:text-[#dd3333] transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          <Button className="bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
            Get Started
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-[#dd3333]" />
                  <span className="text-lg">{item.label}</span>
                </button>
              ))}
              <Button className="bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white mt-4">
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}