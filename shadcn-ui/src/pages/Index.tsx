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
    <div className="min-h-screen">
      <Header />
      <Hero />
      <RemittanceSection />
      <MobileMoneySection />
      <BillsSection />
      <PaymentsSection />
      <MarketplaceSection />
      <Footer />
    </div>
  );
}
