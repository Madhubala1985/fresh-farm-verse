
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

const ComparisonFloatingButton = () => {
  const { comparisonList, clearComparison } = useComparison();
  
  if (comparisonList.length === 0) return null;
  
  const maxReached = comparisonList.length === 4;
  
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg p-2 border border-border">
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={cn(
                "ml-2 text-sm font-medium",
                maxReached && "text-amber-600"
              )}>
                {comparisonList.length}/4 {comparisonList.length === 1 ? 'item' : 'items'}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              {maxReached 
                ? "Maximum comparison limit reached (4 items)" 
                : `You can add ${4 - comparisonList.length} more ${(4 - comparisonList.length) === 1 ? 'item' : 'items'}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={clearComparison}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <Button asChild className={cn(
        "rounded-full",
        maxReached && "bg-amber-600 hover:bg-amber-700"
      )}>
        <Link to="/compare">
          <BarChart2 className="h-4 w-4 mr-1" />
          Compare
        </Link>
      </Button>
    </div>
  );
};

export default ComparisonFloatingButton;
