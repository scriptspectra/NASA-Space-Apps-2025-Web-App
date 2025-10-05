// app/api/exoplanets/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`https://exo.mast.stsci.edu/api/v0.1/exoplanets`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
