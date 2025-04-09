
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export interface ProductGridProps {
  products?: Product[];
  loading?: boolean;
  error?: string | null;
  farmerId?: string;
  title?: string;
  showFilters?: boolean;
  auctionsOnly?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, error, farmerId, title, showFilters, auctionsOnly }) => {
  // Mock products data - in a real app, this would come from props or an API call
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Organic Basmati Rice',
      description: 'Premium quality organic basmati rice from North India',
      price: 150,
      image: 'https://images.unsplash.com/photo-1550367083-9fa5411cb8a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Grains',
      farmerId: '1',
      farmerName: 'Green Harvest Farms',
      organic: true,
      seasonal: true,
      stock: 50,
      unit: 'kg',
      createdAt: new Date().toISOString()
    },
    // ... more products
  ];

  const displayProducts = products || mockProducts;
  
  // If farmerId is provided, filter products by farmer
  const filteredProducts = farmerId 
    ? displayProducts.filter(p => p.farmerId === farmerId) 
    : displayProducts;

  // If auctionsOnly is provided, filter products with auctions
  const finalProducts = auctionsOnly
    ? filteredProducts.filter(p => p.auction)
    : filteredProducts;

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (finalProducts.length === 0) {
    return <div className="text-center py-8">No products found.</div>;
  }

  return (
    <div>
      {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}
      {showFilters && (
        <div className="mb-6">
          {/* Filters UI would go here */}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
