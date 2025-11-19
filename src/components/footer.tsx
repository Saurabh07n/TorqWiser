// src/components/footer.tsx
import Link from 'next/link';
import { Car, Calculator, BookOpen, Info, FileText, Shield } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: 'Calculators',
      links: [
        { label: 'EMI Calculator', href: '/calculator/emi' },
        { label: 'Loan vs SIP', href: '/calculator/loan-vs-sip' },
        { label: 'Step-up SIP', href: '/scenarios/step-up' },
        { label: 'Parallel SIPs', href: '/scenarios/two-sip' },
      ]
    },
    {
      title: 'Learn',
      links: [
        { label: 'EMI Formula', href: '/learn/emi-formula' },
        { label: 'SIP Math', href: '/learn/sip-math' },
        { label: 'Strategy Guide', href: '/learn/strategy-guide' },
        { label: 'FAQs', href: '/learn/faq' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Contact', href: '/contact' },
      ]
    }
  ];

  return (
    <footer className="bg-[#1A1A1A] border-t border-[rgba(232,232,232,0.1)] text-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#2C3E50]">
                <Car className="h-6 w-6 text-[#0F1419]" />
              </div>
              <span className="text-2xl font-bold font-heading">TorqWiser</span>
            </div>
            <p className="text-[#707070] mb-6 leading-relaxed">
              Plan your car smartly: balance EMIs and investments with math.
            </p>
            <div className="text-sm text-[#707070]">
              <p>© 2024 TorqWiser. All rights reserved.</p>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E8E8E8] mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-[#707070] hover:text-[#D4AF37] transition-colors duration-300 text-sm relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(232,232,232,0.1)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[#707070] mb-4 md:mb-0 max-w-2xl">
              <p>
                TorqWiser is a financial planning tool. All calculations are for educational purposes only.
                Please consult with a financial advisor before making investment decisions.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-[#707070]">
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

