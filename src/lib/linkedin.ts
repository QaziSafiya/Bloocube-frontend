// LinkedIn service for handling OAuth flow and profile data

export interface LinkedInUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  connectedAt?: string;
}

export interface LinkedInAuthResponse {
  success: boolean;
  authURL?: string;
  state?: string;
  error?: string;
}

export interface LinkedInProfileResponse {
  success: boolean;
  profile?: LinkedInUser;
  error?: string;
}

import { apiRequest } from '@/lib/apiClient';
import { getApiBase } from '@/lib/config';

class LinkedInService {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = getApiBase();
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return apiRequest<T>(endpoint, options);
  }

  async generateAuthURL(redirectUri: string): Promise<LinkedInAuthResponse> {
    try {
      const url = `/api/linkedin/auth-url?redirectUri=${encodeURIComponent(redirectUri)}`;
      return await this.request<LinkedInAuthResponse>(url, { method: 'GET' });
    } catch {
      return this.request<LinkedInAuthResponse>('/api/linkedin/auth-url', {
        method: 'POST',
        body: JSON.stringify({ redirectUri })
      });
    }
  }

  async getProfile(): Promise<LinkedInProfileResponse> {
    return this.request<LinkedInProfileResponse>('/api/linkedin/profile');
  }

  async disconnect(): Promise<{ success: boolean; message?: string; error?: string }> {
    return this.request('/api/linkedin/disconnect', {
      method: 'DELETE'
    });
  }
  
}

export const linkedInService = new LinkedInService();


