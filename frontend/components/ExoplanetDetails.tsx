'use client';
import { useEffect, useState } from 'react';

export default function ExoplanetDetails({ planetName }: { planetName: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          planetName.trim() === ''
            ? `/api/exoplanets` // all planets
            : `/api/exoplanet/${encodeURIComponent(planetName)}` // specific planet
        );
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        setError('Failed to fetch exoplanet data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [planetName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data found.</p>;

  // Show all planets
  if (planetName.trim() === '') {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">All Exoplanets</h2>
        <ul className="list-disc list-inside max-h-96 overflow-y-auto border p-2 rounded">
          {data.map((planet: any) => (
            <li key={planet.exoplanetID}>{planet.canonicalName}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Show specific planet details
  const { identifier, properties } = data;
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold">{identifier.canonicalName}</h2>
      <p><strong>Star Name:</strong> {identifier.starName}</p>
      <p><strong>RA:</strong> {identifier.ra}, <strong>DEC:</strong> {identifier.dec}</p>
      <h3 className="mt-2 font-semibold">Planet Properties:</h3>
      <ul className="list-disc list-inside">
        {Object.entries(properties).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value ? value.toString() : 'N/A'}</li>
        ))}
      </ul>
    </div>
  );
}
