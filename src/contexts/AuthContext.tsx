
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  mrn: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (mrn: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (mrn: string) => {
    if (mrn.trim().length === 0) {
      toast({
        title: "Error",
        description: "Please enter a valid MRN number",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would validate credentials with a backend
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      mrn: mrn,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Welcome",
      description: "You have successfully logged in",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
