
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistProvider';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const joinDate = new Date('2025-04-01');
  
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="wishlist">My Wishlist</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">{user?.username || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user?.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <Badge variant="outline" className="capitalize">{user?.role || 'Not provided'}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Region</p>
                    <p className="text-sm text-muted-foreground">India</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Account created on {format(joinDate, 'MMMM d, yyyy')}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Your wishlist is empty</p>
                    <Button asChild variant="outline" className="mt-4">
                      <Link to="/marketplace">Browse Products</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {wishlist.map(product => (
                      <div key={product.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <Link to={`/product/${product.id}`} className="block w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.id}`} className="hover:underline">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">{formatPrice(product.price)} per {product.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveToCart(product.id)}
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromWishlist(product.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders yet</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/marketplace">Start Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
