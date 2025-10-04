interface Planet {
  pl_name: string;
  hostname: string;
  pl_rade: number | null;
  pl_orbper: number | null;
}

interface ExoplanetCardProps {
  planet: Planet;
}

export default function ExoplanetCard({ planet }: ExoplanetCardProps) {
  const formatRadius = (radius: number | null) => {
    if (!radius) return "Unknown";
    return radius.toFixed(2);
  };

  const formatOrbitalPeriod = (period: number | null) => {
    if (!period) return "Unknown";
    if (period < 1) return `${(period * 24).toFixed(1)} hours`;
    if (period > 365) return `${(period / 365.25).toFixed(1)} years`;
    return `${period.toFixed(1)} days`;
  };

  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 w-full" style={{backgroundColor: '#f5f5f5'}}>
      {/* Image placeholder */}
      
      {/* Content */}
      <div className="p-4 dark:bg-[#383838] bg-[#E2E1DC]" >
        <h2 className="text-lg font-medium dark:text-white text-black mb-1">{planet.pl_name}</h2>
        
        <p className="text-sm mb-2 dark:text-[#CD6E51] text-[#960D10] font-bold">
          host star: {planet.hostname}
        </p>
        
        <div className="space-y-1 text-sm dark:text-white text-black">
          <p>radius: {formatRadius(planet.pl_rade)} km</p>
          <p>orbital period: {formatOrbitalPeriod(planet.pl_orbper)}</p>
        </div>
      </div>
    </div>
  );
}