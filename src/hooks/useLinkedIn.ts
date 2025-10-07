import { useState } from 'react';
import { linkedInService } from '@/lib/linkedin';
import { authUtils } from '@/lib/auth';
// import { config } from '@/lib/config'; // Unused import

export const useLinkedIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [profile, setProfile] = useState<unknown | null>(null);

  const connect = async (redirectUri?: string) => {
    try {
      setLoading(true);
      setError(null);
      const callbackUrl = redirectUri || `${window.location.origin}/auth/linkedin/callback`;
      const res = await linkedInService.generateAuthURL(callbackUrl);
      if (res.success && res.authURL) {
        localStorage.setItem('linkedin_state', res.state || '');
        window.location.href = res.authURL;
      } else {
        throw new Error(res.error || 'Failed to generate LinkedIn auth URL');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to connect to LinkedIn');
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!authUtils.isAuthenticated()) {
        setIsConnected(false);
        setProfile(null);
        return { success: false, error: 'Not authenticated' };
      }
      const res = await linkedInService.getProfile();
      if (res && (res as any).success) {
        setIsConnected(true);
        setProfile((res as any).profile || null);
      } else {
        setIsConnected(false);
        setProfile(null);
      }
      return res;
    } catch (e: unknown) {
      setIsConnected(false);
      setProfile(null);
      setError(e instanceof Error ? e.message : 'Failed to fetch LinkedIn profile');
      return { success: false, error: e instanceof Error ? e.message : 'Failed to fetch LinkedIn profile' } as any;
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await linkedInService.disconnect();
      if ((res as any).success) {
        setIsConnected(false);
        setProfile(null);
      }
      return res;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to disconnect LinkedIn');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { connect, getProfile, disconnect, isConnected, profile, loading, error };
};


