// src/app/page.tsx
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';

export const metadata = {
  title: 'TorqWiser - Car Finance Guider | EMI vs SIP Calculator',
  description: 'Plan your car smartly: balance EMIs and investments with math. Compare aggressive vs balanced strategies for car financing in India.',
  keywords: ['car loan calculator', 'EMI calculator', 'SIP calculator', 'car finance', 'loan vs investment', 'India'],
  openGraph: {
    title: 'TorqWiser - Car Finance Guider',
    description: 'Plan your car smartly: balance EMIs and investments with math.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A1A] to-[#2C3E50]">
      <Navigation />
      <main>
        <HeroSection />
      </main>
      <footer className="py-8 text-center text-[#707070] text-sm">
        <p>© 2024 TorqWiser. Plan smarter, drive happier.</p>
      </footer>
    </div>
  );
}