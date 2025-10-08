// src/lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  appUrl: process.env.NEXT_FRONTEND_API_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  twitter: {
    // callbackUrl: 'http://localhost:3000/auth/twitter/callback'
    callbackUrl: process.env.FRONTEND_URL + '/auth/twitter/callback'
  },
  youtube: {
    // callbackUrl: 'http://localhost:3000/auth/youtube/callback'
    callbackUrl: process.env.FRONTEND_URL + '/auth/youtube/callback'
  },
};

export const getApiBase = (): string => {
  const runtime = (globalThis as any)?.NEXT_PUBLIC_API_URL as string | undefined;
  const base = runtime || process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    throw new Error('NEXT_PUBLIC_API_URL is not set. Configure it in your deployment env or .env.local');
  }
  return base.replace(/\/+$/, '');
};
