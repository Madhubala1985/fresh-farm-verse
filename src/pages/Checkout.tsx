
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
  const { cart, clearCart, getTotal } = useCart();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.name) {
      setName(user.name || '');
    }
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast({
        title: "Your cart is empty.",
        description: "Add some items to your cart before checking out.",
      })
      return;
    }

    setIsSubmitting(true);

    // Simulate a successful order
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      toast({
        title: "Order placed!",
        description: "Thank you for your order!",
      })
      navigate('/checkout/success');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your cart is empty. Add items to continue.</p>
              <Button onClick={() => navigate('/marketplace')} className="mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping address.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      type="tel"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat/House No., Building, Street"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Mumbai"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Maharashtra"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="400001"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Choose your payment method.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="net-banking" id="net-banking" />
                      <Label htmlFor="net-banking">Net Banking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your order details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cart.map((item) => (
                      <li key={item.product.id} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between mt-4 pt-4 border-t">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{getTotal() > 1000 ? 'Free' : formatPrice(100)}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(getTotal() > 1000 ? getTotal() : getTotal() + 100)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={isSubmitting} className="w-full bg-farm-green hover:bg-farm-green/90">
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
