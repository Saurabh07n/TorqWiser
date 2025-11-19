// src/components/hero-section.tsx
'use client';

import { Button } from './ui/button';
import { Car, TrendingUp, DollarSign, Clock, Wallet, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showMath, setShowMath] = useState(false);
  
  const phrases = [
    "Save money",
    "Pay faster", 
    "Invest better"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1419] via-[#1A1A1A] to-[#2C3E50] relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 md:w-40 md:h-40 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 md:w-52 md:h-52 bg-[#2C3E50] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-[#1B4D5C] rounded-full blur-2xl"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(232, 232, 232, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 232, 232, 0.1) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-left"
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8E8E8] font-heading leading-tight"
            >
              Wealth Through
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F0E68C] bg-clip-text text-transparent">
                Smart Financing
              </span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-[#E8E8E8] font-light max-w-xl"
            >
              Lower EMI + invested difference → corpus beats extra interest.
            </motion.p>
            
            {/* Rotating phrases */}
            <div className="h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl font-semibold text-[#D4AF37]"
                >
                  {phrases[currentPhrase]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/calculator/loan-vs-sip" className="flex items-center space-x-3">
                    <span>Optimize Your Investment</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span>→</span>
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-8 text-sm text-[#707070]"
            >
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-[#D4AF37]" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                <span>Smart calculations</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Premium Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-8 border border-[rgba(232,232,232,0.1)]"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-[#707070] mb-2">EMI</div>
                  <div className="text-3xl font-bold text-[#E8E8E8] font-mono">₹18,500</div>
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-[#707070] mb-2">SIP / month</div>
                  <div className="text-3xl font-bold text-[#E8E8E8] font-mono">₹6,500</div>
                </div>
                <div className="text-left col-span-2">
                  <div className="text-xs uppercase tracking-wider text-[#707070] mb-2">Projected corpus</div>
                  <div className="text-4xl font-bold text-[#D4AF37] font-mono">₹2.8L</div>
                </div>
                <div className="text-left col-span-2 pt-4 border-t border-[rgba(232,232,232,0.1)]">
                  <div className="text-xs uppercase tracking-wider text-[#707070] mb-1">Advantage</div>
                  <div className="text-sm font-semibold text-[#D4AF37]">Saves ₹45K vs max EMI in 5 years</div>
                </div>
              </div>
            </motion.div>
            
            {/* Abstract geometric shapes */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border border-[rgba(212,175,55,0.2)] rounded-lg rotate-45 opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 border border-[rgba(212,175,55,0.15)] rounded-full opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

