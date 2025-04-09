import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified } from "lucide-react";

interface Farmer {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  isVerified: boolean;
}

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  useEffect(() => {
    // Fetch farmers data from API or any data source
    const fetchFarmers = async () => {
      // Replace this with your actual data fetching logic
      const mockFarmers: Farmer[] = [
        {
          id: "1",
          name: "Green Acres Farm",
          location: " countryside, Anytown",
          description: "A family-owned farm specializing in organic vegetables and fruits.",
          image: "https://images.unsplash.com/photo-1516327109244-f00ca5789344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
          isVerified: true,
        },
        {
          id: "2",
          name: "Sunny Meadows Dairy",
          location: " rolling hills, Anytown",
          description: "Producing high-quality dairy products with happy, healthy cows.",
          image: "https://images.unsplash.com/photo-1571894243819-1c820a52c314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
          isVerified: false,
        },
        {
          id: "3",
          name: "Golden Grain Orchards",
          location: " fertile valley, Anytown",
          description: "Growing a variety of delicious apples, peaches, and pears.",
          image: "https://images.unsplash.com/photo-1541848756-a6fa5a749393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
          isVerified: true,
        },
        {
          id: "4",
          name: "Happy Hens Farm",
          location: " peaceful pastures, Anytown",
          description: "Providing fresh, free-range eggs from our flock of happy hens.",
          image: "https://images.unsplash.com/photo-1564856090349-6019d47ca06b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
          isVerified: false,
        },
      ];
      setFarmers(mockFarmers);
    };

    fetchFarmers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Meet Our Farmers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmers.map((farmer) => (
              <Card key={farmer.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-2xl font-bold">
                    <Link to={`/farmer/${farmer.id}`} className="hover:underline">
                      {farmer.name}
                      {farmer.isVerified && (
                        <Verified className="h-4 w-4 text-green-500 inline-block ml-1" />
                      )}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src={farmer.image} alt={farmer.name} />
                      <AvatarFallback>{farmer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardDescription className="text-gray-600">{farmer.description}</CardDescription>
                      <p className="text-gray-500 mt-2">Location: {farmer.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Farmers;
