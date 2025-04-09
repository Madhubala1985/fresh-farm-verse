
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-sm text-muted-foreground">{user?.username || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-muted-foreground capitalize">{user?.role || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{user?.location || 'Not provided'}</p>
                </div>
                {user?.state && (
                  <div>
                    <p className="text-sm font-medium">State</p>
                    <p className="text-sm text-muted-foreground">{user.state}</p>
                  </div>
                )}
                {user?.district && (
                  <div>
                    <p className="text-sm font-medium">District</p>
                    <p className="text-sm text-muted-foreground">{user.district}</p>
                  </div>
                )}
                {user?.pincode && (
                  <div>
                    <p className="text-sm font-medium">PIN Code</p>
                    <p className="text-sm text-muted-foreground">{user.pincode}</p>
                  </div>
                )}
                {user?.phone && (
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Account created on April 9, 2025
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
