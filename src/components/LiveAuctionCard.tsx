import { useState, useEffect } from 'react';
import { Product, Auction } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Users,
  ArrowLeft,
  History,
  Info,
  Award,
  X,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface LiveAuctionCardProps {
  product: Product;
  auction: Auction;
  onBid: (amount: number) => void;
  onViewHistory: () => void;
  onClose: () => void;
}

const LiveAuctionCard = ({ product, auction, onBid, onViewHistory, onClose }: LiveAuctionCardProps) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(auction.currentPrice + 0.25);
  const [bidHistory, setBidHistory] = useState<{amount: number, time: string, user: string}[]>([]);
  const [isUserHighestBidder, setIsUserHighestBidder] = useState<boolean>(false);
  
  // Fallback image from Pexels if the product image fails to load
  const fallbackImage = 'https://images.pexels.com/photos/2286901/pexels-photo-2286901.jpeg';
  
  // Generate some mock bid history
  useEffect(() => {
    const mockBidHistory = [];
    let currentBid = auction.startPrice;
    const now = new Date();
    
    for (let i = 0; i < auction.bidCount; i++) {
      const bidIncrement = Math.random() * 0.5 + 0.1;
      currentBid += bidIncrement;
      const bidTime = new Date(now.getTime() - (auction.bidCount - i) * 3600000);
      
      mockBidHistory.push({
        amount: parseFloat(currentBid.toFixed(2)),
        time: bidTime.toISOString(),
        user: `user${Math.floor(Math.random() * 1000)}`
      });
    }
    
    setBidHistory(mockBidHistory);
    
    // Check if current user is highest bidder
    if (user && auction.highestBidderId === user.id) {
      setIsUserHighestBidder(true);
    }
  }, [auction, user]);
  
  // Calculate time remaining for auction
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(auction.endTime);
      const timeRemaining = end.getTime() - now.getTime();
      
      if (timeRemaining <= 0) {
        return "Auction ended";
      }
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return `${minutes}m ${seconds}s`;
      }
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [auction.endTime]);
  
  const handleBid = () => {
    if (bidAmount <= auction.currentPrice) {
      toast.error("Bid must be higher than the current price");
      return;
    }
    
    // Validation - only authenticated users can bid
    if (!user) {
      toast.error("Please sign in to place a bid", {
        description: "Creating an account only takes a moment",
        action: {
          label: "Sign In",
          onClick: () => console.log("Sign in clicked")
        }
      });
      return;
    }
    
    onBid(bidAmount);
    
    // In a real app, we would update the auction data from the API response
    // For now, we'll just simulate it
    setIsUserHighestBidder(true);
  };
  
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Product Image */}
      <div className="md:w-1/2 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = fallbackImage;
          }}
        />
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Auction Details */}
      <div className="md:w-1/2 p-6 flex flex-col h-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <Badge className="bg-farm-accent-orange">Live Auction</Badge>
          {product.organic && (
            <Badge variant="outline" className="bg-farm-green text-white">
              Organic
            </Badge>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mt-3">{product.name}</h2>
        <p className="text-muted-foreground">{product.farmerName}</p>
        
        <div className="my-4">
          <p className="text-sm line-clamp-3">{product.description}</p>
        </div>
        
        {/* Current Bid and Timer */}
        <div className="bg-muted p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Current Bid</p>
              <p className="font-bold text-2xl text-farm-accent-orange">
                {formatPrice(auction.currentPrice)}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  per {product.unit}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Time Left</p>
              <p className="font-medium flex items-center">
                <Clock className="mr-1 h-4 w-4 text-farm-accent-orange" />
                <span className="font-mono">{timeLeft}</span>
              </p>
            </div>
          </div>
          
          <div className="flex justify-between mt-3 text-sm">
            <span className="flex items-center">
              <Users className="mr-1 h-4 w-4" /> 
              {auction.bidCount} bids
            </span>
            <span>
              Quantity: {product.stock} {product.unit}
            </span>
          </div>
        </div>
        
        {/* Place Bid Section */}
        <div className="mb-4 p-4 border rounded-lg">
          <h3 className="font-medium mb-3">Place Your Bid</h3>
          <div className="flex mb-3">
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(parseFloat(e.target.value))}
              step={0.25}
              min={auction.currentPrice + 0.01}
              className="w-full rounded-r-none"
            />
            <Button 
              className="rounded-l-none bg-farm-accent-orange hover:bg-farm-accent-orange/90"
              onClick={handleBid}
            >
              Place Bid
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            <p className="flex items-center">
              <Info className="mr-1 h-3 w-3" />
              Suggested bid increment: $0.25
            </p>
            {isUserHighestBidder && (
              <p className="flex items-center text-green-600 mt-1">
                <Award className="mr-1 h-3 w-3" />
                You are currently the highest bidder!
              </p>
            )}
          </div>
        </div>
        
        {/* Recent Bid History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Recent Bids</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-farm-accent-orange hover:text-farm-accent-orange/80"
              onClick={onViewHistory}
            >
              <History className="mr-1 h-4 w-4" /> View All
            </Button>
          </div>
          
          <div className="space-y-2">
            {bidHistory.slice(-3).reverse().map((bid, index) => (
              <div key={index} className="flex justify-between items-center text-sm py-1 border-b last:border-0">
                <div className="flex items-center">
                  {bid.user === auction.highestBidderId ? (
                    <Award className="mr-2 h-4 w-4 text-farm-accent-orange" />
                  ) : (
                    <div className="w-4 h-4 mr-2"></div>
                  )}
                  <span>
                    {bid.user === user?.id ? "You" : bid.user}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="font-semibold">{formatPrice(bid.amount)}</span>
                  <span className="text-muted-foreground">{formatDate(bid.time)}</span>
                </div>
              </div>
            ))}
            
            {bidHistory.length === 0 && (
              <div className="text-center py-2 text-muted-foreground text-sm">
                No bids yet. Be the first!
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-auto pt-4 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClose}
            className="flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-farm-green text-farm-green hover:bg-farm-green/5"
            onClick={() => toast.info(`Auction details: ${product.name}`)}
          >
            View Product Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionCard;
