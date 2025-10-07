import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080';
const LIGHTCURVE_API_URL = process.env.LIGHTCURVE_API_URL || 'http://lightcurve:9000';

export async function GET() {
  const healthStatus = {
    frontend: 'ok',
    backend: 'unknown',
    lightcurve: 'unknown',
    timestamp: new Date().toISOString(),
  };

  // Prepare headers with optional auth
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const token = process.env.INTERNAL_AUTH_TOKEN;
  if (token) {
    headers['x-internal-token'] = token;
  }

  try {
    // Test backend connectivity
    console.log(`[Health Check] Testing backend at: ${BACKEND_URL}`);
    const backendResponse = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });
    healthStatus.backend = backendResponse.ok ? 'ok' : `error (${backendResponse.status})`;
  } catch (error) {
    console.error('[Health Check] Backend connection failed:', error);
    healthStatus.backend = `connection_failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  try {
    // Test lightcurve connectivity
    console.log(`[Health Check] Testing lightcurve at: ${LIGHTCURVE_API_URL}`);
    const lightcurveResponse = await fetch(`${LIGHTCURVE_API_URL}/api/v1/health`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });
    healthStatus.lightcurve = lightcurveResponse.ok ? 'ok' : `error (${lightcurveResponse.status})`;
  } catch (error) {
    console.error('[Health Check] Lightcurve connection failed:', error);
    healthStatus.lightcurve = `connection_failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  const allServicesHealthy = healthStatus.backend === 'ok' && healthStatus.lightcurve === 'ok';
  
  return NextResponse.json(healthStatus, { 
    status: allServicesHealthy ? 200 : 503 
  });
}