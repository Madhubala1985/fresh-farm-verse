
import { Product } from '@/types';
import AuctionCard from './AuctionCard';
import ProductGrid from './ProductGrid';

// Define reliable auction product images
export const AUCTION_PRODUCT_IMAGES = [
  'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
  'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg',
  'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
  'https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg',
  'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg'
];

const AuctionsList = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Auctions</h2>
        <p className="text-muted-foreground">
          Bid on fresh farm products in real-time auctions
        </p>
      </div>
      
      <ProductGrid auctionsOnly={true} />
    </div>
  );
};

export default AuctionsList;
