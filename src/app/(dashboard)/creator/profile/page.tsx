"use client";
import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/apiClient';
import Button from '@/Components/ui/Button';

type UserProfile = {
  name?: string;
  email?: string;
  role?: string;
  profile?: {
    bio?: string;
    avatar_url?: string;
    social_links?: Partial<Record<'youtube'|'instagram'|'twitter'|'linkedin'|'facebook', string>>;
  };
};

export default function CreatorProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState<UserProfile>({ profile: { social_links: {} } });

  const load = async () => {
    try {
      setError(null);
      const res = await apiRequest<{ success: boolean; data: { user: UserProfile } }>("/api/auth/me");
      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
        profile: {
          bio: res.data.user.profile?.bio || "",
          avatar_url: res.data.user.profile?.avatar_url || "",
          social_links: res.data.user.profile?.social_links || {}
        }
      });
    } catch (e) {
      setError((e as Error).message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (path: string, value: string) => {
    setForm(prev => {
      const next: UserProfile = JSON.parse(JSON.stringify(prev || {}));
      const parts = path.split('.');
      let cur: any = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const k = parts[i];
        cur[k] = cur[k] ?? {};
        cur = cur[k];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload: UserProfile = {
        name: form.name,
        profile: {
          bio: form.profile?.bio,
          avatar_url: form.profile?.avatar_url,
          social_links: form.profile?.social_links
        }
      };
      await apiRequest<{ success: boolean }>("/api/auth/me", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
      setSuccess("Profile updated successfully");
    } catch (e) {
      setError((e as Error).message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h1>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          {!!error && <div className="text-sm text-red-600">{error}</div>}
          {!!success && <div className="text-sm text-emerald-600">{success}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={form.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={form.email || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={form.profile?.bio || ''}
              onChange={(e) => onChange('profile.bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <input
              value={form.profile?.avatar_url || ''}
              onChange={(e) => onChange('profile.avatar_url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['youtube','instagram','twitter','linkedin','facebook'].map((k) => (
              <div key={k}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{k[0].toUpperCase()+k.slice(1)} URL</label>
                <input
                  value={String((form.profile?.social_links?.[k as keyof NonNullable<UserProfile['profile']>['social_links']]) ?? '')}
                  onChange={(e) => onChange(`profile.social_links.${k}` , e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`https://${k}.com/your-handle`}
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      )}
    </div>
  );
}


