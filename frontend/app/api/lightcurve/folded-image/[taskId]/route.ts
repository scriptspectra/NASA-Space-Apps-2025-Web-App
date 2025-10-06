import { NextRequest, NextResponse } from 'next/server';

// Use direct lightcurve URL for internal communication
const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://lightcurve:9000';

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId;
    
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/folded-image/${taskId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        );
      }
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Lightcurve API error: ${errorText}` },
        { status: response.status }
      );
    }

    // Get the image blob and forward it
    const imageBuffer = await response.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="folded_lightcurve_${taskId}.png"`,
      },
    });

  } catch (error) {
    console.error('Error fetching folded image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch folded image' },
      { status: 500 }
    );
  }
}