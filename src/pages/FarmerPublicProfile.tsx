
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Phone, Mail, Clock, Award, CheckCircle } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

const FarmerPublicProfile = () => {
  const { farmerId } = useParams();
  
  // This would be fetched from an API in a real application
  const farmer = {
    id: farmerId,
    name: 'Green Harvest Farms',
    image: 'https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    rating: 4.8,
    reviewCount: 124,
    location: 'Nashik, Maharashtra',
    distance: '25 km away',
    phone: '+91 98765 43210',
    email: 'contact@greenharvestfarms.com',
    description: 'Green Harvest Farms is a family-owned farm specializing in organic vegetables and fruits. We have been farming using sustainable practices for over 20 years, focusing on soil health and biodiversity.',
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    certifications: ['Certified Organic', 'India Good Agricultural Practices', 'Non-GMO'],
    specialties: ['Alphonso Mangoes', 'Organic Rice', 'Fresh Spices', 'Seasonal Vegetables']
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-farm-green/80 to-farm-green-dark/80">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
                <AvatarImage src={farmer.image} alt={farmer.name} />
                <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="text-white">
                <h1 className="text-3xl font-bold">{farmer.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{farmer.rating}</span>
                    <span className="text-sm ml-1">({farmer.reviewCount} reviews)</span>
                  </div>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{farmer.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:ml-auto mt-4 md:mt-0">
                <Button className="bg-white text-farm-green hover:bg-white/90">
                  Contact Farmer
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground">{farmer.description}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-farm-green mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">{farmer.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-farm-green mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-sm text-muted-foreground">{farmer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-farm-green mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">{farmer.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-farm-green mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Hours</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>Mon-Fri: {farmer.hours.monday}</p>
                          <p>Saturday: {farmer.hours.saturday}</p>
                          <p>Sunday: {farmer.hours.sunday}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Certifications */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                  <div className="space-y-2">
                    {farmer.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-farm-green mr-2" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Specialties */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Farm Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {farmer.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-farm-green/5 text-farm-green border-farm-green/20">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="about">About Farm</TabsTrigger>
                </TabsList>
                
                <TabsContent value="products">
                  <ProductGrid farmerId={farmerId} />
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                    <div className="space-y-6">
                      {/* This would be populated from an API in a real application */}
                      <div className="border-b pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">John Doe</h3>
                              <p className="text-xs text-muted-foreground">2 weeks ago</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">
                          The produce from Green Valley Farms is always fresh and delicious. I especially love their heirloom tomatoes - they have so much flavor compared to store-bought ones!
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>AS</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">Alice Smith</h3>
                              <p className="text-xs text-muted-foreground">1 month ago</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">
                          I've been buying from Green Valley for years. Their commitment to organic farming practices really shows in the quality of their produce. Highly recommend!
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="about">
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">About Green Valley Farms</h2>
                    <p className="mb-4">
                      Green Valley Farms was established in 1995 by the Johnson family with a mission to grow nutritious food using sustainable farming practices. What started as a small 5-acre plot has grown into a diverse 40-acre farm that produces a wide variety of vegetables, fruits, and herbs.
                    </p>
                    <p className="mb-4">
                      Our farming philosophy centers around building healthy soil, promoting biodiversity, and minimizing our environmental footprint. We use organic methods, crop rotation, and integrated pest management to ensure our produce is not only delicious but also grown in harmony with nature.
                    </p>
                    <p className="mb-4">
                      We've been certified organic since 2001 and take pride in our commitment to sustainable agriculture. Our farm is also a learning center where we host educational tours and workshops for schools and community groups.
                    </p>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Seasonal Availability</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-farm-green/5 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Spring</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>Asparagus</li>
                            <li>Spring Greens</li>
                            <li>Radishes</li>
                            <li>Strawberries</li>
                          </ul>
                        </div>
                        <div className="bg-farm-green/5 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Summer</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>Tomatoes</li>
                            <li>Cucumbers</li>
                            <li>Zucchini</li>
                            <li>Berries</li>
                          </ul>
                        </div>
                        <div className="bg-farm-green/5 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Fall</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>Pumpkins</li>
                            <li>Winter Squash</li>
                            <li>Apples</li>
                            <li>Root Vegetables</li>
                          </ul>
                        </div>
                        <div className="bg-farm-green/5 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Winter</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>Kale</li>
                            <li>Citrus</li>
                            <li>Winter Greens</li>
                            <li>Stored Squash</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerPublicProfile;
