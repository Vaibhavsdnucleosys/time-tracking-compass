
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static users for demo
const DEMO_USERS: User[] = [
  { id: '1', username: 'admin', email: 'admin@company.com', role: 'admin', name: 'Admin User' },
  { id: '2', username: 'director', email: 'director@company.com', role: 'director', name: 'Director Smith' },
  { id: '3', username: 'pm', email: 'pm@company.com', role: 'pm', name: 'Project Manager Jones' },
  { id: '4', username: 'tl', email: 'tl@company.com', role: 'tl', name: 'Team Lead Wilson' },
  { id: '5', username: 'employee', email: 'employee@company.com', role: 'employee', name: 'Employee Brown' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = DEMO_USERS.find(u => u.username === username);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
