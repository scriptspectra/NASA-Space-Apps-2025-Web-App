"use client";

import ExoplanetCard from "@/components/ExoplanetCard";
import { useEffect, useState } from "react";

interface Planet {
  pl_name: string;
  hostname: string;
  pl_rade: number | null;
  pl_orbper: number | null;
}

export default function ExoplanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const res = await fetch("/api/exoplanet_archive");
        const data = await res.json();
        setPlanets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanets();
  }, []);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Filter planets based on debounced search query
  const filteredPlanets = planets.filter((planet) =>
    planet.pl_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    planet.hostname.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="p-8 md:pl-25">
      <h1 className="text-3xl font-bold mb-6 text-center">Exoplanets</h1>

      {/* Search input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by planet or host..."
          className="border rounded-md px-4 py-2 w-full max-w-md focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Scrollable cards container */}
      <div className="h-[70vh] overflow-y-auto border rounded-lg p-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? // Skeleton placeholders
              Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-35 dark:bg-[#2A2A2A] bg-[#EAE8DE] rounded-lg animate-pulse"
                ></div>
              ))
            : filteredPlanets.length > 0
            ? filteredPlanets.map((planet) => (
                <ExoplanetCard key={planet.pl_name} planet={planet} />
              ))
            : Array.from({ length: 1 }).map((_, i) => (
                <p
                  key={i}
                  className="text-center h-full flex items-center justify-center col-span-full"
                >
                  No exoplanets found.
                </p>
              ))}
        </div>
      </div>
    </div>
  );
}
