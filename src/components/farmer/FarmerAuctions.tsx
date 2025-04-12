import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  DollarSign, 
  HandCoins, 
  Users, 
  ChevronDown, 
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Eye,
  Ban 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock auction data with reliable Pexels image URLs
const mockAuctions = [
  {
    id: "a1",
    productId: "p1",
    productName: "Premium Organic Rice",
    productImage: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    startPrice: 2.00,
    currentPrice: 3.75,
    reservePrice: 3.00,
    bidCount: 8,
    startTime: "2025-03-01T10:00:00Z",
    endTime: "2025-05-15T10:00:00Z",
    status: "active",
    highestBidder: "user123",
    category: "Crops",
    unit: "kg",
    quantity: 200,
    views: 156
  },
  {
    id: "a2",
    productId: "p2",
    productName: "Premium Alphonso Mangoes",
    productImage: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg",
    startPrice: 5.00,
    currentPrice: 7.50,
    reservePrice: 6.00,
    bidCount: 12,
    startTime: "2025-03-05T09:00:00Z",
    endTime: "2025-04-20T09:00:00Z",
    status: "active",
    highestBidder: "user456",
    category: "Fruits",
    unit: "dozen",
    quantity: 10,
    views: 203
  },
  {
    id: "a3",
    productId: "p3",
    productName: "First Harvest Tea Leaves",
    productImage: "https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg",
    startPrice: 8.00,
    currentPrice: 12.25,
    reservePrice: 10.00,
    bidCount: 15,
    startTime: "2025-02-15T08:00:00Z",
    endTime: "2025-02-25T08:00:00Z",
    status: "completed",
    highestBidder: "user789",
    category: "Crops",
    unit: "kg",
    quantity: 50,
    views: 178
  },
  {
    id: "a4",
    productId: "p4",
    productName: "Organic Turmeric",
    productImage: "https://images.pexels.com/photos/4198035/pexels-photo-4198035.jpeg",
    startPrice: 3.50,
    currentPrice: 3.50,
    reservePrice: 4.00,
    bidCount: 0,
    startTime: "2025-04-10T10:00:00Z",
    endTime: "2025-06-10T10:00:00Z",
    status: "scheduled",
    highestBidder: null,
    category: "Spices",
    unit: "kg",
    quantity: 30,
    views: 45
  },
  {
    id: "a5",
    productId: "p5",
    productName: "Heritage Basmati Rice",
    productImage: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    startPrice: 4.00,
    currentPrice: 4.75,
    reservePrice: 5.50,
    bidCount: 3,
    startTime: "2025-03-20T11:00:00Z",
    endTime: "2025-03-20T10:00:00Z",
    status: "reserve_not_met",
    highestBidder: "user012",
    category: "Crops",
    unit: "kg",
    quantity: 100,
    views: 87
  }
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to calculate time remaining
const getTimeRemaining = (endTime: string) => {
  const endDate = new Date(endTime);
  const now = new Date();
  
  if (now > endDate) return "Ended";
  
  const diff = endDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${minutes}m ${seconds}s remaining`;
};

// Status badge styles and labels
const statusStyles = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
  reserve_not_met: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels = {
  active: "Active",
  completed: "Completed",
  scheduled: "Scheduled",
  reserve_not_met: "Reserve Not Met",
  cancelled: "Cancelled"
};

const statusIcons = {
  active: HandCoins,
  completed: CheckCircle2,
  scheduled: Clock,
  reserve_not_met: AlertCircle,
  cancelled: Ban
};

const FarmerAuctions = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter auctions based on status
  const filteredAuctions = statusFilter 
    ? mockAuctions.filter(auction => auction.status === statusFilter) 
    : mockAuctions;

  const handleCancelAuction = (id: string) => {
    toast.success(`Auction ${id} has been cancelled`);
    // In a real app, we would make an API call to cancel the auction
  };
  
  const handleEditAuction = (id: string) => {
    toast.info(`Editing auction ${id}`);
    // In a real app, we would navigate to an edit form or open a modal
  };
  
  const handleViewDetails = (id: string) => {
    toast.info(`Viewing details for auction ${id}`);
    // In a real app, we would navigate to a detailed view of the auction
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>My Auctions</CardTitle>
            <CardDescription>Manage your crop auctions</CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
            >
              Create Auction
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  {statusFilter ? statusLabels[statusFilter as keyof typeof statusLabels] : "All Statuses"} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                {Object.keys(statusLabels).map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {statusLabels[status as keyof typeof statusLabels]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredAuctions.length === 0 ? (
              <div className="text-center py-10">
                <HandCoins className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No auctions found matching your filters.</p>
              </div>
            ) : (
              filteredAuctions.map((auction) => {
                const StatusIcon = statusIcons[auction.status as keyof typeof statusIcons];
                return (
                  <div key={auction.id} className="border rounded-lg overflow-hidden bg-white">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/5">
                        <img
                          src={auction.productImage}
                          alt={auction.productName}
                          className="w-full h-full object-cover aspect-square md:aspect-auto"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://images.pexels.com/photos/2286901/pexels-photo-2286901.jpeg';
                          }}
                        />
                      </div>
                      
                      {/* Auction Details */}
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{auction.productName}</h3>
                              <Badge className={statusStyles[auction.status as keyof typeof statusStyles]}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusLabels[auction.status as keyof typeof statusLabels]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {auction.category} | {auction.quantity} {auction.unit}
                            </p>
                          </div>
                          
                          <div className="mt-2 md:mt-0 flex items-center gap-3 text-sm">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1 text-muted-foreground" /> {auction.views}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" /> {auction.bidCount} bids
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Current Bid</p>
                            <div className="font-semibold text-lg flex items-center">
                              <DollarSign className="h-4 w-4 text-farm-accent-orange" />
                              {auction.currentPrice.toFixed(2)}
                              <span className="text-xs font-normal text-muted-foreground ml-1">
                                / {auction.unit}
                              </span>
                            </div>
                            {auction.status === 'active' && auction.bidCount > 0 && (
                              <p className="text-xs text-green-600">
                                {auction.currentPrice > auction.reservePrice ? "Above reserve" : "Below reserve"}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-medium">
                              {formatDate(auction.startTime)} - {formatDate(auction.endTime)}
                            </p>
                            {auction.status === 'active' && (
                              <p className="text-xs font-medium text-farm-accent-orange">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {getTimeRemaining(auction.endTime)}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Highest Bidder</p>
                            <p className="font-medium">
                              {auction.highestBidder ? `User ${auction.highestBidder}` : "No bids yet"}
                            </p>
                            {auction.status === 'completed' && (
                              <p className="text-xs text-green-600 flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Sale confirmed
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 gap-2">
                          {auction.status === 'active' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleCancelAuction(auction.id)}
                            >
                              Cancel
                            </Button>
                          )}
                          {(auction.status === 'scheduled' || auction.status === 'active') && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditAuction(auction.id)}
                            >
                              Edit
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
                            onClick={() => handleViewDetails(auction.id)}
                          >
                            <BarChart3 className="h-4 w-4 mr-2" /> Auction Stats
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleViewDetails(auction.id)}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerAuctions;
