import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { getProducts, getAuctionProducts, getProductsByFarmer } from '@/services/productService';
import { Loader2 } from 'lucide-react';

// Temporarily keep the mock data for fallback
export const MOCK_PRODUCTS: Product[] = [
  // Crops
  {
    id: "1",
    name: "Rice",
    description: "Premium quality rice grown in the fertile fields of India.",
    price: 100,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-10T12:00:00Z"
  },
  {
    id: "2",
    name: "Wheat",
    description: "Nutritious wheat cultivated in India's vast farmlands.",
    price: 300,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1530272552339-5de84dc5de91?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: false,
    stock: 200,
    unit: "kg",
    createdAt: "2023-04-08T10:00:00Z"
  },
  {
    id: "3",
    name: "Maize",
    description: "Golden maize known for its rich taste and high yield.",
    price: 220,
    category: "Crops",
    image: "https://loremflickr.com/500/500/maize",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 150,
    unit: "kg",
    createdAt: "2023-04-09T11:00:00Z"
  },
  {
    id: "4",
    name: "Barley",
    description: "Healthy barley used in various Indian dishes and beverages.",
    price: 180,
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
      startPrice: 150,
      currentPrice: 175,
      startTime: "2023-04-11T10:00:00Z",
      endTime: "2025-06-08T10:00:00Z",
      bidCount: 5,
      highestBidderId: "user123"
    }
  },
  {
    id: "5",
    name: "Gram",
    description: "High-protein gram, a staple pulse in Indian cuisine.",
    price: 350,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1648094728881-d945147aeeb0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: false,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-07T08:45:00Z"
  },
  {
    id: "6",
    name: "Tur (Arhar)",
    description: "Nutritious tur, a key ingredient in many traditional dishes.",
    price: 400,
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
      startPrice: 350,
      currentPrice: 415,
      startTime: "2023-04-06T15:00:00Z",
      endTime: "2025-05-16T12:00:00Z",
      bidCount: 7,
      highestBidderId: "user456"
    }
  },
  {
    id: "7",
    name: "Moong",
    description: "Split moong dal, perfect for healthy, light meals.",
    price: 320,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1648094728840-5003bcce6c64?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 110,
    unit: "kg",
    createdAt: "2023-04-05T12:00:00Z"
  },
  {
    id: "8",
    name: "Urad",
    description: "High-quality urad dal for a variety of culinary uses.",
    price: 380,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1644584202258-2eb6d71e6986?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: false,
    stock: 95,
    unit: "kg",
    createdAt: "2023-04-12T10:00:00Z"
  },
  {
    id: "9",
    name: "Masoor",
    description: "Red lentils known for their rich flavor and nutrition.",
    price: 399,
    category: "Pulses",
    image: "https://images.unsplash.com/photo-1648094728881-d945147aeeb0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 70,
    unit: "kg",
    createdAt: "2023-04-10T11:00:00Z"
  },
  {
    id: "10",
    name: "Groundnut",
    description: "Crunchy groundnuts, ideal for snacks and traditional recipes.",
    price: 550,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1590742412017-3e2a927126c8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: false,
    stock: 60,
    unit: "kg",
    createdAt: "2023-04-09T15:00:00Z"
  },
  {
    id: "11",
    name: "Mustard",
    description: "High-quality mustard seeds for oil and cooking.",
    price: 275,
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
      startPrice: 250,
      currentPrice: 285,
      startTime: "2023-04-08T14:00:00Z",
      endTime: "2025-06-15T12:00:00Z",
      bidCount: 4,
      highestBidderId: "user789"
    }
  },
  {
    id: "12",
    name: "Soybean",
    description: "Nutritious soybean, a key ingredient in many protein-rich dishes.",
    price: 425,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1652351522129-7b91f42ba67a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 140,
    unit: "kg",
    createdAt: "2023-04-11T16:00:00Z"
  },
  {
    id: "13",
    name: "Sunflower",
    description: "Sunflower seeds for oil extraction and healthy snacks.",
    price: 310,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: false,
    seasonal: false,
    stock: 160,
    unit: "kg",
    createdAt: "2023-04-10T09:00:00Z"
  },
  {
    id: "14",
    name: "Sugarcane",
    description: "Juicy sugarcane harvested fresh for making natural sugar and juices.",
    price: 120,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1584186215631-daf974872c41?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: true,
    stock: 200,
    unit: "bundle",
    createdAt: "2023-04-07T07:30:00Z"
  },
  {
    id: "15",
    name: "Cotton",
    description: "High-quality cotton suitable for textiles and clothing manufacturing.",
    price: 280,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1575308345464-5f2a7519b7b2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 180,
    unit: "kg",
    createdAt: "2023-04-06T10:00:00Z"
  },
  {
    id: "16",
    name: "Jute",
    description: "Eco-friendly jute fibers used in packaging and handicrafts.",
    price: 190,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1602073788270-7a4c106bdf89?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: false,
    stock: 150,
    unit: "kg",
    createdAt: "2023-04-05T11:00:00Z"
  },
  {
    id: "17",
    name: "Tea",
    description: "High-quality tea leaves from the renowned gardens of India.",
    price: 650,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-04T14:00:00Z"
  },
  {
    id: "18",
    name: "Coffee",
    description: "Fresh coffee beans cultivated in the plantations of South India.",
    price: 725,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-03T16:00:00Z"
  },
  {
    id: "19",
    name: "Tobacco",
    description: "Premium tobacco grown with traditional methods.",
    price: 475,
    category: "Crops",
    image: "https://images.unsplash.com/photo-1574551912958-5724ce127549?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: false,
    seasonal: false,
    stock: 70,
    unit: "kg",
    createdAt: "2023-04-02T13:00:00Z"
  },

  // Vegetables
  {
    id: "20",
    name: "Potato",
    description: "Fresh, high-quality potatoes from local farms.",
    price: 125,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: false,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-11T10:00:00Z"
  },
  {
    id: "21",
    name: "Onion",
    description: "Red and white onions, perfect for everyday cooking.",
    price: 75,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: false,
    seasonal: false,
    stock: 120,
    unit: "kg",
    createdAt: "2023-04-10T09:30:00Z"
  },
  {
    id: "22",
    name: "Tomato",
    description: "Juicy tomatoes with a rich flavor, ideal for salads and sauces.",
    price: 150,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1592924357229-940a66f3e523?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: true,
    seasonal: true,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-09T11:45:00Z"
  },
  {
    id: "23",
    name: "Brinjal",
    description: "Fresh brinjal (eggplant) perfect for curries and stir-fries.",
    price: 175,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1605196560547-1f28226c992f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: false,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-08T12:00:00Z"
  },
  {
    id: "24",
    name: "Cabbage",
    description: "Crunchy cabbage ideal for salads and stir-fried dishes.",
    price: 120,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1551904138-6d2t359ca3be?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: false,
    seasonal: false,
    stock: 70,
    unit: "kg",
    createdAt: "2023-04-07T10:30:00Z"
  },
  {
    id: "25",
    name: "Cauliflower",
    description: "Fresh cauliflower, perfect for healthy meals and curries.",
    price: 150,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: false,
    stock: 60,
    unit: "kg",
    createdAt: "2023-04-06T14:30:00Z"
  },
  {
    id: "26",
    name: "Lady Finger (Okra)",
    description: "Tender okra for making delicious bhindi dishes.",
    price: 200,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1661435597321-80c2a7b1f231?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: true,
    seasonal: true,
    stock: 50,
    unit: "kg",
    createdAt: "2023-04-05T11:00:00Z"
  },
  {
    id: "27",
    name: "Carrot",
    description: "Crunchy, sweet carrots sourced from local farms.",
    price: 100,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer3",
    farmerName: "Farm Fresh",
    organic: true,
    seasonal: false,
    stock: 80,
    unit: "kg",
    createdAt: "2023-04-04T09:00:00Z"
  },
  {
    id: "28",
    name: "Beans",
    description: "Fresh green beans, ideal for stir-frying and salads.",
    price: 175,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1567374783966-aa2ef74db0e4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: false,
    seasonal: false,
    stock: 90,
    unit: "kg",
    createdAt: "2023-04-03T10:00:00Z"
  },
  {
    id: "29",
    name: "Spinach",
    description: "Nutrient-rich spinach for healthy meals.",
    price: 150,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 100,
    unit: "kg",
    createdAt: "2023-04-02T11:30:00Z"
  },
  {
    id: "30",
    name: "Bottle Gourd",
    description: "Fresh bottle gourd, perfect for curries and stir-fries.",
    price: 180,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1636378203904-1cf669d925f5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 75,
    unit: "kg",
    createdAt: "2023-04-01T12:00:00Z"
  },
  {
    id: "31",
    name: "Pumpkin",
    description: "Fresh pumpkin, ideal for soups and festive recipes.",
    price: 250,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: true,
    stock: 40,
    unit: "kg",
    createdAt: "2023-03-31T09:00:00Z"
  },
  {
    id: "32",
    name: "Chillies",
    description: "Spicy chillies for a burst of flavor in every dish.",
    price: 1.25,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1547745726-9e5256830de3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: false,
    seasonal: true,
    stock: 60,
    unit: "kg",
    createdAt: "2023-03-30T10:00:00Z"
  },

  // Fruits
  {
    id: "33",
    name: "Mango",
    description: "Juicy, delicious mangoes, a staple in Indian summers.",
    price: 550,
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
      startPrice: 500,
      currentPrice: 580,
      startTime: "2023-03-29T10:00:00Z",
      endTime: "2025-06-20T12:00:00Z",
      bidCount: 6,
      highestBidderId: "user234"
    }
  },
  {
    id: "34",
    name: "Banana",
    description: "Sweet bananas, rich in potassium and a daily essential.",
    price: 200,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer4",
    farmerName: "Golden Fields",
    organic: false,
    seasonal: false,
    stock: 100,
    unit: "dozen",
    createdAt: "2023-03-28T07:30:00Z"
  },
  {
    id: "35",
    name: "Papaya",
    description: "Fresh papaya, loaded with vitamins and perfect for a healthy diet.",
    price: 375,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer5",
    farmerName: "Pulse Farms",
    organic: true,
    seasonal: true,
    stock: 40,
    unit: "kg",
    createdAt: "2023-03-27T09:15:00Z"
  },
  {
    id: "36",
    name: "Pineapple",
    description: "Tropical pineapple with a perfect balance of sweetness and acidity.",
    price: 425,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer6",
    farmerName: "Indian Legumes",
    organic: true,
    seasonal: false,
    stock: 30,
    unit: "each",
    createdAt: "2023-03-26T10:00:00Z"
  },
  {
    id: "37",
    name: "Guava",
    description: "Fresh guava, rich in vitamin C and perfect for a healthy snack.",
    price: 275,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer1",
    farmerName: "Indian Farms",
    organic: true,
    seasonal: true,
    stock: 45,
    unit: "kg",
    createdAt: "2023-03-25T11:00:00Z"
  },
  {
    id: "38",
    name: "Pomegranate",
    description: "Juicy pomegranate, loaded with antioxidants and a symbol of prosperity.",
    price: 600,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1601275222517-a8132e1f6f65?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&h=500&w=500",
    farmerId: "farmer2",
    farmerName: "Green Harvest",
    organic: true,
    seasonal: false,
    stock: 65,
    unit: "kg",
    createdAt: "2023-03-24T13:00:00Z"
  }
];

