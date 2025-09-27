import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Check if table has data
    const count = await db.planet.count();
    if (count > 0) {
      // Already populated, fetch from DB
      const planets = await db.planet.findMany({ orderBy: { pl_name: "asc" } });
      return NextResponse.json(planets);
    }

    // Fetch NASA JSON only if table is empty
    const res = await fetch(
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_rade,pl_orbper+from+ps&format=json"
    );
    const data = await res.json();

    // Bulk insert/upsert using createMany with skipDuplicates
    await db.planet.createMany({
      data: data.map((planet: any) => ({
        pl_name: planet.pl_name,
        hostname: planet.hostname,
        pl_rade: planet.pl_rade,
        pl_orbper: planet.pl_orbper,
      })),
      skipDuplicates: true, // avoids inserting duplicates
    });

    // Return the newly inserted data
    const planets = await db.planet.findMany({ orderBy: { pl_name: "asc" } });
    return NextResponse.json(planets);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
