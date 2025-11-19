// src/components/ui/calculator-card.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { cn } from '@/lib/utils';

interface CalculatorCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  helpText?: string;
}

export function CalculatorCard({ 
  title, 
  description, 
  children, 
  className,
  helpText 
}: CalculatorCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <CardTitle className="text-lg font-semibold uppercase tracking-wider text-[#E8E8E8] font-heading">{title}</CardTitle>
          {helpText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#707070] hover:text-[#D4AF37] cursor-help transition-colors duration-300" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1A1A1A] border border-[rgba(232,232,232,0.1)] text-[#E8E8E8]">
                  <p className="max-w-xs text-sm">{helpText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {description && (
          <CardDescription className="text-[#707070]">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

