import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Truck } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistProvider';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Replace with your actual data fetching logic
        const mockProduct: Product = {
          id: productId || '1',
          name: "Heirloom Tomatoes",
          description: "Juicy, sun-ripened heirloom tomatoes bursting with flavor.",
          image: "https://images.unsplash.com/photo-1600247454695-4c4a895b8199?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRvbWF0b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          price: 4.99,
          category: "Vegetables",
          farmer: "Green Acres Farm",
          rating: 4.5,
          numReviews: 20,
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

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  const toggleWishlist = () => {
    if (product) {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
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
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-500 ${
                        i < Math.floor(product.rating) ? 'fas' : 'far'
                      } fa-star`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.numReviews} Reviews)
                </span>
              </div>

              <div className="mb-4">
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500">
                  In Stock: {product.countInStock}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
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
                        Math.min(product.countInStock || 10, quantity + 1)
                      )
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="bg-green-500 text-white rounded-full hover:bg-green-600"
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Wishlist Button */}
              <Button
                variant="outline"
                className="w-full rounded-full flex items-center justify-center gap-2"
                onClick={toggleWishlist}
              >
                {isWishlisted ? (
                  <>
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    Remove from Wishlist
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    Add to Wishlist
                  </>
                )}
              </Button>

              {/* Farmer Info and Shipping */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Farmer: {product.farmer}</h3>
                <p className="text-gray-600">
                  Sustainable farming practices ensure the highest quality produce.
                </p>
                <div className="mt-4 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">
                    Free shipping on orders over $50
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
