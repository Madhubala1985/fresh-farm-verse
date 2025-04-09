import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Edit, Check, Loader2 } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FarmerProfile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("User not authenticated.");
      }
      
      const updatedProfile = {
        uid: user.uid,
        name,
        email,
        bio,
        location
      };
      
      await updateUserProfile(updatedProfile);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Profile update failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container max-w-3xl mx-auto py-10 px-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Farmer Profile</h2>
                <Button 
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      <span>View Profile</span>
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    type="text" 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
            
            {isEditing && (
              <CardFooter>
                <Button 
                  className="w-full bg-farm-green hover:bg-farm-green/90"
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerProfile;
