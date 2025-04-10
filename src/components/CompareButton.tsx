
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CompareButtonProps {
  product: Product;
  variant?: 'default' | 'icon' | 'outline';
  className?: string;
}

const CompareButton = ({ product, variant = 'default', className }: CompareButtonProps) => {
  const { isInComparison, toggleComparison, comparisonList } = useComparison();
  
  const isCompared = isInComparison(product.id);
  const isMaxComparisonReached = comparisonList.length >= 4 && !isCompared;
  
  const handleToggleComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isMaxComparisonReached) {
      toggleComparison(product);
    }
  };
  
  const button = () => {
    if (variant === 'icon') {
      return (
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full hover:bg-background/80", className)}
          onClick={handleToggleComparison}
          disabled={isMaxComparisonReached}
          aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
        >
          <BarChart2 
            className={cn(
              "h-5 w-5 transition-colors", 
              isCompared ? "fill-blue-100 text-blue-500" : 
              isMaxComparisonReached ? "text-muted-foreground/40" : "text-muted-foreground"
            )} 
          />
        </Button>
      );
    }
    
    if (variant === 'outline') {
      return (
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-1",
            isCompared ? "bg-blue-50 border-blue-200 text-blue-500" : "",
            className
          )}
          onClick={handleToggleComparison}
          disabled={isMaxComparisonReached}
        >
          <BarChart2 
            className={cn(
              "h-4 w-4", 
              isCompared ? "fill-blue-100 text-blue-500" : ""
            )} 
          />
          {isCompared ? "Added to Compare" : "Compare"}
        </Button>
      );
    }
    
    return (
      <Button
        variant={isCompared ? "secondary" : "outline"}
        size="sm"
        className={className}
        onClick={handleToggleComparison}
        disabled={isMaxComparisonReached}
      >
        <BarChart2 
          className={cn(
            "h-4 w-4 mr-1", 
            isCompared ? "fill-blue-100" : ""
          )} 
        />
        {isCompared ? "Remove from Compare" : "Compare"}
      </Button>
    );
  };
  
  if (isMaxComparisonReached) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button()}
          </TooltipTrigger>
          <TooltipContent>
            <p>Max 4 products can be compared. Remove a product to add this one.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return button();
};

export default CompareButton;
