
import { Product } from '@/types';
import AuctionCard from './AuctionCard';
import { MOCK_PRODUCTS } from './ProductGrid';

// Filter products to get only those with auctions
const getAuctionProducts = () => {
  return MOCK_PRODUCTS.filter(product => product.auction);
};

const AuctionsList = () => {
  const auctionProducts = getAuctionProducts();
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Auctions</h2>
        <p className="text-muted-foreground">
          Bid on fresh farm products in real-time auctions
        </p>
      </div>
      
      {auctionProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionProducts.map((product) => (
            <AuctionCard 
              key={`auction-${product.auction?.id}`} 
              auction={product.auction!} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No active auctions at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AuctionsList;
