'use client'

import React from 'react'
import { Info } from 'lucide-react'

const OtherMethodsPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">
      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Astrometry and Other Exoplanet Detection Methods — Expanding the Planet-Hunting Toolbox
        </h1>
        <div className="mb-6">
          <img 
            src="/Astrometry of Sun.PNG" 
            alt="Astrometry Method"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Most exoplanets today are discovered through the Transit and Radial Velocity methods. But astronomy is full of creative techniques — and sometimes, the most unusual approaches reveal the most fascinating worlds. From precise star tracking to radio pulses from dead stars, astronomers use a wide range of "backup" methods to broaden our view of planetary systems.
        </p>
      </div>

      {/* Astrometry */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Astrometry — Measuring the Tiny Wobble</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Astrometry is all about pinpoint accuracy. By measuring a star's position in the sky with extreme precision over long periods, astronomers can detect if it's being tugged by an orbiting planet.
        </p>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          These shifts are minuscule — often less than a milliarcsecond, about the width of a coin seen from thousands of kilometers away. Tracking this wobble allows astronomers to estimate a planet's mass, orbit, and distance.
        </p>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: Astrometry is one of the oldest proposed planet-hunting techniques. Before sensitive spectrographs made radial velocity practical, astronomers hoped astrometry would uncover exoplanets.
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Requires ultra-precise instruments.</li>
          <li>Works best for massive planets orbiting nearby stars.</li>
          <li>Today, missions like Gaia are finally providing the precision needed to discover thousands of new worlds.</li>
        </ul>
      </div>

      {/* Other Less Common Methods */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Other Less Common Methods</h2>

        {/* Timing Variations */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">Timing Variations</h3>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Pulsar Timing:</strong> Pulsars are precise cosmic clocks. A planet orbiting a pulsar subtly alters the timing of its radio pulses.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2 italic">
          Fun Fact: The first confirmed exoplanets (around pulsar PSR B1257+12, 1992) were found using this method.
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Transit Timing Variations (TTVs):</strong> Variations in a planet's transit timing can indicate gravitational tugs from other hidden planets.</li>
        </ul>

        {/* Eclipsing Binary Timing */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">Eclipsing Binary Timing</h3>
        <div className="my-4">
          <img 
            src="/Eclipsing Binary.PNG" 
            alt="Eclipsing Binary System"
            className="w-full h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Gravitational pull of planets can cause tiny variations in the timing of eclipses in binary star systems. Tracking these shifts lets astronomers infer the presence of orbiting planets.
        </p>

        {/* Polarimetry */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">Polarimetry</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Starlight becomes polarized when it scatters off a planet's atmosphere or clouds. Measuring this polarization provides hints about atmospheric composition and weather.
        </p>

        {/* Radio Emission */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">Radio Emission</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Some giant planets with strong magnetic fields emit detectable radio signals. Interactions between the planet's magnetic field and its star can create bursts of radio waves, revealing their presence.
        </p>
      </div>

      {/* Why These Methods Matter */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Why These Methods Matter</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Detect planets that transits and radial velocity can't reach.</li>
          <li>Provide complementary data (mass, orbit details, atmosphere clues).</li>
          <li>Reveal exotic systems like pulsar planets or planets in binary stars.</li>
        </ul>
        <p className="italic text-slate-400">
          Fun Fact: These niche methods often uncover the strangest worlds, proving that planets can form and survive in environments once thought impossible.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#2563EB] mr-2" />
          <h2 className="text-2xl font-semibold text-[#2563EB]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          Astrometry and alternative techniques expand the exoplanet hunter's toolbox. Though they discover fewer planets than main methods, they uncover hidden gems: pulsar worlds, rogue giants, and strange systems that defy expectations.
        </p>
        <p className="italic text-slate-400">
          Quick Thought: Sometimes the faintest signals — a wobble, a timing glitch, or a polarization flicker — are the keys to finding whole new worlds light-years away.
        </p>
      </div>
    </div>
  )
}

export default OtherMethodsPage