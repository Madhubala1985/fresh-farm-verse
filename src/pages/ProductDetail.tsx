
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Truck } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WishlistButton from '@/components/WishlistButton';
import CompareButton from '@/components/CompareButton';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Replace with your actual data fetching logic
        const mockProduct: Product = {
          id: productId || '1',
          name: "Organic Tomatoes",
          description: "Fresh, locally grown organic tomatoes from Maharashtra farms. Perfect for salads and cooking.",
          image: "https://images.unsplash.com/photo-1600247454695-4c4a895b8199?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRvbWF0b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 80,
          category: "Vegetables",
          farmerId: "1",
          farmerName: "Green Acres Farm, Nashik",
          organic: true,
          seasonal: true,
          stock: 10,
          unit: "kg",
          createdAt: new Date().toISOString(),
          rating: 4.5,
          numReviews: 28,
          countInStock: 10,
        };
        setProduct(mockProduct);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="absolute top-4 right-4">
                <WishlistButton product={product} variant="icon" className="!relative !top-0 !right-0" />
              </div>
              <div className="absolute top-4 left-4">
                <CompareButton product={product} variant="icon" className="bg-white/70 backdrop-blur-sm shadow-sm !relative !top-0 !left-0" />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-semibold mb-2">{product?.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-500 ${
                        i < Math.floor(product?.rating || 0) ? 'fas' : 'far'
                      } fa-star`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product?.numReviews} Reviews)
                </span>
              </div>

              <div className="mb-4">
                <Badge variant="secondary">{product?.category}</Badge>
                {product.organic && <Badge variant="outline" className="ml-2 bg-farm-green text-white">Organic</Badge>}
              </div>

              <p className="text-gray-700 mb-6">{product?.description}</p>

              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(product?.price)}
                  <span className="text-sm font-normal ml-1">per {product?.unit}</span>
                </span>
                <span className="text-gray-500">
                  In Stock: {product?.countInStock}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value, 10))
                    }
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() =>
                      setQuantity(
                        Math.min(product?.countInStock || 10, quantity + 1)
                      )
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="bg-green-500 text-white rounded-full hover:bg-green-600 flex-1"
                  onClick={handleAddToCart}
                  disabled={product?.countInStock === 0}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                <WishlistButton product={product} variant="outline" className="flex-1" />
                <CompareButton product={product} variant="outline" className="flex-1" />
              </div>

              {/* Farmer Info and Shipping */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Farmer: {product?.farmerName}</h3>
                <p className="text-gray-600">
                  Sustainable farming practices ensure the highest quality produce.
                </p>
                <div className="mt-4 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">
                    Free shipping on orders over ₹1000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
