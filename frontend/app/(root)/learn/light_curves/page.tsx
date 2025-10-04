'use client'

import React from 'react'
import { Info } from 'lucide-react'

const LightCurvesPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Light Curves and Data Analysis — Reading the Fingerprints of Distant Worlds
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          When astronomers search for exoplanets, they spend countless hours studying graphs — one of the most powerful being the light curve. This plot of brightness versus time unlocks a revolution in planetary science, letting us measure size, orbit, atmosphere, and even hidden companions of faraway worlds. Every exoplanet found with the transit method begins with one of these curves.
        </p>
      </div>

      {/* What is a Light Curve */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">What Is a Light Curve?</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A light curve is a graph showing how a star’s brightness changes over time. For most stars, brightness is steady. But when a planet passes in front of its star, the light dips slightly, creating a distinct U-shaped or box-shaped signature.
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Depth of dip:</strong> How much light is blocked — reveals the planet’s size.</li>
          <li><strong>Frequency of dips:</strong> How often they repeat — gives the orbital period.</li>
          <li><strong>Duration:</strong> How long the dip lasts — provides clues about orbital distance and speed.</li>
          <li><strong>Shape of the curve:</strong> Slopes or asymmetries — hints at extra planets, moons, or rings.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun fact: If Earth transited the Sun, the brightness drop would be only about 0.008%, like detecting your room dimming when a mosquito crosses a flashlight beam 100 km away.
        </p>
      </div>

      {/* Anatomy of a Transit Light Curve */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Anatomy of a Transit Light Curve</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Out-of-Transit:</strong> brightness steady.</li>
          <li><strong>Ingress:</strong> planet starts crossing the star, brightness begins to dip.</li>
          <li><strong>Mid-Transit:</strong> planet fully in front, brightness at its lowest.</li>
          <li><strong>Egress:</strong> planet moves off the star, brightness rises.</li>
          <li><strong>Repeat:</strong> the cycle recurs after one orbit.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          These repeating patterns act like fingerprints, confirming the presence of planets.
        </p>
      </div>

      {/* What Light Curves Can Reveal */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">What Light Curves Can Reveal</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Planet radius — bigger dips = bigger planets.</li>
          <li>Orbital distance — longer intervals between dips = wider orbits.</li>
          <li>Planetary density — combining with radial velocity gives density and composition.</li>
          <li>Atmosphere — starlight passing through a planet’s atmosphere carries chemical signatures.</li>
          <li>Additional bodies — irregularities can reveal moons, rings, or multiple planets.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun fact: Exomoon detection is an exciting frontier; strange wiggles in light curves sometimes hint at these elusive moons.
        </p>
      </div>

      {/* Advanced Insights */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Advanced Insights: Beyond Simple Transits</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Starspot Mapping:</strong> Planet passing in front of dark starspots creates tiny bumps, revealing stellar activity.</li>
          <li><strong>Eclipse Mapping:</strong> Brightness changes during secondary eclipses map temperature patterns on hot Jupiters.</li>
          <li><strong>Phase Curves:</strong> Brightness variations over an orbit reveal day–night temperature contrasts and atmospheric circulation.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Theoretical models like Mandel & Agol (2002) help fit observed curves with parameters such as planet-to-star size ratio, orbital inclination, and limb darkening, allowing scientists to extract precise planetary properties.
        </p>
      </div>

      {/* Challenges */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Challenges in Light Curve Analysis</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Stellar activity — starspots, flares, pulsations.</li>
          <li>Instrumental errors — small quirks in telescopes.</li>
          <li>Earth’s atmosphere — turbulence adds distortions for ground-based observations.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Astronomers use detrending, normalization, and filtering to separate signal from noise. Without careful cleaning, false positives or missed planets are common.
        </p>
      </div>

      {/* From Light Curve to Discovery */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">From Light Curve to Discovery</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Traditional algorithms confirm periodic dips.</li>
          <li>Machine learning models classify signals as genuine planets or impostors.</li>
          <li>Atmospheric analysis studies starlight filtered through a planet’s atmosphere.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun fact: The first Earth-sized planet in a habitable zone, Kepler-186f, was discovered in 2014 thanks to light curve analysis.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#D4481E] mr-2" />
          <h2 className="text-2xl font-semibold text-[#D4481E]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          Light curves are the unsung heroes of modern astronomy, turning subtle dips in brightness into revelations about planets hundreds of light-years away. They bridge raw telescope data and the discovery of new Earths, systems, and insights into planetary formation and evolution.
        </p>
        <p className="italic text-slate-400">
          Quick thought: The next time you see a light curve, remember — somewhere in that dip might lie a hidden Earth, waiting to be noticed.
        </p>
      </div>

    </div>
  )
}

export default LightCurvesPage
