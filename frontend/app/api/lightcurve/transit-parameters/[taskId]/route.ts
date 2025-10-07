import { NextRequest, NextResponse } from 'next/server';

const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://localhost:9000';

export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId;
    console.log(`🔄 Extracting transit parameters for task: ${taskId}`);
    
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/transit-parameters/${taskId}`, {
      method: 'POST',
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