
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const joinDate = new Date('2025-04-01');

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
                  <Badge variant="outline" className="capitalize">{user?.role || 'Not provided'}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Region</p>
                  <p className="text-sm text-muted-foreground">India</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Account created on {format(joinDate, 'MMMM d, yyyy')}
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
