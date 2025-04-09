
import { Product } from '@/types';
import AuctionCard from './AuctionCard';

// Filter products to get only those with auctions
const getAuctionProducts = () => {
  // This would normally come from an API call
  // Using the selected products from the main product list that have auctions
  const MOCK_PRODUCTS: Product[] = [
    {
      id: "4",
      name: "Barley",
      description: "Healthy barley used in various Indian dishes and beverages.",
      price: 120.00,
      category: "Crops",
      image: "https://images.unsplash.com/photo-1631209121750-a9f656d34153?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
      farmerId: "farmer4",
      farmerName: "Golden Fields",
      organic: true,
      seasonal: false,
      stock: 120,
      unit: "kg",
      createdAt: "2023-04-11T09:30:00Z",
      auction: {
        id: "auction1",
        productId: "4",
        startPrice: 100.00,
        currentPrice: 115.00,
        startTime: "2023-04-11T10:00:00Z",
        endTime: "2025-06-08T10:00:00Z",
        bidCount: 5,
        highestBidderId: "user123"
      }
    },
    {
      id: "6",
      name: "Tur (Arhar)",
      description: "Nutritious tur, a key ingredient in many traditional dishes.",
      price: 300.00,
      category: "Crops",
      image: "https://images.unsplash.com/photo-1615485500806-831e0263385e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
      farmerId: "farmer6",
      farmerName: "Indian Legumes",
      organic: true,
      seasonal: false,
      stock: 90,
      unit: "kg",
      createdAt: "2023-04-06T14:20:00Z",
      auction: {
        id: "auction2",
        productId: "6",
        startPrice: 250.00,
        currentPrice: 290.00,
        startTime: "2023-04-06T15:00:00Z",
        endTime: "2025-05-16T12:00:00Z",
        bidCount: 7,
        highestBidderId: "user456"
      }
    },
    {
      id: "11",
      name: "Mustard",
      description: "High-quality mustard seeds for oil and cooking.",
      price: 180.00,
      category: "Crops",
      image: "https://images.unsplash.com/photo-1552323543-4a4de13483a9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
      farmerId: "farmer5",
      farmerName: "Pulse Farms",
      organic: false,
      seasonal: false,
      stock: 130,
      unit: "kg",
      createdAt: "2023-04-08T13:30:00Z",
      auction: {
        id: "auction3",
        productId: "11",
        startPrice: 160.00,
        currentPrice: 175.00,
        startTime: "2023-04-08T14:00:00Z",
        endTime: "2025-06-15T12:00:00Z",
        bidCount: 4,
        highestBidderId: "user789"
      }
    },
    {
      id: "33",
      name: "Mango",
      description: "Juicy, delicious mangoes, a staple in Indian summers.",
      price: 450.00,
      category: "Fruits",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
      farmerId: "farmer3",
      farmerName: "Farm Fresh",
      organic: true,
      seasonal: true,
      stock: 50,
      unit: "dozen",
      createdAt: "2023-03-29T08:00:00Z",
      auction: {
        id: "auction4",
        productId: "33",
        startPrice: 400.00,
        currentPrice: 430.00,
        startTime: "2023-03-29T10:00:00Z",
        endTime: "2025-06-20T12:00:00Z",
        bidCount: 6,
        highestBidderId: "user234"
      }
    }
  ];
  
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
