import { getApiBase } from '@/lib/config';
import { NextRequest, NextResponse } from 'next/server';
// You'll need a way to get your user's session from the request.
// This depends on your auth library (e.g., Iron Session, Next-Auth, lucia-auth).
// import { getSession } from 'your-auth-library'; 

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // The redirectUri to your backend is the current URL of this callback
    const redirectUri = new URL(request.url).origin + new URL(request.url).pathname;

    if (!code || !state) {
      return NextResponse.json(
        { success: false, error: 'Missing code or state from LinkedIn' },
        { status: 400 }
      );
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

    console.log('LinkedIn callback - Environment check:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      clientIdPreview: clientId ? clientId.substring(0, 9) + "..." : "Not set"
    });

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { success: false, error: 'LinkedIn credentials are not configured on the server.' },
        { status: 500 }
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('LinkedIn token exchange error:', errorData);
      throw new Error('Failed to exchange authorization code');
    }

    const tokenData = await tokenResponse.json();

    // Get user profile information
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error('LinkedIn profile fetch error:', errorData);
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const profileData = await profileResponse.json();

    const linkedInData = {
      id: profileData.sub,
      firstName: profileData.given_name || '',
      lastName: profileData.family_name || '',
      email: profileData.email || '',
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: new Date(Date.now() + (tokenData.expires_in * 1000)),
      connectedAt: new Date().toISOString(),
    };
    
    // 🚨 FIX 3: Get your application's user auth token from the session/cookie
    // This is pseudo-code; you must implement this based on your auth library.
    // const session = await getSession(request); 
    // const userAuthToken = session.token; 
    // if (!userAuthToken) {
    //   throw new Error('User is not authenticated.');
    // }

    try {
      // Get auth token from Authorization header or cookie set by your app
      const authHeader = request.headers.get('authorization');
      const cookieToken = request.cookies.get('token')?.value;
      const userAuthToken = authHeader?.startsWith('Bearer ')
        ? authHeader.replace(/^Bearer\s+/i, '')
        : cookieToken || null;

      if (!userAuthToken) {
        throw new Error('User is not authenticated. Missing token in header/cookie');
      }

      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/linkedin/save-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userAuthToken}`, // Send your APP's auth token
        },
        body: JSON.stringify(linkedInData),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save LinkedIn connection');
      }
    
    } catch (saveError) {
      console.error('Error saving LinkedIn connection to backend:', saveError);
      
      // ✅ FIX 1: Safely handle the 'unknown' type for the error
      let errorMessage = 'An unknown error occurred while saving the connection.';
      if (saveError instanceof Error) {
        errorMessage = saveError.message;
      }
      
      // ✅ FIX 2: Redirect to your settings page, not a Twitter URL
      const frontendSettingsUrl = new URL(request.url).origin + '/creator/settings';
      return NextResponse.redirect(`${frontendSettingsUrl}?linkedin=error&message=${encodeURIComponent(errorMessage)}`);
    }

    // On success, redirect to the settings page
    const successUrl = new URL(request.url).origin + '/creator/settings';
    return NextResponse.redirect(`${successUrl}?linkedin=success`);

  } catch (error) {
    console.error('LinkedIn callback error:', error);
    const frontendSettingsUrl = new URL(request.url).origin + '/creator/settings';
    let errorMessage = 'Failed to connect LinkedIn account';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.redirect(`${frontendSettingsUrl}?linkedin=error&message=${encodeURIComponent(errorMessage)}`);
  }
}