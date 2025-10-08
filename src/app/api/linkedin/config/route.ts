import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check LinkedIn OAuth configuration
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const origin = new URL(request.url).origin;
    const redirectUri = `${FRONTEND_URL || origin}/api/linkedin/callback`;
    
    return NextResponse.json({
      success: true,
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      scopes: "openid,profile,email",
      redirectUri,
      clientIdPreview: clientId ? clientId.substring(0, 9) + "..." : "Not set",
      clientSecretPreview: clientSecret ? clientSecret.substring(0, 9) + "..." : "Not set"
    });

  } catch (error) {
    console.error('LinkedIn config check error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check LinkedIn configuration' },
      { status: 500 }
    );
  }
}
