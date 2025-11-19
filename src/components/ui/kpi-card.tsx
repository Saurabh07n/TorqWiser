// src/components/ui/kpi-card.tsx
import { Card } from './card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface KPICardProps {
  label: string;
  value: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  isPrimary?: boolean;
  delay?: number;
}

export function KPICard({ 
  label, 
  value, 
  description, 
  trend, 
  trendValue, 
  className,
  isPrimary = false,
  delay = 0
}: KPICardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-[#D4AF37]" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-[#ef4444]" />;
      default:
        return <Minus className="h-4 w-4 text-[#707070]" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-[#D4AF37]';
      case 'down':
        return 'text-[#ef4444]';
      default:
        return 'text-[#707070]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={cn(
        "p-8 border border-[rgba(232,232,232,0.1)] hover:border-[rgba(212,175,55,0.3)] transition-all duration-300",
        isPrimary ? "bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-[rgba(212,175,55,0.05)] border-[rgba(212,175,55,0.2)]" : "",
        className
      )}>
        <div className="text-center space-y-4">
          <p className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            isPrimary ? "text-[#D4AF37]" : "text-[#707070]"
          )}>
            {label}
          </p>
          <motion.p 
            className={cn(
              "font-bold font-mono",
              isPrimary ? "text-4xl md:text-5xl text-[#D4AF37]" : "text-3xl md:text-4xl text-[#E8E8E8]"
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
          {description && (
            <p className="text-xs text-[#707070]">{description}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center justify-center space-x-2 pt-2">
              {getTrendIcon()}
              <span className={cn("text-sm font-semibold", getTrendColor())}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

