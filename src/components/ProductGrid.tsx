import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export interface ProductGridProps {
  products?: Product[];
  loading?: boolean;
  error?: string | null;
  farmerId?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, error, farmerId }) => {
  // Mock products data - in a real app, this would come from props or an API call
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      description: 'Fresh, locally grown organic tomatoes',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1592924357229-c5bacb6a0f70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Vegetables',
      farmerId: '1',
      farmerName: 'Green Valley Farm',
      organic: true,
      seasonal: true,
      stock: 50,
      unit: 'lb',
      createdAt: new Date().toISOString()
    },
    // ... more products
  ];

  const displayProducts = products || mockProducts;
  
  // If farmerId is provided, filter products by farmer
  const filteredProducts = farmerId 
    ? displayProducts.filter(p => p.farmerId === farmerId) 
    : displayProducts;

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center py-8">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
