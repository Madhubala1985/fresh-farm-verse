
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import WishlistButton from './WishlistButton';
import CompareButton from './CompareButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <WishlistButton product={product} variant="icon" />
        
        {/* Compare Button */}
        <div className="absolute top-2 left-2">
          <CompareButton product={product} variant="icon" className="bg-white/70 backdrop-blur-sm shadow-sm" />
        </div>
        
        {/* Badges */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {product.organic && (
            <Badge className="bg-farm-green text-white font-medium flex items-center gap-1">
              <Leaf className="h-3 w-3" /> Organic
            </Badge>
          )}
          
          {product.seasonal && (
            <Badge className="bg-farm-accent-yellow text-black font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" /> Seasonal
            </Badge>
          )}
        </div>
        
        {/* Auction badge if applicable */}
        {product.auction && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-farm-accent-orange text-white font-medium">
              Auction
            </Badge>
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`} className="hover:underline">
            <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
          
          <div className="text-sm mb-1">
            <span className="text-farm-brown">Farmer: </span>
            <Link to={`/farmer/${product.farmerId}`} className="hover:underline text-farm-green">
              {product.farmerName}
            </Link>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="mt-4 flex items-center justify-between">
          {product.auction ? (
            <div>
              <p className="text-xs mb-0.5">Current bid:</p>
              <p className="font-bold text-lg text-farm-accent-orange">
                {formatPrice(product.auction.currentPrice)}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-lg">
                {formatPrice(product.price)}
                <span className="text-xs font-normal ml-1">/ {product.unit}</span>
              </p>
            </div>
          )}
          
          {product.auction ? (
            <Button 
              variant="outline" 
              className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
              onClick={() => {}}
            >
              Place Bid
            </Button>
          ) : (
            <Button 
              variant="outline"
              className="border-farm-green text-farm-green hover:bg-farm-green/5"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
