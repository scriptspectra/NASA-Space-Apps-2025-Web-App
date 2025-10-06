import { NextRequest, NextResponse } from 'next/server';

// Use direct lightcurve URL for internal communication
const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://lightcurve:9000';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Proxying FITS upload to lightcurve API...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('❌ No file provided in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    console.log(`📁 File received: ${file.name}, size: ${file.size} bytes`);
    
    // Forward the form data to the lightcurve API
    const response = await fetch(`${LIGHTCURVE_API_URL}/api/v1/upload-fits`, {
      method: 'POST',
      body: formData,
    });

    const responseText = await response.text();
    console.log(`📡 Lightcurve API response: ${response.status}`);

    if (!response.ok) {
      console.error(`❌ Lightcurve API error: ${responseText}`);
      return NextResponse.json(
        { error: `Lightcurve API error: ${responseText}` },
        { status: response.status }
      );
    }

    const result = JSON.parse(responseText);
    console.log(`✅ Upload successful, task ID: ${result.task_id}`);
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Error uploading FITS file:', error);
    return NextResponse.json(
      { error: `Failed to upload FITS file: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}