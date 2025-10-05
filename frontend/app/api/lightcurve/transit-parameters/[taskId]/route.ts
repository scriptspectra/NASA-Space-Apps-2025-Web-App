import { NextRequest, NextResponse } from 'next/server';

const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://localhost:9000';

export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId;
    
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/transit-parameters/${taskId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Lightcurve API error: ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error extracting transit parameters:', error);
    return NextResponse.json(
      { error: 'Failed to extract transit parameters' },
      { status: 500 }
    );
  }
}