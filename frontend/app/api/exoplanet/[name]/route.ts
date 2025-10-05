// app/api/exoplanet/[name]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const { name } = params;

  try {
    // Fetch identifiers for a specific planet
    const idRes = await fetch(
      `https://exo.mast.stsci.edu/api/v0.1/exoplanets/identifiers/?name=${encodeURIComponent(
        name
      )}`
    );
    if (!idRes.ok) throw new Error('Failed to fetch identifiers');
    const idData = await idRes.json();

    // Fetch properties using canonical name
    const propRes = await fetch(
      `https://exo.mast.stsci.edu/api/v0.1/exoplanets/${encodeURIComponent(
        idData.canonicalName
      )}/properties`
    );
    if (!propRes.ok) throw new Error('Failed to fetch properties');
    const propData = await propRes.json();

    return NextResponse.json({ identifier: idData, properties: propData });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
