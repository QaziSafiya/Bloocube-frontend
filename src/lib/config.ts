// src/lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  appUrl: 'http://localhost:3000',
  twitter: {
    callbackUrl: 'http://localhost:3000/auth/twitter/callback'
  },
  youtube: {
    callbackUrl: 'http://localhost:3000/auth/youtube/callback'
  },
};

export const getApiBase = (): string => {
  const runtime = (globalThis as any)?.NEXT_PUBLIC_API_URL as string | undefined;
  const base = runtime || process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    throw new Error('NEXT_PUBLIC_API_URL is not set. Configure it in your deployment env or .env.local');
  }
  return base.replace(/\/+$/, '');
};
