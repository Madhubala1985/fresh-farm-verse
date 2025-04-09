
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { User, Edit, Save, ArrowLeft, FileImage, MapPin, Phone, Mail, UserIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: '+91 98765 43210', // Mock data
    address: '123 Green Street, Mumbai, Maharashtra',
    bio: 'I love buying fresh produce directly from farmers. Supporting local agriculture is important to me!',
    profileImage: user?.profileImage || '/placeholder.svg',
  });

  // Mock order history
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-10-15',
      status: 'Delivered',
      total: 1250.00,
      items: [
        { name: 'Organic Potatoes', quantity: 5, price: 150.00 },
        { name: 'Fresh Tomatoes', quantity: 2, price: 200.00 },
        { name: 'Basmati Rice', quantity: 1, price: 900.00 },
      ]
    },
    {
      id: 'ORD-12346',
      date: '2023-09-28',
      status: 'Processing',
      total: 850.00,
      items: [
        { name: 'Wheat Flour', quantity: 2, price: 450.00 },
        { name: 'Farm Eggs', quantity: 2, price: 400.00 }
      ]
    }
  ];

  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Access Required</CardTitle>
            <CardDescription>You need to be logged in to access your profile.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <UserIcon className="h-16 w-16 text-muted-foreground opacity-50" />
            <p className="text-center text-muted-foreground">
              Please sign in to view and manage your profile.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/')}>
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
    // In a real app, save changes to the database here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex flex-col gap-6">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{user.role === 'consumer' ? 'My Profile' : 'Farmer Profile'}</CardTitle>
                  <CardDescription>Manage your personal information and preferences</CardDescription>
                </div>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)} 
                    size="sm"
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSaveProfile} 
                    size="sm"
                    className="bg-farm-green hover:bg-farm-green/90"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.profileImage} />
                    <AvatarFallback>{profile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <FileImage className="mr-2 h-4 w-4" /> Change Photo
                    </Button>
                  )}
                  <div className="text-center mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-farm-green/10 text-farm-green">
                      {user.role === 'farmer' ? 'Farmer' : 'Consumer'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Full Name</Label>
                      {isEditing ? (
                        <Input 
                          id="username" 
                          name="username" 
                          value={profile.username}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm">{profile.username}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input 
                          id="email" 
                          name="email" 
                          value={profile.email}
                          onChange={handleInputChange}
                          type="email"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{profile.email}</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={profile.phone}
                          onChange={handleInputChange}
                          type="tel"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{profile.phone}</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      {isEditing ? (
                        <Input 
                          id="address" 
                          name="address" 
                          value={profile.address}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{profile.address}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <textarea 
                        id="bio" 
                        name="bio" 
                        value={profile.bio}
                        onChange={handleInputChange}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    ) : (
                      <p className="text-sm">{profile.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-0">
              {user.role === 'consumer' ? (
                <Button variant="destructive" onClick={logout}>Sign Out</Button>
              ) : (
                <Button 
                  className="bg-farm-green hover:bg-farm-green/90"
                  onClick={() => navigate('/farmer')}
                >
                  Go to Dashboard
                </Button>
              )}
            </CardFooter>
          </Card>

          {user.role === 'consumer' && (
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="saved">Saved Items</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View the status of recent orders and purchase history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {orders.map(order => (
                        <Card key={order.id} className="overflow-hidden border-muted">
                          <div className="bg-muted p-4">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                                <Button variant="outline" size="sm">Track Order</Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between py-2 border-b last:border-b-0 text-sm">
                                <div className="flex gap-2">
                                  <span>{item.quantity} ×</span>
                                  <span>{item.name}</span>
                                </div>
                                <span>₹{item.price.toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between mt-4 font-medium">
                              <span>Total</span>
                              <span>₹{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>
                      Products and farmers you've saved
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-6">
                      You haven't saved any items yet. Browse the marketplace and click the heart icon to save items for later.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
