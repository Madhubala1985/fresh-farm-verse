
import { Product, Auction } from '@/types';
import { supabase } from '@/integrations/supabase/client';

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    // Use the 'crops' table since that's what exists in our schema
    const { data, error } = await supabase
      .from('crops')
      .select('*');

    if (error) throw error;
    
    // Map the crops data to our Product type
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
      image: item.image_url || '/placeholder.svg',
      farmerId: item.farmer_id,
      farmerName: "Farmer", // We don't have this field in the crops table
      organic: item.organic,
      seasonal: false, // We don't have this field in the crops table
      stock: item.quantity,
      unit: 'kg', // Default unit
      createdAt: item.created_at,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get products with auctions only - using mock data since we don't have auctions table
export async function getAuctionProducts(): Promise<Product[]> {
  try {
    // Since we don't have auctions table, return empty array
    // In a real app, we'd query a JOIN between crops and auctions
    return [];
  } catch (error) {
    console.error('Error fetching auction products:', error);
    return [];
  }
}

// Get products by farmer id
export async function getProductsByFarmer(farmerId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .eq('farmer_id', farmerId);

    if (error) throw error;
    
    // Map the crops data to our Product type
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
      image: item.image_url || '/placeholder.svg',
      farmerId: item.farmer_id,
      farmerName: "Farmer", // We don't have this field in the crops table
      organic: item.organic,
      seasonal: false, // We don't have this field in the crops table
      stock: item.quantity,
      unit: 'kg', // Default unit
      createdAt: item.created_at,
    }));
  } catch (error) {
    console.error('Error fetching farmer products:', error);
    return [];
  }
}

// Get product by id
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    // Map the crop data to our Product type
    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: data.price,
      category: data.category,
      image: data.image_url || '/placeholder.svg',
      farmerId: data.farmer_id,
      farmerName: "Farmer", // We don't have this field in the crops table
      organic: data.organic,
      seasonal: false, // We don't have this field in the crops table
      stock: data.quantity,
      unit: 'kg', // Default unit
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Create a new product
export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('crops')
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image_url: product.image,
        farmer_id: product.farmerId,
        organic: product.organic || false,
        quantity: product.stock,
        harvest_date: new Date().toISOString() // Required field in crops table
      })
      .select()
      .single();

    if (error) throw error;
    
    // Map the crop data to our Product type
    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: data.price,
      category: data.category,
      image: data.image_url || '/placeholder.svg',
      farmerId: data.farmer_id,
      farmerName: product.farmerName,
      organic: data.organic,
      seasonal: false,
      stock: data.quantity,
      unit: product.unit,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

// Create a new auction for a product - mock implementation
export async function createAuction(auction: {
  productId: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  reservePrice?: number;
}): Promise<Auction | null> {
  try {
    // Since we don't have an auctions table, return mock data
    console.log('Creating auction for product:', auction.productId);
    
    // In a real implementation, we would create an auction record in the database
    
    return {
      id: 'mock-auction-id',
      productId: auction.productId,
      startPrice: auction.startPrice,
      currentPrice: auction.startPrice,
      startTime: auction.startTime,
      endTime: auction.endTime,
      bidCount: 0,
    };
  } catch (error) {
    console.error('Error creating auction:', error);
    return null;
  }
}

// Place a bid on an auction - mock implementation
export async function placeBid(auctionId: string, bidderId: string, bidderName: string, amount: number): Promise<boolean> {
  try {
    // Since we don't have auctions and bids tables, log the bid details
    console.log('Placing bid:', { auctionId, bidderId, bidderName, amount });
    
    // In a real implementation, we would:
    // 1. Check if the auction is still active
    // 2. Check if the bid amount is higher than current price
    // 3. Create a bid record
    // 4. Update the auction with new current price and bidder
    
    return true; // Simulate successful bid
  } catch (error) {
    console.error('Error placing bid:', error);
    return false;
  }
}

// Helper function to map database product format to our app's Product type
function mapProductFromDb(item: any): Product {
  const product: Product = {
    id: item.id,
    name: item.name,
    description: item.description || '',
    price: item.price,
    category: item.category,
    image: item.image_url || '/placeholder.svg',
    farmerId: item.farmer_id,
    farmerName: "Farmer", // We don't have this field in the crops table
    organic: item.organic || false,
    seasonal: false, // We don't have this field in the crops table
    stock: item.quantity,
    unit: 'kg', // Default unit
    createdAt: item.created_at,
    rating: item.rating,
    numReviews: item.num_reviews
  };
  
  // For now, auctions are not supported in our DB schema
  return product;
}

// Helper function to create a bidding increment counter function in Supabase
export async function createBidCountFunction() {
  // This would be implemented in a real app but since we don't have auctions
  // table, this is a placeholder
  console.log('Creating bid count function would happen here');
}
