import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';

async function handleRequest(request: Request, method: 'GET' | 'POST' = 'GET') {
    const url = new URL(request.url);
    const backendPath = url.pathname.replace('/api/proxy', '');
    const backendUrl = `${BACKEND_URL}${backendPath}`;
    
    console.log(`[API Proxy] ${method} request to: ${backendUrl}`);
    
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (method === 'POST') {
            const body = await request.json();
            console.log('[API Proxy] Request body:', body);
            options.body = JSON.stringify(body);
        }

        console.log(`[API Proxy] Fetching ${backendUrl} with options:`, options);
        
        const response = await fetch(backendUrl, options);
        console.log(`[API Proxy] Backend response status:`, response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API Proxy] Backend error response:`, errorText);
            return NextResponse.json(
                { error: `Backend responded with status ${response.status}: ${errorText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('[API Proxy] Backend response data:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('[API Proxy] Error:', error);
        return NextResponse.json(
            { error: `Failed to fetch from backend: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    return handleRequest(request, 'GET');
}

export async function POST(request: Request) {
    return handleRequest(request, 'POST');
}