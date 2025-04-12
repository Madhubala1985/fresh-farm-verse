
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, AuthContextType } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on mount and set up auth listener
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          try {
            // Fetch user profile data from our profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (profileError) throw profileError;

            // Create a user object with data from the profiles table
            const userData: User = {
              id: session.user.id,
              username: session.user.email?.split('@')[0] || '',
              email: profileData.email || '',
              role: profileData.role as 'farmer' | 'consumer' | 'admin',
              profileImage: '/placeholder.svg',
              bio: '',
              location: '',
            };
            
            setUser(userData);
          } catch (err) {
            console.error("Error fetching user profile:", err);
            // Still set the basic user data even if profile fetch fails
            setUser({
              id: session.user.id,
              username: session.user.email?.split('@')[0] || '',
              email: session.user.email || '',
              role: 'consumer',
              profileImage: '/placeholder.svg',
            });
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session on load
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // The onAuthStateChange handler will take care of setting the user
        // We don't need to duplicate that logic here
        if (!session) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error checking auth session:", err);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) throw signInError;
      
      toast.success(`Welcome back!`);
    } catch (err: any) {
      setError(err.message || "Login failed");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Registration function
  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Register user with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: userData.email || '',
        password: userData.password,
        options: {
          data: {
            // Only include data that matches the profiles table structure
            role: userData.role || 'consumer',
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      toast.success(`Welcome to FarmMarket!`);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      toast.error("Registration failed. " + (err.message || "Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile function
  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Update the profile in our profiles table - only update fields that exist in the table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          email: userData.email,
          role: userData.role
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      toast.success("Profile updated successfully");
    } catch (err: any) {
      setError(err.message || "Profile update failed");
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.info("You have been logged out");
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
