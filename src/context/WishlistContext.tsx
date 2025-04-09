
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { toast } from 'sonner';

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];
    
    const savedWishlist = localStorage.getItem('farmmarket-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('farmmarket-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist(prev => [...prev, product]);
      toast.success(`${product.name} added to your wishlist!`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    toast.info('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
