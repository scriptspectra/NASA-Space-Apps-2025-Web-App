import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Check if table has data
    const count = await db.planet.count();
    if (count > 0) {
      const planets = await db.planet.findMany({ orderBy: { pl_name: "asc" } });
      return NextResponse.json(planets);
    }

    // Fetch NASA JSON only if table is empty
    const res = await fetch(
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_letter,discoverymethod,disc_year,pl_orbper,pl_rade,pl_bmasse,pl_eqt,pl_orbsmax,pl_orbeccen,pl_orbincl,st_teff,st_rad,st_mass,st_met,st_age,sy_dist+from+ps&format=json"
    );
    const data = await res.json();

    // Bulk insert with fallback for discoveryMethod
    await db.planet.createMany({
      data: data.map((planet: any) => ({
        pl_name: planet.pl_name,
        hostname: planet.hostname,
        pl_letter: planet.pl_letter,
        discoveryMethod: planet.discoverymethod ?? "Unknown", // fallback
        disc_year: planet.disc_year,
        pl_orbper: planet.pl_orbper,
        pl_rade: planet.pl_rade,
        pl_bmasse: planet.pl_bmasse,
        pl_eqt: planet.pl_eqt,
        pl_orbsmax: planet.pl_orbsmax,
        pl_orbeccen: planet.pl_orbeccen,
        pl_orbincl: planet.pl_orbincl,
        st_teff: planet.st_teff,
        st_rad: planet.st_rad,
        st_mass: planet.st_mass,
        st_met: planet.st_met,
        st_age: planet.st_age,
        sy_dist: planet.sy_dist,
        imageUrl: "https://via.placeholder.com/300x200?text=Exoplanet",
      })),
      skipDuplicates: true,
    });

    const planets = await db.planet.findMany({ orderBy: { pl_name: "asc" } });
    return NextResponse.json(planets);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
