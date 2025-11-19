// src/components/ui/guidance-card.tsx
import { Card, CardContent } from './card';
import { Button } from './button';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface GuidanceCardProps {
  recommendation: 'positive' | 'negative' | 'neutral';
  title: string;
  value: string;
  description: string;
  details?: string;
  className?: string;
  delay?: number;
}

const recommendationConfig = {
  positive: {
    icon: CheckCircle,
    iconColor: 'text-[#D4AF37]',
    bgColor: 'bg-[rgba(212,175,55,0.1)]',
    borderColor: 'border-[rgba(212,175,55,0.3)]',
    textColor: 'text-[#D4AF37]',
    emoji: '✅'
  },
  negative: {
    icon: XCircle,
    iconColor: 'text-[#ef4444]',
    bgColor: 'bg-[rgba(239,68,68,0.1)]',
    borderColor: 'border-[rgba(239,68,68,0.3)]',
    textColor: 'text-[#ef4444]',
    emoji: '🚫'
  },
  neutral: {
    icon: Lightbulb,
    iconColor: 'text-[#1B4D5C]',
    bgColor: 'bg-[rgba(27,77,92,0.1)]',
    borderColor: 'border-[rgba(27,77,92,0.3)]',
    textColor: 'text-[#1B4D5C]',
    emoji: '💡'
  }
};

export function GuidanceCard({ 
  recommendation, 
  title, 
  value, 
  description, 
  details,
  className,
  delay = 0
}: GuidanceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = recommendationConfig[recommendation];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={cn(
        "border-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300",
        config.bgColor,
        config.borderColor,
        className
      )}>
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            <div className={cn("p-3 rounded-xl", config.bgColor, "border border-current")}>
              <Icon className={cn("h-8 w-8", config.iconColor)} />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{config.emoji}</span>
                <h3 className={cn("text-xl font-bold uppercase tracking-wider", config.textColor)}>
                  {title}
                </h3>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 0.2 }}
                className={cn("text-4xl font-bold font-mono", config.textColor)}
              >
                {value}
              </motion.div>
              
              <p className={cn("text-sm leading-relaxed", config.textColor, "opacity-90")}>
                {description}
              </p>
              
              {details && (
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn("text-xs p-0 h-auto", config.textColor)}
                  >
                    Why?
                    {isExpanded ? (
                      <ChevronUp className="h-3 w-3 ml-1" />
                    ) : (
                      <ChevronDown className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={cn("mt-3 p-3 rounded-lg text-xs", config.bgColor)}>
                          {details}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
