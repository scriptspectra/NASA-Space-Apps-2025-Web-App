import { NextRequest, NextResponse } from 'next/server';

const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://localhost:9000';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Forward the form data to the lightcurve API
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/upload-fits`, {
      method: 'POST',
      body: formData,
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
    console.error('Error uploading FITS file:', error);
    return NextResponse.json(
      { error: 'Failed to upload FITS file' },
      { status: 500 }
    );
  }
}