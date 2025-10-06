import { useState, useEffect, useCallback, useMemo } from 'react';
import { authUtils } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<null | { id: string; role: 'creator' | 'brand' }>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const userData = authUtils.getUser();
        if (userData && typeof userData === 'object' && 'id' in userData && 'role' in userData) {
          setUser(userData as { id: string; role: 'creator' | 'brand' });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Memoized auth state
  const authState = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading
  }), [user, isLoading]);

  // Optimized setUser with callback
  const updateUser = useCallback((newUser: typeof user) => {
    setUser(newUser);
    if (newUser) {
      // Preserve existing token; only update user object
      try {
        const token = authUtils.getToken() || '';
        authUtils.setAuth(token, newUser);
      } catch {
        // Fallback: store user only
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(newUser));
          }
        } catch {}
      }
    } else {
      authUtils.clearAuth();
    }
  }, []);

  return { 
    ...authState, 
    setUser: updateUser 
  };
}


