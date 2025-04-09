import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-farm-brown mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            We can't seem to find the page you're looking for.
          </p>
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
