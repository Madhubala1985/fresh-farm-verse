
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-farm-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {state.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl">Your Cart</SheetTitle>
        </SheetHeader>
        
        {state.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">Your cart is empty</h3>
            <p className="text-muted-foreground mt-1">
              Add items from the marketplace to get started
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4">
              <div className="space-y-4 pr-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price)} / {item.product.unit}
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-muted-foreground hover:text-destructive mt-2"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-4">
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(state.total)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium">
                  {state.total > 1000 ? 'Free' : formatPrice(100)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">
                  {formatPrice(state.total > 1000 ? state.total : state.total + 100)}
                </span>
              </div>
              
              <Separator />
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
                <SheetClose asChild>
                  <Button 
                    className="flex-1 bg-farm-green hover:bg-farm-green-dark" 
                    onClick={() => window.location.href = '/checkout'}
                    as={Link}
                    to="/checkout"
                  >
                    Checkout
                  </Button>
                </SheetClose>
              </div>
              
              <SheetFooter className="pb-2 pt-2">
                <SheetClose asChild>
                  <Button variant="ghost">Continue Shopping</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDropdown;
