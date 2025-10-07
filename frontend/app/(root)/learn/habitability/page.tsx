'use client'

import React from 'react'
import { Info } from 'lucide-react'

const HabitabilityPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Habitability and Life Potential — Searching for the Next Earth
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          For as long as humans have gazed at the stars, one question has echoed in our minds: Are we alone? Modern exoplanet science is largely driven by that mystery, and at its heart lies the study of habitability — the investigation of whether distant worlds could provide the right conditions for life.
        </p>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A habitable planet is not necessarily one that hosts life, but one that could. The basic requirement for habitability is the presence of liquid water. Water is vital because it dissolves nutrients for biochemical reactions, regulates temperature, and provides a stable environment for complex chemistry.
        </p>
        <p className="italic text-slate-400 mb-2">
          There are more planets in the universe than grains of sand on all of Earth’s beaches combined. With odds like that, it seems unlikely Earth is the only world with life.
        </p>
      </div>

      {/* Habitable Zone */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">The Habitable Zone — The “Goldilocks” Region</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The Habitable Zone (HZ), also known as the Goldilocks Zone, is the orbital region around a star where conditions are “just right” for liquid water to exist:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Too close → water boils away</li>
          <li>Too far → water freezes solid</li>
          <li>Just right → water stays liquid</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Example: The exoplanet Kepler-452b is often called “Earth’s cousin” because it orbits in the habitable zone of a star very much like our Sun.
        </p>
      </div>

      {/* Key Factors */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Beyond Location: Key Factors for Habitability</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Planet Size and Composition:</strong> Rocky planets are better candidates than gas giants. Too small, and a planet loses its atmosphere; too large, and it risks becoming a gas giant.</li>
          <li><strong>Atmosphere:</strong> A protective atmosphere regulates temperature, shields against radiation, and enables essential chemistry. Earth’s oxygen-rich air exists because ancient microbes released oxygen billions of years ago.</li>
          <li><strong>Presence of Water:</strong> Astronomers search for oceans or water vapor in planetary atmospheres. Reflective oceans or “glint” could even be detectable.</li>
          <li><strong>Magnetic Field:</strong> Shields a planet from stellar winds that can strip away the atmosphere. Mars lost much of its air after its magnetic field faded.</li>
          <li><strong>Stellar Activity:</strong> Flaring stars, especially red dwarfs, bombard nearby planets with radiation, making life more challenging despite their habitable zones.</li>
        </ul>
      </div>

      {/* Biosignatures */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Searching for Biosignatures</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A planet may be habitable, but how do we know if it’s inhabited? Biosignatures are measurable signs of life’s activity:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Gases in unusual ratios, like oxygen and methane together</li>
          <li>Seasonal changes in surface reflectivity (possible vegetation cycles)</li>
          <li>Unique light reflections suggesting oceans or plant life</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Space telescopes such as the James Webb Space Telescope (JWST) and future missions like LUVOIR aim to peer into exoplanet atmospheres in search of these subtle signatures.
        </p>
        <p className="italic text-slate-400 mb-2">
          The very first confirmed exoplanets weren’t around Sun-like stars at all, but a pulsar. While not habitable, this shows how diverse planetary systems can be.
        </p>
      </div>

      {/* Life in Extreme Places */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Beyond Earth-like: Life in Strange Places</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Methane-rich lakes like Titan</li>
          <li>High-temperature atmospheres</li>
          <li>Subsurface oceans beneath thick ice crusts like Europa or Enceladus</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          This challenges us to imagine forms of life adapted to extreme chemistry or physics.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#2563EB] mr-2" />
          <h2 className="text-2xl font-semibold text-[#2563EB]">The Big Picture</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The search for habitability isn’t just about finding another Earth — it’s about expanding our understanding of what it means to be alive. Every exoplanet discovered adds a new piece to the puzzle, showing nature’s inventiveness and diversity.
        </p>
        <p className="italic text-slate-400">
          Final thought: The first evidence of alien life might not come from spaceships or radio signals, but from a faint fingerprint of molecules in the atmosphere of a tiny dot of light orbiting a distant star.
        </p>
      </div>

    </div>
  )
}

export default HabitabilityPage
