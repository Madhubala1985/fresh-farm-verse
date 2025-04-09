
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Check, Home, ShoppingBag, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Current date + 5 days for delivery
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  
  // Format date as DD Month, YYYY
  const formattedDate = deliveryDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Confetti effect on mount
  useEffect(() => {
    // This would be implemented with a confetti library in a real app
    // For now we'll just log it
    console.log('Showing confetti effect');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="h-24 w-24 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
            <Check className="h-12 w-12 text-green-600" strokeWidth={3} />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Your order has been placed and is being processed. You will receive an email confirmation shortly.
          </p>
          
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-6 mb-2">
                  <div className="relative">
                    <div className="h-1 bg-green-500 w-1/4 absolute left-0 top-0 rounded-full"></div>
                    <div className="h-1 bg-muted w-full rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs">
                    <div className="text-center">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Order Placed</span>
                    </div>
                    
                    <div className="text-center text-muted-foreground">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mx-auto mb-1">
                        <ShoppingBag className="h-3 w-3" />
                      </div>
                      <span>Processing</span>
                    </div>
                    
                    <div className="text-center text-muted-foreground">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mx-auto mb-1">
                        <Truck className="h-3 w-3" />
                      </div>
                      <span>Shipped</span>
                    </div>
                    
                    <div className="text-center text-muted-foreground">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mx-auto mb-1">
                        <Home className="h-3 w-3" />
                      </div>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-2">
              <Button 
                className="w-full bg-farm-green hover:bg-farm-green/90"
                onClick={() => navigate('/marketplace')}
              >
                Continue Shopping
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/profile')}
              >
                View Order History
              </Button>
            </CardFooter>
          </Card>
          
          <p className="text-sm mt-8 text-muted-foreground">
            Thank you for shopping with FarmMarket. Your purchase directly supports local farmers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
