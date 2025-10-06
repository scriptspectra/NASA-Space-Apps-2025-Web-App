import { NextRequest, NextResponse } from 'next/server';

// Use direct backend URL for internal communication
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080';

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url);
  const apiPath = pathname.replace('/api/proxy', '');
  const backendUrl = `${BACKEND_URL}${apiPath}${search}`;

  try {
    console.log(`[Frontend API] Attempting to connect to: ${backendUrl}`);
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`[Frontend API] Backend responded with status: ${response.status}`);
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Frontend API] Proxy error:', error);
    console.error(`[Frontend API] Failed to connect to: ${backendUrl}`);
    return NextResponse.json(
      { error: 'Failed to fetch from backend', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { pathname, search } = new URL(request.url);
  const apiPath = pathname.replace('/api/proxy', '');
  const backendUrl = `${BACKEND_URL}${apiPath}${search}`;

  try {
    const body = await request.json();
    console.log(`[Frontend API] POST to: ${backendUrl}`);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`[Frontend API] Backend responded with status: ${response.status}`);
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Frontend API] Proxy error:', error);
    console.error(`[Frontend API] Failed to connect to: ${backendUrl}`);
    return NextResponse.json(
      { error: 'Failed to fetch from backend', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}