interface ProductGridProps {
  title?: string;
  auctionsOnly?: boolean;
  farmerId?: string;
  showFilters?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title = "All Products",
  auctionsOnly = false,
  farmerId,
  showFilters = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let fetchedProducts: Product[];
        
        if (auctionsOnly) {
          fetchedProducts = await getAuctionProducts();
        } else if (farmerId) {
          fetchedProducts = await getProductsByFarmer(farmerId);
        } else {
          fetchedProducts = await getProducts();
        }
        
        // If no products from API or error, use mock data
        if (!fetchedProducts || fetchedProducts.length === 0) {
          // Filter mock data based on props
          if (auctionsOnly) {
            setProducts(MOCK_PRODUCTS.filter(product => product.auction));
          } else if (farmerId) {
            setProducts(MOCK_PRODUCTS.filter(product => product.farmerId === farmerId));
          } else {
            setProducts(MOCK_PRODUCTS);
          }
        } else {
          setProducts(fetchedProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        
        // Use mock data as fallback
        if (auctionsOnly) {
          setProducts(MOCK_PRODUCTS.filter(product => product.auction));
        } else if (farmerId) {
          setProducts(MOCK_PRODUCTS.filter(product => product.farmerId === farmerId));
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [auctionsOnly, farmerId]);
  
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-farm-green" />
        <span className="ml-2 text-lg">Loading products...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-red-500">{error}</p>
        <p>Showing fallback data instead</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
