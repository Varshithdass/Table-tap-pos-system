
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "@/types/auth";

// Sample users for demonstration
const sampleUsers = [
  {
    id: "1",
    name: "John Owner",
    email: "owner@example.com",
    password: "password123", // In a real app, passwords would be hashed
    role: "owner" as const,
    restaurant_id: "1"
  },
  {
    id: "2",
    name: "Mary Manager",
    email: "manager@example.com",
    password: "password123",
    role: "manager" as const,
    restaurant_id: "1"
  },
  {
    id: "3",
    name: "Chris Cashier",
    email: "cashier@example.com",
    password: "password123",
    role: "cashier" as const,
    restaurant_id: "1"
  },
  {
    id: "4",
    name: "Sam Owner",
    email: "sam@example.com",
    password: "password123", 
    role: "owner" as const,
    restaurant_id: "2"
  }
];

// Sample restaurants for demonstration
const sampleRestaurants = [
  {
    id: "1",
    name: "Biryani Palace - Main Branch",
    location: "123 Main St, Bangalore",
    contact: "9876543210",
    owner_id: "1"
  },
  {
    id: "2",
    name: "Biryani Palace - Downtown",
    location: "456 Downtown Ave, Bangalore",
    contact: "9876543211",
    owner_id: "4"
  }
];

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, restaurantName: string, location: string, contact: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const user = sampleUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Remove password before storing user
      const { password: _, ...safeUser } = user;
      
      localStorage.setItem("user", JSON.stringify(safeUser));
      setAuthState({
        user: safeUser,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const register = async (name: string, email: string, password: string, restaurantName: string, location: string, contact: string) => {
    // Check if email already exists
    if (sampleUsers.some(u => u.email === email)) {
      return false;
    }

    // In a real app, this would create a new user and restaurant in the database
    const newUserId = String(sampleUsers.length + 1);
    const newRestaurantId = String(sampleRestaurants.length + 1);

    const newUser = {
      id: newUserId,
      name,
      email,
      password,
      role: "owner" as const,
      restaurant_id: newRestaurantId
    };

    const newRestaurant = {
      id: newRestaurantId,
      name: restaurantName,
      location,
      contact,
      owner_id: newUserId
    };

    sampleUsers.push(newUser);
    sampleRestaurants.push(newRestaurant);

    // Log user in after registration
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem("user", JSON.stringify(safeUser));
    
    setAuthState({
      user: safeUser,
      isAuthenticated: true,
      isLoading: false
    });
    
    return true;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        logout,
        register
      }}
    >
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
