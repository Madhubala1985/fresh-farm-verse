
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  product: Product;
  variant?: 'default' | 'icon' | 'outline';
  className?: string;
}

const WishlistButton = ({ product, variant = 'default', className }: WishlistButtonProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full", className)}
        onClick={toggleWishlist}
      >
        <Heart 
          className={cn(
            "h-5 w-5 transition-colors", 
            isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
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
          isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "",
          className
        )}
        onClick={toggleWishlist}
      >
        <Heart 
          className={cn(
            "h-4 w-4", 
            isWishlisted ? "fill-red-500 text-red-500" : ""
          )} 
        />
        {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
      </Button>
    );
  }
  
  return (
    <Button
      variant={isWishlisted ? "destructive" : "secondary"}
      size="sm"
      className={className}
      onClick={toggleWishlist}
    >
      <Heart 
        className={cn(
          "h-4 w-4 mr-1", 
          isWishlisted ? "fill-white" : ""
        )} 
      />
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default WishlistButton;
