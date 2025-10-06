import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url);
  const apiPath = pathname.replace('/api/proxy', '');
  const backendUrl = `${BACKEND_URL}${apiPath}${search}`;

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
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
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
      { status: 500 }
    );
  }
}