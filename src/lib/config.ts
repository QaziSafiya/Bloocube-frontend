// src/lib/config.ts
// Resolve frontend base URL at runtime with safe fallbacks
function getFrontendBase(): string {
  const envPublic = (globalThis as any)?.NEXT_PUBLIC_FRONTEND_URL as string | undefined;
  const envLegacy = (globalThis as any)?.NEXT_FRONTEND_API_URL as string | undefined;
  const nodePublic = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const nodeLegacy = process.env.NEXT_FRONTEND_API_URL;

  const fromEnv = envPublic || envLegacy || nodePublic || nodeLegacy;
  const fromWindow = typeof window !== 'undefined' ? window.location.origin : undefined;
  const base = (fromEnv || fromWindow || '').toString();
  if (!base) {
    // As a last resort, keep empty; callers should handle error if needed
    return '';
  }
  return base.replace(/\/+$/, '');
}

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  appUrl: getFrontendBase(),
  twitter: {
    callbackUrl: `${getFrontendBase()}/auth/twitter/callback`
  },
  youtube: {
    callbackUrl: `${getFrontendBase()}/auth/youtube/callback`
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
