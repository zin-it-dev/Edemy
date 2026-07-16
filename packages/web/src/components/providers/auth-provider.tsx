import { useState, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';
import type { User } from '@/types/data.type';
import axios from '@/lib/axios';
import { useAuth, getToken } from '@clerk/react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;

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
      }
    };

    checkAuth();
  }, [isLoaded, isSignedIn]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
