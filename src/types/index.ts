
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'farmer' | 'consumer' | 'admin';
  profileImage?: string;
  name?: string;
  bio?: string;
  location?: string;
  uid?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  farmerId: string;
  farmerName: string;
  organic: boolean;
  seasonal: boolean;
  stock: number;
  unit: string;
  createdAt: string;
  auction?: Auction;
  rating?: number;
  numReviews?: number;
  countInStock?: number;
}

export interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  bidCount: number;
  highestBidderId?: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  updateUserProfile?: (userData: Partial<User>) => Promise<void>;
}
