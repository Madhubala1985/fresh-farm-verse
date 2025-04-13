
import { Product } from '@/types';
import ProductGrid from './ProductGrid';

const AuctionsList = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Auctions</h2>
        <p className="text-muted-foreground">
          Bid on fresh farm products in real-time auctions - direct from farmers to you
        </p>
      </div>
      
      <ProductGrid auctionsOnly={true} />
    </div>
  );
};

export default AuctionsList;
