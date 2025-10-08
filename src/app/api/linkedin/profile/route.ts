import { NextRequest, NextResponse } from 'next/server';
import { getApiBase } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const base = getApiBase();
    const headerAuth = request.headers.get('authorization');
    const cookieToken = request.cookies.get('token')?.value;
    const token = headerAuth?.startsWith('Bearer ')
      ? headerAuth
      : (cookieToken ? `Bearer ${cookieToken}` : '');
    const res = await fetch(`${base}/api/linkedin/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: token } : {})
      },
      credentials: 'include'
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error('LinkedIn profile fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch LinkedIn profile' },
      { status: 500 }
    );
  }
}

