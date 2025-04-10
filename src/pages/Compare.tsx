
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useComparison } from '@/context/ComparisonContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

// Define typed comparison criteria
type ComparisonCriterion<T extends keyof Product> = {
  label: string;
  key: T;
  formatter?: (val: Product[T]) => string;
};

const Compare: React.FC = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const { addItem } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  if (comparisonList.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow container mx-auto py-8 px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link to="/marketplace"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Marketplace</Link>
            </Button>
          </div>
          
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>
            <p className="text-muted-foreground mb-6">You don't have any products to compare yet.</p>
            <Button asChild>
              <Link to="/marketplace">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Feature comparison criteria with proper typing
  const comparisonCriteria: ComparisonCriterion<keyof Product>[] = [
    { label: "Price", key: "price", formatter: (val: number) => formatPrice(val) },
    { label: "Unit", key: "unit" },
    { label: "Organic", key: "organic", formatter: (val: boolean) => val ? "Yes" : "No" },
    { label: "Seasonal", key: "seasonal", formatter: (val: boolean) => val ? "Yes" : "No" },
    { label: "Farmer", key: "farmerName" },
    { label: "Category", key: "category" },
  ];

  // Highlight the best price
  const findBestPrice = () => {
    if (comparisonList.length <= 1) return null;
    
    const lowestPriceId = comparisonList.reduce((lowest, current) => {
      return current.price < lowest.price ? current : lowest;
    }, comparisonList[0]).id;
    
    return lowestPriceId;
  };
  
  const bestPriceProductId = findBestPrice();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link to="/marketplace"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Marketplace</Link>
            </Button>
            <h1 className="text-2xl font-bold">Product Comparison</h1>
          </div>
          
          <Button variant="outline" size="sm" onClick={clearComparison}>
            <Trash2 className="h-4 w-4 mr-1" /> Clear All
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Comparing {comparisonList.length} {comparisonList.length === 1 ? 'product' : 'products'}. You can compare up to 4 products at a time.
        </p>
        
        <div className="overflow-x-auto">
          <div className={cn(
            "grid gap-4",
            comparisonList.length === 2 ? "grid-cols-2" : "",
            comparisonList.length === 3 ? "grid-cols-3" : "",
            comparisonList.length === 4 ? "grid-cols-4" : "",
          )}>
            {/* Product Images and Names */}
            {comparisonList.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="relative mb-4 w-full aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 rounded-full"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                    {product.organic && (
                      <Badge className="bg-farm-green text-white">Organic</Badge>
                    )}
                    {product.seasonal && (
                      <Badge className="bg-farm-accent-yellow text-black">Seasonal</Badge>
                    )}
                  </div>
                  
                  {/* Best price badge */}
                  {bestPriceProductId === product.id && comparisonList.length > 1 && (
                    <Badge className="absolute bottom-2 right-2 bg-green-500 text-white">Best Price</Badge>
                  )}
                </div>
                
                <h2 className="font-bold text-lg mb-2 text-center">{product.name}</h2>
                <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex space-x-2 mb-6 w-full">
                  <Button 
                    onClick={() => addItem(product)}
                    className="flex-1"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" /> Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline"
                    asChild
                    className="flex-shrink-0"
                  >
                    <Link to={`/product/${product.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comparison Table */}
          <div className="border rounded-lg mt-8 overflow-hidden">
            <Table>
              <TableBody>
                {comparisonCriteria.map((criterion) => (
                  <TableRow key={criterion.key.toString()}>
                    <TableCell className="font-medium bg-muted/30 w-32">{criterion.label}</TableCell>
                    {comparisonList.map((product) => {
                      const value = product[criterion.key];
                      const displayValue = criterion.formatter 
                        ? criterion.formatter(value as any)
                        : value;
                        
                      // Highlight best price cell
                      const isBestPrice = criterion.key === 'price' && bestPriceProductId === product.id && comparisonList.length > 1;
                        
                      return (
                        <TableCell 
                          key={product.id} 
                          className={cn(
                            "text-center",
                            isBestPrice && "bg-green-50 font-bold text-green-700"
                          )}
                        >
                          {displayValue?.toString() || "N/A"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
