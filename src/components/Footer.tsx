
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-farm-brown-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">FarmMarket</h3>
            <p className="text-sm text-gray-300 mb-4">
              Connecting farmers and consumers directly for fresher, more sustainable food systems.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:underline">Marketplace</Link></li>
              <li><Link to="/auctions" className="hover:underline">Auctions</Link></li>
              <li><Link to="/farmers" className="hover:underline">Our Farmers</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping Policy</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-sm text-gray-300 mb-4">
              Stay updated with our latest products and offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 w-full rounded-l text-black text-sm"
              />
              <Button className="rounded-l-none bg-farm-accent-yellow text-black hover:bg-farm-accent-yellow/90">
                Join
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FarmMarket. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-400 hover:underline">Terms</Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:underline">Privacy</Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
