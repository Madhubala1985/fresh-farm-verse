
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
  // Mock products data with Indian context
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      description: 'Fresh, locally grown organic tomatoes from Maharashtra farms',
      price: 80,
      image: 'https://images.unsplash.com/photo-1592924357229-c5bacb6a0f70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Vegetables',
      farmerId: '1',
      farmerName: 'Green Valley Farm, Pune',
      organic: true,
      seasonal: true,
      stock: 50,
      unit: 'kg',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Fresh Alphonso Mangoes',
      description: 'Premium Alphonso mangoes from Ratnagiri, Maharashtra',
      price: 400,
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Fruits',
      farmerId: '2',
      farmerName: 'Ratnagiri Farms',
      organic: true,
      seasonal: true,
      stock: 30,
      unit: 'dozen',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Basmati Rice',
      description: 'Premium long-grain basmati rice from the foothills of the Himalayas',
      price: 120,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Grains',
      farmerId: '3',
      farmerName: 'Himalayan Harvest',
      organic: false,
      seasonal: false,
      stock: 100,
      unit: 'kg',
      createdAt: new Date().toISOString()
    },
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
