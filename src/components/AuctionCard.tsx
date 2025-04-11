
import { useState, useEffect } from 'react';
import { Auction, Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { placeBid } from '@/services/productService';
import { supabase } from '@/integrations/supabase/client';

interface AuctionCardProps {
  auction: Auction;
  product: Product;
  onViewHistory?: () => void;
}

const AuctionCard = ({ auction, product, onViewHistory }: AuctionCardProps) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(auction.currentPrice + 0.25);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentAuction, setCurrentAuction] = useState<Auction>(auction);
  
  // Subscribe to real-time updates for this auction
  useEffect(() => {
    const channel = supabase
      .channel('auction-updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'auctions',
        filter: `id=eq.${auction.id}`
      }, (payload) => {
        // Update auction data when it changes
        setCurrentAuction({
          ...currentAuction,
          currentPrice: payload.new.current_price,
          bidCount: payload.new.bid_count,
          highestBidderId: payload.new.highest_bidder_id
        });
        
        // Update bid amount if needed
        setBidAmount(Math.max(bidAmount, payload.new.current_price + 0.25));
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [auction.id]);

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
      
      if (days > 0) {
        return `${days}d ${hours}h remaining`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
      } else {
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        return `${minutes}m ${seconds}s remaining`;
      }
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [auction.endTime]);
  
  const handleBid = async () => {
    if (!user) {
      toast.error("Please log in to place a bid");
      return;
    }
    
    if (bidAmount <= currentAuction.currentPrice) {
      toast.error("Bid must be higher than the current price");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await placeBid(
        auction.id,
        user.id,
        user.username,
        bidAmount
      );
      
      if (success) {
        toast.success(`Bid of $${bidAmount.toFixed(2)} placed for ${product.name}`);
      } else {
        toast.error("Failed to place bid. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to place bid");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const isUserHighestBidder = user && currentAuction.highestBidderId === user.id;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <Badge className="bg-farm-accent-orange text-white">
            Auction
          </Badge>
        </div>
        {isUserHighestBidder && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-500 text-white">
              Your bid leads!
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.farmerName}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current bid:</p>
            <p className="font-bold text-xl text-farm-accent-orange">
              {formatPrice(currentAuction.currentPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Bids:</p>
            <p className="font-medium">{currentAuction.bidCount}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{timeLeft}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm line-clamp-2 text-muted-foreground">{product.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-2">
        {timeLeft !== "Auction ended" ? (
          <div className="flex w-full">
            <input 
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(parseFloat(e.target.value))}
              step={0.25}
              min={currentAuction.currentPrice + 0.01}
              className="w-2/3 border rounded-l px-3 py-2 text-sm"
            />
            <Button 
              className="w-1/3 rounded-l-none bg-farm-accent-orange hover:bg-farm-accent-orange/80 text-white"
              onClick={handleBid}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Bidding..." : "Bid"}
            </Button>
          </div>
        ) : (
          <div className="w-full p-2 text-center bg-muted rounded-md">
            <p className="text-sm font-medium">This auction has ended</p>
          </div>
        )}
        
        <div className="flex w-full gap-2">
          {onViewHistory && (
            <Button
              variant="outline"
              className="flex-1 border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
              onClick={onViewHistory}
            >
              Bid History
            </Button>
          )}
          
          <Link to={`/product/${product.id}`} className={onViewHistory ? "flex-1" : "w-full"}>
            <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green/5">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuctionCard;
