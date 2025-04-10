
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { toast } from 'sonner';

type ComparisonContextType = {
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  isInComparison: (productId: string) => boolean;
  clearComparison: () => void;
  toggleComparison: (product: Product) => void;
};

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];
    
    const savedComparisonList = localStorage.getItem('farmmarket-comparison');
    return savedComparisonList ? JSON.parse(savedComparisonList) : [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('farmmarket-comparison', JSON.stringify(comparisonList));
    }
  }, [comparisonList]);

  const addToComparison = (product: Product) => {
    if (comparisonList.length >= 4) {
      toast.error('You can compare up to 4 products at a time');
      return;
    }
    
    if (!isInComparison(product.id)) {
      setComparisonList(prev => [...prev, product]);
      toast.success(`${product.name} added to comparison`);
    }
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList(prev => prev.filter(item => item.id !== productId));
    toast.info('Removed from comparison');
  };

  const isInComparison = (productId: string) => {
    return comparisonList.some(item => item.id === productId);
  };

  const clearComparison = () => {
    setComparisonList([]);
    toast.info('Comparison cleared');
  };
  
  const toggleComparison = (product: Product) => {
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        toggleComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
