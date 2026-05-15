'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: { email: string } | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setUser({ email });
    }
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setUser({ email });
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
