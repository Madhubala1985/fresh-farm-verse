
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, AuthContextType } from "@/types";
import { toast } from "sonner";

// Mock user data for demo purposes
const mockUsers = [
  {
    id: "user1",
    username: "farmer_joe",
    email: "farmer@example.com",
    password: "password123",
    role: "farmer" as const,
    profileImage: "/placeholder.svg",
  },
  {
    id: "user2",
    username: "consumer_amy",
    email: "consumer@example.com",
    password: "password123",
    role: "consumer" as const,
    profileImage: "/placeholder.svg",
  },
];

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("farmmarket_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("farmmarket_user");
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(user => user.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Remove password from user object before setting in state
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      toast.success(`Welcome back, ${userWithoutPassword.username}!`);
      
      // Store in local storage
      localStorage.setItem("farmmarket_user", JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock registration function
  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(user => user.email === userData.email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        username: userData.username || "",
        email: userData.email || "",
        role: userData.role || "consumer",
        profileImage: userData.profileImage || "/placeholder.svg",
      };
      
      // In a real app, we would save the new user to the database here
      
      // Set user without password
      setUser(newUser);
      toast.success(`Welcome to FarmMarket, ${newUser.username}!`);
      
      // Store in local storage
      localStorage.setItem("farmmarket_user", JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("farmmarket_user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
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
