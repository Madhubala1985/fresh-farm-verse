import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Box, 
  Calendar, 
  Check, 
  ChevronDown, 
  Edit, 
  Eye, 
  Leaf, 
  Search, 
  Tag, 
  Trash2, 
  X 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for farmer's product listings with reliable Pexels image URLs
const mockListings = [
  {
    id: "p1",
    name: "Organic Rice",
    category: "Crops",
    price: 2.5,
    quantity: 200,
    unit: "kg",
    organic: true,
    status: "active",
    createdAt: "2023-04-10T12:00:00Z",
    image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    views: 124,
    orders: 5
  },
  {
    id: "p2",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 1.75,
    quantity: 50,
    unit: "kg",
    organic: true,
    status: "active",
    createdAt: "2023-04-08T10:00:00Z",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
    views: 89,
    orders: 3
  },
  {
    id: "p3",
    name: "Mustard Seeds",
    category: "Crops",
    price: 3.2,
    quantity: 100,
    unit: "kg",
    organic: false,
    status: "active",
    createdAt: "2023-04-11T09:30:00Z",
    image: "https://images.pexels.com/photos/4198035/pexels-photo-4198035.jpeg",
    views: 45,
    orders: 1
  },
  {
    id: "p4",
    name: "Green Chillies",
    category: "Vegetables",
    price: 2.0,
    quantity: 20,
    unit: "kg",
    organic: true,
    status: "low_stock",
    createdAt: "2023-04-07T08:45:00Z",
    image: "https://images.pexels.com/photos/1373911/pexels-photo-1373911.jpeg",
    views: 56,
    orders: 2
  },
  {
    id: "p5",
    name: "Red Lentils",
    category: "Pulses",
    price: 3.8,
    quantity: 150,
    unit: "kg",
    organic: false,
    status: "paused",
    createdAt: "2023-04-06T14:20:00Z",
    image: "https://images.pexels.com/photos/4198574/pexels-photo-4198574.jpeg",
    views: 32,
    orders: 0
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  low_stock: "bg-yellow-100 text-yellow-800",
  paused: "bg-gray-100 text-gray-800",
  sold_out: "bg-red-100 text-red-800"
};

const statusLabels = {
  active: "Active",
  low_stock: "Low Stock",
  paused: "Paused",
  sold_out: "Sold Out"
};

const ListingsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Unique categories for filter
  const categories = Array.from(new Set(mockListings.map(listing => listing.category)));
  const statuses = Array.from(new Set(mockListings.map(listing => listing.status)));
  
  // Apply filters
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = 
      searchTerm === "" || 
      listing.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === null || 
      listing.category === categoryFilter;
    
    const matchesStatus = 
      statusFilter === null || 
      listing.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleEdit = (id: string) => {
    toast.info(`Editing listing ${id}`);
    // Editing logic would go here
  };
  
  const handleDelete = (id: string) => {
    toast.success(`Listing ${id} deleted`);
    // Deletion logic would go here
  };
  
  const handleCreateAuction = (id: string) => {
    toast.info(`Creating auction for listing ${id}`);
    // Create auction logic would go here
  };
  
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    toast.success(`Listing ${id} status changed to ${statusLabels[newStatus as keyof typeof statusLabels]}`);
    // Status toggle logic would go here
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <CardTitle>My Listings</CardTitle>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <div className="relative w-full md:w-64">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  {categoryFilter || "Category"} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter(null)}>All</DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  {statusFilter ? statusLabels[statusFilter as keyof typeof statusLabels] : "Status"} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                {statuses.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {statusLabels[status as keyof typeof statusLabels]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredListings.length === 0 ? (
            <div className="text-center py-8">
              <Box className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-2 text-muted-foreground">No listings found matching your filters.</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <div key={listing.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg border">
                <img 
                  src={listing.image} 
                  alt={listing.name} 
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.pexels.com/photos/2286901/pexels-photo-2286901.jpeg';
                  }}
                />
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{listing.name}</h3>
                    <Badge variant="outline" className={statusColors[listing.status as keyof typeof statusColors]}>
                      {statusLabels[listing.status as keyof typeof statusLabels]}
                    </Badge>
                    {listing.organic && (
                      <Badge variant="outline" className="bg-farm-green text-white border-0">
                        <Leaf className="mr-1 h-3 w-3" /> Organic
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 space-x-4 text-sm text-muted-foreground flex flex-wrap gap-y-1">
                    <span>{listing.category}</span>
                    <span>₹{listing.price}/{listing.unit}</span>
                    <span>Stock: {listing.quantity} {listing.unit}</span>
                    <span className="flex items-center"><Eye className="mr-1 h-3 w-3" /> {listing.views}</span>
                    <span className="flex items-center"><Tag className="mr-1 h-3 w-3" /> {listing.orders} orders</span>
                    <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> {new Date(listing.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2 md:mt-0 self-end md:self-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleToggleStatus(listing.id, listing.status)}
                  >
                    {listing.status === 'active' ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-farm-accent-orange text-farm-accent-orange hover:bg-farm-accent-orange/5"
                    onClick={() => handleCreateAuction(listing.id)}
                  >
                    Create Auction
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(listing.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingsManager;
