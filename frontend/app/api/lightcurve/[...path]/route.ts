// /app/api/lightcurve/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library'; // only if your Lightcurve service is private

// Use the correct env var for the Lightcurve service
const LIGHTCURVE_URL = process.env.LIGHTCURVE_URL || 'https://lightcurve-452601381.us-central1.run.app';

// Generic handler for all methods
async function handleRequest(req: NextRequest) {
  try {
    const { pathname, search } = new URL(req.url);
    // Remove the /api/lightcurve/proxy prefix
    const apiPath = pathname.replace('/api/lightcurve/proxy', '');
    const backendUrl = `${LIGHTCURVE_URL}${apiPath}${search}`;

    const method = req.method;

    // If you need to call a private service with Google Auth ID token:
    // const auth = new GoogleAuth();
    // const client = await auth.getIdTokenClient(backendUrl);
    // const res = await client.request({ url: backendUrl, method, data: req.body });

    const body = method !== 'GET' && method !== 'HEAD' ? await req.json() : undefined;

    const response = await fetch(backendUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Lightcurve proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch from Lightcurve service' },
      { status: 500 }
    );
  }
}

// Export all standard HTTP methods
export async function GET(req: NextRequest) {
  return handleRequest(req);
}
export async function POST(req: NextRequest) {
  return handleRequest(req);
}
export async function PUT(req: NextRequest) {
  return handleRequest(req);
}
export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}
export async function PATCH(req: NextRequest) {
  return handleRequest(req);
}
export async function OPTIONS(req: NextRequest) {
  return handleRequest(req);
}
