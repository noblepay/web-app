import Header from '@/components/Header.tsx';
import Hero from '@/components/Hero.tsx';
import RemittanceSection from '@/components/RemittanceSection.tsx';
import MobileMoneySection from '@/components/MobileMoneySection.tsx';  
import BillsSection from '@/components/BillsSection.tsx';
import PaymentsSection from '@/components/PaymentsSection.tsx';
import MarketplaceSection from '@/components/MarketplaceSection.tsx';
import Footer from '@/components/Footer.tsx';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <div className="py-16">
          <RemittanceSection />
        </div>
        <div className="py-16 bg-gray-50">
          <MobileMoneySection />
        </div>
        <div className="py-16">
          <BillsSection />
        </div>
        <div className="py-16 bg-gray-50">
          <PaymentsSection />
        </div>
        <div className="py-16">
          <MarketplaceSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
