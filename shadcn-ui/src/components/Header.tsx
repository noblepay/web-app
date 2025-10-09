import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wallet, Globe, Smartphone, CreditCard, Store, Home, User, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/supabase-hooks';
import { useNavigate } from 'react-router-dom';

// Auth Button Component
function AuthButton() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <Button
      variant="outline"
      className="border-[#dd3333] text-[#dd3333] hover:bg-[#dd3333] hover:text-white"
      onClick={handleAuthAction}
    >
      {user ? (
        <>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </>
      ) : (
        <>
          <User className="w-4 h-4 mr-2" />
          Login
        </>
      )}
    </Button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Globe, label: 'Remittance', href: '/remittance' },
    { icon: Smartphone, label: 'Mobile Recharge', href: '/mobile-recharge' },
    { icon: CreditCard, label: 'Bill Payment', href: '/bill-payment' },
    { icon: Wallet, label: 'Payments', href: '#payments' },
    { icon: Store, label: 'Marketplace', href: '#marketplace' },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
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
              onClick={() => handleNavigation(item.href)}
              className="flex items-center space-x-1 text-gray-600 hover:text-[#dd3333] transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          <AuthButton />
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
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-[#dd3333]" />
                  <span className="text-lg">{item.label}</span>
                </button>
              ))}
              <AuthButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}