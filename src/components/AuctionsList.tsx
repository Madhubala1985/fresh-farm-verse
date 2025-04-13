
import { Product } from '@/types';
import ProductGrid from './ProductGrid';
import { PRODUCT_IMAGES } from '@/utils/productImages';

// Define auction product images using our uploaded images
export const AUCTION_PRODUCT_IMAGES = [
  PRODUCT_IMAGES["Yellow Split Peas"],
  PRODUCT_IMAGES["Wheat"],
  PRODUCT_IMAGES["Green Beans"],
  PRODUCT_IMAGES["Eggplant"],
  PRODUCT_IMAGES["Cabbage"]
];

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
