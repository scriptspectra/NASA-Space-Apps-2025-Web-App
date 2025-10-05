import { NextRequest, NextResponse } from 'next/server';

const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://localhost:9000';

export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId;
    
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/ml-inference/${taskId}`, {
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
    console.error('Error running ML inference:', error);
    return NextResponse.json(
      { error: 'Failed to run ML inference' },
      { status: 500 }
    );
  }
}