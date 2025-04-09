
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Marketplace from "./pages/Marketplace";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerProfile from "./pages/FarmerProfile";
import Auctions from "./pages/Auctions";
import Farmers from "./pages/Farmers";
import FarmerPublicProfile from "./pages/FarmerPublicProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/farmer" element={<FarmerDashboard />} />
                <Route path="/farmer/profile" element={<FarmerProfile />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/farmer/:farmerId" element={<FarmerPublicProfile />} />
                <Route path="/auctions" element={<Auctions />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
