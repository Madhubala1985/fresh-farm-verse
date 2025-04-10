
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface CompareButtonProps {
  product: Product;
  variant?: 'default' | 'icon' | 'outline';
  className?: string;
}

const CompareButton = ({ product, variant = 'default', className }: CompareButtonProps) => {
  const { isInComparison, toggleComparison } = useComparison();
  
  const isCompared = isInComparison(product.id);
  
  const handleToggleComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComparison(product);
  };
  
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full hover:bg-background/80", className)}
        onClick={handleToggleComparison}
        aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
      >
        <BarChart2 
          className={cn(
            "h-5 w-5 transition-colors", 
            isCompared ? "fill-blue-100 text-blue-500" : "text-muted-foreground"
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

export default CompareButton;
