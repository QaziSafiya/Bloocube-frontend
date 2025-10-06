import { apiRequest } from '@/lib/apiClient';

export type CreatorUser = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  profile?: { bio?: string; avatar_url?: string };
  socialAccounts?: Record<string, any>;
};

export type CreatorListResponse = { success: boolean; data: { users: CreatorUser[] } };

export const userService = {
  async listCreators(params: Record<string, string | number | undefined> = {}) {
    // Prefer a proper creators endpoint if available; fallback to admin users list filtered by role
    const qs = new URLSearchParams(
      Object.entries({ role: 'creator', ...params })
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return apiRequest<CreatorListResponse>(`/api/admin/users?${qs}`);
  }
};




