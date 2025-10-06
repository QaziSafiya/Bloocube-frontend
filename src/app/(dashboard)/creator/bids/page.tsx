"use client";
import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/apiClient';

type Bid = {
  _id: string;
  campaign_id?: string;
  status?: string;
  bid_amount?: number;
  createdAt?: string;
};

export default function CreatorBidsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);

  const load = async () => {
    try {
      setError(null);
      const res = await apiRequest<{ success: boolean; data: { bids: Bid[] } }>(`/api/bids`);
      setBids(res.data.bids || []);
    } catch (e) {
      setError((e as Error).message || 'Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold text-gray-900 mb-4">My Bids</h1>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : bids.length === 0 ? (
        <div className="text-gray-600">You haven't placed any bids yet.</div>
      ) : (
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-xs sm:text-sm">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700">Bid ID</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700">Campaign</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(b => (
                <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-900">{b._id}</td>
                  <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600">{b.campaign_id || '-'}</td>
                  <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-900">{typeof b.bid_amount === 'number' ? `₹${b.bid_amount.toLocaleString()}` : '-'}</td>
                  <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm"><span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">{b.status || 'pending'}</span></td>
                  <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


