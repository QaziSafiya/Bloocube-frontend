// lib/api.ts
import { loadingManager } from '@/lib/loading';
import { getApiBase } from '@/lib/config';

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  loadingManager.start();
  try {
    const base = getApiBase();
    return await fetch(`${base}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(typeof window !== 'undefined' && localStorage.getItem('token')
        ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
        : {})
    },
    ...options,
    credentials: 'include'
    });
  } finally {
    loadingManager.done();
  }
}

export const apiJson = async <T = unknown>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await apiFetch(path, options);
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.message || 'Request failed');
  return res.json();
};
