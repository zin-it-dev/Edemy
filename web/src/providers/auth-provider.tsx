import axios from '@/api/axios';
import { getToken } from '@clerk/react';
import { createContext, useState, useEffect } from 'react';

type User = {
  username: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        const response = await axios('/users/current-user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
