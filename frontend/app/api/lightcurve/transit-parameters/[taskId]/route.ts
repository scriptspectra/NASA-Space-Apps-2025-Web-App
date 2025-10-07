import { NextRequest, NextResponse } from 'next/server';

// Use direct lightcurve URL for internal communication
const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://lightcurve:9000';

export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId;
    console.log(`🔄 Extracting transit parameters for task: ${taskId}`);
    
    // Prepare headers with optional auth
    const headers: HeadersInit = {};
    const token = process.env.INTERNAL_AUTH_TOKEN;
    if (token) {
      headers['x-internal-token'] = token;
    }
    
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/transit-parameters/${taskId}`, {
      method: 'POST',
      headers,
      cache: 'no-store',
    });

    console.log(`📡 Parameters API response: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Parameters API error: ${errorText}`);
      return NextResponse.json(
        { error: `Lightcurve API error: ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log(`✅ Parameters extracted successfully`);
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Error extracting transit parameters:', error);
    return NextResponse.json(
      { error: `Failed to extract transit parameters: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}