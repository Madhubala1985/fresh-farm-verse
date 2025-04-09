import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/ProductGrid";
import AuctionsList from "@/components/AuctionsList";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-farm-brown">Farm Marketplace</h1>
              <p className="text-muted-foreground mt-2">
                Browse fresh produce directly from local farmers
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Narrow down products based on your preferences
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Vegetables', 'Fruits', 'Dairy & Eggs', 'Meat', 'Honey & Preserves', 'Herbs'].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={`category-${category}`} 
                              className="rounded border-input h-4 w-4 text-farm-green focus:ring-farm-green"
                            />
                            <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Product Type</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="organic" 
                            className="rounded border-input h-4 w-4 text-farm-green focus:ring-farm-green"
                          />
                          <label htmlFor="organic" className="text-sm">Organic</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="seasonal" 
                            className="rounded border-input h-4 w-4 text-farm-green focus:ring-farm-green"
                          />
                          <label htmlFor="seasonal" className="text-sm">Seasonal</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="min-price" className="text-xs">Min ($)</label>
                          <input 
                            type="number" 
                            id="min-price" 
                            min="0"
                            className="w-full rounded-md border border-input px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="max-price" className="text-xs">Max ($)</label>
                          <input 
                            type="number" 
                            id="max-price" 
                            min="0"
                            className="w-full rounded-md border border-input px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button variant="outline">Reset</Button>
                    <Button className="bg-farm-green hover:bg-farm-green/90" onClick={() => setFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button className="bg-farm-green hover:bg-farm-green/90">
                Search Nearby
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mb-6">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="auctions">Live Auctions</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ProductGrid showFilters={true} />
            </TabsContent>
            
            <TabsContent value="auctions">
              <AuctionsList />
            </TabsContent>
            
            <TabsContent value="featured">
              <ProductGrid title="Featured Products" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
