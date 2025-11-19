// src/components/navigation.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Car, Calculator, BookOpen, Info, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Calculators',
      href: '#',
      children: [
        { label: 'EMI Calculator', href: '/calculator/emi' },
        { label: 'Loan vs SIP', href: '/calculator/loan-vs-sip' },
        { label: 'Step-up SIP', href: '/scenarios/step-up' },
        { label: 'Parallel SIPs', href: '/scenarios/two-sip' },
      ]
    },
    { label: 'Learn', href: '/learn' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-[#0F1419] border-b border-[rgba(232,232,232,0.1)] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#2C3E50] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
              <Car className="h-6 w-6 text-[#0F1419]" />
            </div>
            <span className="text-2xl font-bold text-[#E8E8E8] font-heading tracking-tight">TorqWiser</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button className="flex items-center space-x-2 text-[#E8E8E8] hover:text-[#D4AF37] transition-colors duration-300 uppercase text-sm font-semibold tracking-wider">
                      <span>{item.label}</span>
                      <Calculator className="h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#1A1A1A] border border-[rgba(232,232,232,0.1)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-6 py-3 text-sm text-[#E8E8E8] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#D4AF37] transition-all duration-200 first:rounded-t-xl last:rounded-b-xl border-b border-[rgba(232,232,232,0.05)] last:border-b-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-[#E8E8E8] hover:text-[#D4AF37] transition-colors duration-300 uppercase text-sm font-semibold tracking-wider"
                  >
                    {item.label === 'Learn' && <BookOpen className="h-4 w-4" />}
                    {item.label === 'About' && <Info className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild size="sm">
              <Link href="/calculator/loan-vs-sip">
                See Smart Split
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-lg text-[#E8E8E8] hover:text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(232,232,232,0.1)] py-6">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-2">
                      <div className="font-semibold text-[#E8E8E8] uppercase tracking-wider text-sm px-2">{item.label}</div>
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-2 py-2 text-sm text-[#E8E8E8] hover:text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-2 py-2 text-[#E8E8E8] hover:text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] rounded-lg transition-all duration-200 uppercase text-sm font-semibold tracking-wider"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-[rgba(232,232,232,0.1)]">
                <Button asChild className="w-full">
                  <Link href="/calculator/loan-vs-sip" onClick={() => setIsMobileMenuOpen(false)}>
                    See Smart Split
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

