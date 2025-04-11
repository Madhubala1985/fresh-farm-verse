
import { Product, Auction } from '@/types';
import { supabase } from '@/integrations/supabase/client';

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        auctions (*)
      `);

    if (error) throw error;
    
    return data.map((item: any) => mapProductFromDb(item));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get products with auctions only
export async function getAuctionProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        auctions!inner (*)
      `);

    if (error) throw error;
    
    return data.map((item: any) => mapProductFromDb(item));
  } catch (error) {
    console.error('Error fetching auction products:', error);
    return [];
  }
}

// Get products by farmer id
export async function getProductsByFarmer(farmerId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        auctions (*)
      `)
      .eq('farmer_id', farmerId);

    if (error) throw error;
    
    return data.map((item: any) => mapProductFromDb(item));
  } catch (error) {
    console.error('Error fetching farmer products:', error);
    return [];
  }
}

// Get product by id
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        auctions (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    return mapProductFromDb(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Create a new product
export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        farmer_id: product.farmerId,
        farmer_name: product.farmerName,
        organic: product.organic || false,
        seasonal: product.seasonal || false,
        stock: product.stock,
        unit: product.unit
      })
      .select()
      .single();

    if (error) throw error;
    
    return mapProductFromDb(data);
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

// Create a new auction for a product
export async function createAuction(auction: {
  productId: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  reservePrice?: number;
}): Promise<Auction | null> {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .insert({
        product_id: auction.productId,
        start_price: auction.startPrice,
        current_price: auction.startPrice,
        start_time: auction.startTime,
        end_time: auction.endTime,
        bid_count: 0
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      productId: data.product_id,
      startPrice: data.start_price,
      currentPrice: data.current_price,
      startTime: data.start_time,
      endTime: data.end_time,
      bidCount: data.bid_count,
      highestBidderId: data.highest_bidder_id || undefined
    };
  } catch (error) {
    console.error('Error creating auction:', error);
    return null;
  }
}

// Place a bid on an auction
export async function placeBid(auctionId: string, bidderId: string, bidderName: string, amount: number): Promise<boolean> {
  try {
    // First, check if the bid is higher than current price
    const { data: auctionData, error: auctionError } = await supabase
      .from('auctions')
      .select('current_price, end_time')
      .eq('id', auctionId)
      .single();
      
    if (auctionError) throw auctionError;
    
    // Check if auction is still active
    const now = new Date();
    const endTime = new Date(auctionData.end_time);
    if (endTime < now) {
      throw new Error('This auction has already ended');
    }
    
    // Check if bid is higher than current price
    if (amount <= auctionData.current_price) {
      throw new Error('Bid amount must be higher than the current price');
    }
    
    // Create the bid
    const { error: bidError } = await supabase
      .from('bids')
      .insert({
        auction_id: auctionId,
        bidder_id: bidderId,
        bidder_name: bidderName,
        amount: amount
      });
      
    if (bidError) throw bidError;
    
    // Update the auction with new current price and bidder
    const { error: updateError } = await supabase
      .from('auctions')
      .update({
        current_price: amount,
        highest_bidder_id: bidderId,
        bid_count: supabase.rpc('increment_bid_count', { auction_id: auctionId })
      })
      .eq('id', auctionId);
      
    if (updateError) throw updateError;
    
    return true;
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
    description: item.description,
    price: item.price,
    category: item.category,
    image: item.image,
    farmerId: item.farmer_id,
    farmerName: item.farmer_name,
    organic: item.organic,
    seasonal: item.seasonal,
    stock: item.stock,
    unit: item.unit,
    createdAt: item.created_at,
    rating: item.rating,
    numReviews: item.num_reviews
  };
  
  // Add auction data if available
  if (item.auctions && item.auctions.length > 0) {
    const auctionData = item.auctions[0];
    product.auction = {
      id: auctionData.id,
      productId: auctionData.product_id,
      startPrice: auctionData.start_price,
      currentPrice: auctionData.current_price,
      startTime: auctionData.start_time,
      endTime: auctionData.end_time,
      bidCount: auctionData.bid_count,
      highestBidderId: auctionData.highest_bidder_id
    };
  }
  
  return product;
}

// Helper function to create a bidding increment counter function in Supabase
export async function createBidCountFunction() {
  const { error } = await supabase.rpc('create_increment_function', {});
  if (error) console.error('Error creating bid count function:', error);
}
