
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useComparison } from '@/context/ComparisonContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
                </div>
                
                <h2 className="font-bold text-lg mb-2 text-center">{product.name}</h2>
                <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                <Button 
                  onClick={() => addItem(product)}
                  className="w-full mb-6"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" /> Add to Cart
                </Button>
              </div>
            ))}
          </div>
          
          {/* Comparison Table */}
          <div className="border rounded-lg mt-8 overflow-hidden">
            <table className="w-full">
              <tbody>
                {comparisonCriteria.map((criterion) => (
                  <tr key={criterion.key.toString()} className="border-b last:border-0">
                    <td className="font-medium p-4 bg-muted/30">{criterion.label}</td>
                    {comparisonList.map((product) => {
                      const value = product[criterion.key];
                      const displayValue = criterion.formatter 
                        ? criterion.formatter(value as any)
                        : value;
                        
                      return (
                        <td key={product.id} className="p-4 text-center">
                          {displayValue?.toString() || "N/A"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
