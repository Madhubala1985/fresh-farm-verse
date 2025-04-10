
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { cn } from '@/lib/utils';

const ComparisonFloatingButton = () => {
  const { comparisonList, clearComparison } = useComparison();
  
  if (comparisonList.length === 0) return null;
  
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg p-2 border border-border">
      <div className="flex items-center">
        <span className="ml-2 text-sm font-medium">
          {comparisonList.length} {comparisonList.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={clearComparison}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <Button asChild className="rounded-full">
        <Link to="/compare">
          <BarChart2 className="h-4 w-4 mr-1" />
          Compare
        </Link>
      </Button>
    </div>
  );
};

export default ComparisonFloatingButton;
