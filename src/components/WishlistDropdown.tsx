
import React from 'react';
import { useWishlist } from '@/context/WishlistProvider';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';

const WishlistDropdown = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const moveToCart = (productId: string) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addItem(product);
      removeFromWishlist(productId);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">Your Wishlist</SheetTitle>
        </SheetHeader>
        
        {wishlist.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center h-[70vh]">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">Your wishlist is empty</h3>
            <p className="text-muted-foreground mt-1">
              Save items you love for later
            </p>
            <SheetClose asChild>
              <Button variant="outline" className="mt-4">
                <Link to="/marketplace">Browse Products</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 my-4">
              <div className="space-y-4 pr-4">
                {wishlist.map((product) => (
                  <div key={product.id} className="group relative flex items-center space-x-4 bg-card rounded-lg p-2 border">
                    <Link to={`/product/${product.id}`} className="w-20 h-20 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link to={`/product/${product.id}`} className="hover:underline">
                        <h4 className="font-medium">{product.name}</h4>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      <p className="font-medium text-sm mt-1">{formatPrice(product.price)}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveToCart(product.id)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-auto pt-4 border-t flex justify-between items-center">
              <Button 
                variant="ghost" 
                className="text-muted-foreground"
                onClick={clearWishlist}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <SheetClose asChild>
                <Button variant="ghost">Done</Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDropdown;
