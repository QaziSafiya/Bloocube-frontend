import { NextRequest, NextResponse } from 'next/server';
import { getApiBase } from '@/lib/config';

export async function DELETE(request: NextRequest) {
  try {
    const base = getApiBase();
    const token = request.headers.get('authorization') || '';
    const res = await fetch(`${base}/api/linkedin/disconnect`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: token } : {})
      },
      credentials: 'include'
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('LinkedIn disconnect error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to disconnect LinkedIn account' },
      { status: 500 }
    );
  }
}


