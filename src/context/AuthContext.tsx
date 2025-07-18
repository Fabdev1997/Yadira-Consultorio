import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Admin Sistema',
    email: 'admin@clinica.com',
    role: 'admin',
    phone: '+57 300 123 4567',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Dr. María González',
    email: 'maria@clinica.com',
    role: 'dentist',
    phone: '+57 300 234 5678',
    specialization: 'Ortodoncia',
    license: 'COL12345',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    email: 'ana@clinica.com',
    role: 'assistant',
    phone: '+57 300 345 6789',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'Carlos Pérez',
    email: 'carlos@paciente.com',
    role: 'patient',
    phone: '+57 300 456 7890',
    createdAt: new Date('2024-02-15')
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('dental_clinic_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('dental_clinic_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dental_clinic_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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