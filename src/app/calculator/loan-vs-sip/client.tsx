// src/app/calculator/loan-vs-sip/client.tsx
'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/navigation';
import { CalculatorCard } from '@/components/ui/calculator-card';
import { NumberField } from '@/components/ui/number-field';
import { SliderField } from '@/components/ui/slider-field';
import { KPICard } from '@/components/ui/kpi-card';
import { LoanSIPChart } from '@/components/ui/loan-sip-chart';
import { GuidanceCard } from '@/components/ui/guidance-card';
import { Button } from '@/components/ui/button';
import { calculateCarFinanceStrategy, formatINR } from '@/lib/finance';
import { CalculatorInputs, StrategyType, ChartDataPoint } from '@/lib/types';
import { RotateCcw } from 'lucide-react';

export default function LoanVsSIPCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    carPrice: 1000000,
    downPayment: 200000,
    loanRate: 0.083,
    tenureMonths: 60, // This will be calculated based on strategy
    monthlyBudget: 25000,
    sipRate: 0.12,
    horizonMonths: 60,
    strategy: 'balanced'
  });

  const [selectedStrategy, setSelectedStrategy] = useState<'balanced' | 'aggressive-emi' | 'aggressive-sip'>('balanced');

  const loanPrincipal = Math.max(0, inputs.carPrice - inputs.downPayment);
  
  // Calculate optimal tenure based on selected strategy
  const calculateOptimalTenure = (strategy: string) => {
    const baseTenure = 60; // Default 5 years
    switch (strategy) {
      case 'aggressive-emi':
        return Math.max(24, Math.floor(baseTenure * 0.6)); // 3-4 years for aggressive EMI
      case 'aggressive-sip':
        return Math.min(84, Math.floor(baseTenure * 1.4)); // 6-7 years for aggressive SIP
      case 'balanced':
      default:
        return baseTenure; // 5 years for balanced
    }
  };

  // Calculate results using the new function
  const results = useMemo(() => {
    const tenure = calculateOptimalTenure(selectedStrategy);
    return calculateCarFinanceStrategy(
      inputs.carPrice,
      inputs.downPayment,
      inputs.loanRate,
      tenure,
      inputs.monthlyBudget,
      inputs.sipRate,
      inputs.horizonMonths
    );
  }, [inputs, selectedStrategy]);
  
  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!results.timeline) return [];
    
    return results.timeline.map((point) => ({
      month: point.month,
      loanBalance: point.loanBalance,
      sipValue: point.sipValue,
      emi: results.emi,
      sipContribution: results.monthlySIP
    }));
  }, [results]);

  const updateInput = (key: keyof CalculatorInputs, value: number | StrategyType) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setInputs({
      carPrice: 1000000,
      downPayment: 200000,
      loanRate: 0.083,
      tenureMonths: 60,
      monthlyBudget: 25000,
      sipRate: 0.12,
      horizonMonths: 60,
      strategy: 'balanced'
    });
  };


  // Generate guidance based on selected strategy
  const generateGuidance = () => {
    const netPosition = results.netPosition;
    const tenure = calculateOptimalTenure(selectedStrategy);
    
    switch (selectedStrategy) {
      case 'balanced':
        return {
          recommendation: netPosition >= 0 ? 'positive' as const : 'negative' as const,
          title: 'Balanced Approach',
          value: `${tenure} months tenure`,
          description: netPosition >= 0 ? 'Optimal for wealth creation' : 'Consider adjusting parameters',
          details: netPosition >= 0 
            ? `With a ${tenure}-month tenure, you can balance loan payments with SIP investments, potentially earning ₹${Math.round(Math.abs(netPosition) / 1000)}K more over the loan period.`
            : `The current parameters suggest paying off the loan faster might be more beneficial. Consider increasing your monthly budget or adjusting the loan amount.`
        };
      
      case 'aggressive-emi':
        return {
          recommendation: 'negative' as const,
          title: 'Aggressive EMI Approach',
          value: `${tenure} months tenure`,
          description: 'Minimize total interest paid',
          details: `By choosing a shorter ${tenure}-month tenure, you'll pay off the loan faster and minimize total interest. This approach prioritizes debt freedom over investment returns.`
        };
      
      case 'aggressive-sip':
        return {
          recommendation: 'positive' as const,
          title: 'Aggressive SIP Approach',
          value: `${tenure} months tenure`,
          description: 'Maximize investment returns',
          details: `With a longer ${tenure}-month tenure, you can invest more in SIP while paying lower EMIs. This approach maximizes your wealth creation potential through compound returns.`
        };
      
      default:
        return {
          recommendation: 'positive' as const,
          title: 'Strategy Analysis',
          value: 'Review your options',
          description: 'Compare different approaches',
          details: 'Select a strategy above to see detailed insights and recommendations.'
        };
    }
  };

  const guidance = generateGuidance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A1A] to-[#2C3E50]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Premium Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#E8E8E8] font-heading mb-2">Car Finance Planner</h1>
              <p className="text-[#707070] text-sm uppercase tracking-wider">Strategic Wealth Optimization</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" onClick={resetToDefaults} className="border-[rgba(232,232,232,0.2)] text-[#E8E8E8] hover:border-[#D4AF37] hover:text-[#D4AF37]">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          
          {/* Strategy Selector */}
          <div className="flex flex-wrap gap-4">
            {[
              { key: 'balanced' as const, label: 'Balanced Approach', description: '5-year tenure' },
              { key: 'aggressive-emi' as const, label: 'Aggressive EMI', description: '3-4 year tenure' },
              { key: 'aggressive-sip' as const, label: 'Aggressive SIP', description: '6-7 year tenure' }
            ].map((strategy) => (
              <Button
                key={strategy.key}
                variant={selectedStrategy === strategy.key ? 'default' : 'outline'}
                onClick={() => setSelectedStrategy(strategy.key)}
                className="flex flex-col items-center p-6 h-auto min-w-[180px] uppercase tracking-wider"
              >
                <span className="font-semibold text-sm mb-1">{strategy.label}</span>
                <span className="text-xs opacity-75">{strategy.description}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <CalculatorCard
              title="Car Details"
              helpText="Enter your car purchase details and monthly budget"
            >
              <div className="space-y-4">
                {/* Monthly Budget - Most Important */}
                <SliderField
                  label="Monthly EMI Budget"
                  value={inputs.monthlyBudget}
                  onChange={(value) => updateInput('monthlyBudget', value)}
                  min={10000}
                  max={100000}
                  step={1000}
                  format="currency"
                />
                
                <NumberField
                  label="Car Price"
                  value={inputs.carPrice}
                  onChange={(value) => updateInput('carPrice', value)}
                  format="currency"
                  min={100000}
                  max={50000000}
                />
                <NumberField
                  label="Down Payment"
                  value={inputs.downPayment}
                  onChange={(value) => updateInput('downPayment', value)}
                  format="currency"
                  min={0}
                  max={inputs.carPrice}
                />
                <div className="p-4 glass rounded-lg border border-[rgba(212,175,55,0.2)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#707070] uppercase tracking-wider text-xs">Loan Principal:</span>
                    <span className="font-bold text-[#D4AF37] font-mono">
                      {formatINR(loanPrincipal)}
                    </span>
                  </div>
                </div>
              </div>
            </CalculatorCard>

            <CalculatorCard
              title="Loan Parameters"
              helpText="Set your loan interest rate"
            >
              <div className="space-y-4">
                <SliderField
                  label="Interest Rate (p.a.)"
                  value={inputs.loanRate}
                  onChange={(value) => updateInput('loanRate', value)}
                  min={0.05}
                  max={0.20}
                  step={0.001}
                  format="percentage"
                />
                <div className="p-4 glass rounded-lg border border-[rgba(212,175,55,0.2)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#707070] uppercase tracking-wider text-xs">Recommended Tenure:</span>
                    <span className="font-bold text-[#D4AF37] font-mono">
                      {calculateOptimalTenure(selectedStrategy)} months
                    </span>
                  </div>
                </div>
              </div>
            </CalculatorCard>

            <CalculatorCard
              title="Investment Parameters"
              helpText="Set your expected SIP returns and analysis horizon"
            >
              <div className="space-y-4">
                <SliderField
                  label="SIP Return (p.a.)"
                  value={inputs.sipRate}
                  onChange={(value) => updateInput('sipRate', value)}
                  min={0.08}
                  max={0.20}
                  step={0.001}
                  format="percentage"
                />
                <SliderField
                  label="Analysis Horizon (months)"
                  value={inputs.horizonMonths}
                  onChange={(value) => updateInput('horizonMonths', value)}
                  min={12}
                  max={120}
                  step={1}
                />
              </div>
            </CalculatorCard>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Premium Top Banner - Key Difference */}
            <div className="glass rounded-xl p-8 border border-[rgba(212,175,55,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 font-mono">
                  <span className="text-3xl">
                    {results.sipReturns > results.totalInterest ? '📈' : '📉'}
                  </span>
                  <span className={results.sipReturns >= results.totalInterest ? 'text-[#D4AF37]' : 'text-[#ef4444]'}>
                    {results.sipReturns >= results.totalInterest ? '+' : ''}{formatINR(results.sipReturns - results.totalInterest)}
                  </span>
                </div>
                <div className="text-[#707070] text-sm uppercase tracking-wider">
                  SIP Returns: {formatINR(results.sipReturns)} • Loan Interest: {formatINR(results.totalInterest)} • Tenure: {calculateOptimalTenure(selectedStrategy)} months
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - EMI Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8E8E8] uppercase tracking-wider flex items-center gap-3 font-heading">
                  <span className="text-2xl">🏦</span>
                  <span>EMI Details</span>
                </h3>
                
                <div className="space-y-4">
                  <KPICard
                    label="Monthly EMI"
                    value={formatINR(results.emi)}
                    description="Loan payment"
                    delay={0.1}
                  />
                  
                  <KPICard
                    label="Total Principal"
                    value={formatINR(loanPrincipal)}
                    description="Loan amount"
                    delay={0.2}
                  />
                  
                  <KPICard
                    label="Total Interest"
                    value={formatINR(results.totalInterest)}
                    description="Interest paid"
                    delay={0.3}
                  />
                  
                  <KPICard
                    label="Loan Tenure"
                    value={`${calculateOptimalTenure(selectedStrategy)} months`}
                    description="Payment period"
                    delay={0.4}
                  />
                </div>
              </div>

              {/* Right Column - SIP Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8E8E8] uppercase tracking-wider flex items-center gap-3 font-heading">
                  <span className="text-2xl">💰</span>
                  <span>SIP Details</span>
                </h3>
                
                <div className="space-y-4">
                  <KPICard
                    label="Monthly SIP"
                    value={formatINR(results.monthlySIP)}
                    description="Investment amount"
                    delay={0.5}
                  />
                  
                  <KPICard
                    label="Total Principal"
                    value={formatINR(results.sipPrincipal)}
                    description="Total invested"
                    delay={0.6}
                  />
                  
                  <KPICard
                    label="Total Returns"
                    value={formatINR(results.sipReturns)}
                    description="Investment gains"
                    delay={0.7}
                  />
                  
                  <KPICard
                    label="Final Value"
                    value={formatINR(results.sipFinalValue)}
                    description="Total corpus"
                    delay={0.8}
                  />
                </div>
              </div>
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <LoanSIPChart
                data={chartData}
                delay={0.5}
              />
            )}

            {/* Guidance Card */}
            <GuidanceCard
              recommendation={guidance.recommendation}
              title={guidance.title}
              value={guidance.value}
              description={guidance.description}
              details={guidance.details}
              delay={0.6}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
