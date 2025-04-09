import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionsList from '@/components/AuctionsList';

const Auctions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-farm-brown mb-4">
            Live Auctions
          </h1>
          <p className="text-muted-foreground mt-2">
            Bid on fresh, local produce and support our farmers.
          </p>
          
          <AuctionsList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auctions;
