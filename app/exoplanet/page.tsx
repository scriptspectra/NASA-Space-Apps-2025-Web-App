"use client";

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

  if (loading) return <p className="p-8 text-center">Loading exoplanets...</p>;

  return (
    <div className="p-8 pl-25">
      <h1 className="text-3xl font-bold mb-6 text-center">Exoplanets</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {planets.map((p) => (
          <div
            key={p.pl_name}
            className="bg-gray-800 text-white rounded-xl shadow-lg p-6 hover:scale-105 transform transition duration-200"
          >
            <h2 className="text-xl font-bold mb-2">{p.pl_name}</h2>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Host Star:</span> {p.hostname}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Radius:</span> {p.pl_rade ?? "N/A"} Earth
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Orbital Period:</span> {p.pl_orbper ?? "N/A"} days
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
