'use client'

// app/page.tsx
import { useState } from 'react';
import ExoplanetDetails from '@/components/ExoplanetDetails';

export default function Home() {
  const [planet, setPlanet] = useState('kepler 1b');

  return (
    <div className="p-8 md:pl-25">
      <h1 className="text-3xl font-bold mb-4">Exoplanet Explorer</h1>

      <input
        type="text"
        value={planet}
        onChange={(e) => setPlanet(e.target.value)}
        placeholder="Enter exoplanet name"
        className="border p-2 rounded mb-4 w-full max-w-sm"
      />

      <ExoplanetDetails planetName={planet} />
    </div>
  );
}
