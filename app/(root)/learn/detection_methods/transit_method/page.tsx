'use client'

import React from 'react'
import { Globe, Search, Orbit, Calendar, Info } from 'lucide-react'

const Page = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">
      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Transit Method — The Most Successful Way to Find Exoplanets
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Imagine watching a tiny moth drift across a glowing lightbulb. For just a moment, the light dims — then returns to normal. This simple phenomenon is at the heart of one of the most powerful techniques in modern astronomy.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          The transit method allows scientists to detect distant exoplanets by observing slight, periodic dips in a star’s brightness as a planet passes in front of it. It’s a deceptively simple idea — and yet, it has led to the discovery of the vast majority of known exoplanets.
        </p>
      </div>

      {/* How It Works */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">How It Works</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A transit occurs when a planet’s orbit is perfectly aligned with our line of sight from Earth, so that the planet crosses directly in front of its star. When this happens:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>The planet blocks a tiny fraction of the star’s light, causing a small but measurable dip in brightness.</li>
          <li>Astronomers record this change over time, creating a light curve — a graph showing how the star’s brightness varies.</li>
          <li>If the dips repeat at regular intervals, it’s a strong sign that a planet is orbiting the star.</li>
          <li>The depth, duration, and timing of the dip reveal key details about the planet, including its size, orbital period, and hints of its atmosphere.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          It’s an astonishingly precise technique. The amount of dimming caused by an Earth-sized planet passing in front of a Sun-like star is often less than 1% — roughly like a mosquito flying across a car’s headlight 100 kilometers away.
        </p>
      </div>

      {/* What We Learn */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">What We Can Learn from a Transit</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Planet size:</strong> The depth of the dip is proportional to the planet’s size. A larger dip means a larger planet.</li>
          <li><strong>Orbital period:</strong> The time between repeated dips tells us how long the planet takes to complete one orbit.</li>
          <li><strong>Distance from the star:</strong> Once the orbital period is known, Kepler’s Third Law can be used to calculate the planet’s distance from its star.</li>
          <li><strong>Atmospheric composition:</strong> During a transit, some starlight filters through the planet’s atmosphere. Transmission spectroscopy reveals molecules like water vapor, methane, carbon dioxide, and possible biosignatures.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          This is why the transit method isn’t just about finding exoplanets — it’s also about characterizing them.
        </p>
      </div>

      {/* Light Curve */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">A Typical Transit Light Curve</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A transit event produces a distinctive light curve that unfolds in four main stages:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Normal brightness:</strong> The star’s light remains steady before the planet begins to cross.</li>
          <li><strong>Ingress:</strong> The planet starts to move in front of the star, causing a gradual dip.</li>
          <li><strong>Flat bottom:</strong> The planet is fully silhouetted against the star, producing maximum dimming.</li>
          <li><strong>Egress:</strong> The planet exits the star’s disk, and the brightness returns to normal.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          By studying the subtle features of this curve, astronomers can sometimes detect additional phenomena — such as planetary rings, exomoons, or multiple planets tugging on each other’s orbits.
        </p>
      </div>

      {/* Real-Life Discoveries */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Real-Life Discoveries</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The Kepler Space Telescope (2009–2018) continuously monitored over 150,000 stars and discovered more than 2,700 confirmed exoplanets. Its successor, TESS, launched in 2018, is now scanning nearly the entire sky. Today, about 75% of all known exoplanets have been discovered using the transit method — making it the undisputed champion of planet-hunting.
        </p>
      </div>

      {/* Challenges */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Challenges and Limitations</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Geometric alignment:</strong> Only a small fraction of planetary systems are aligned for a transit.</li>
          <li><strong>False positives:</strong> Starspots, eclipsing binaries, or instrumental noise can mimic a transit.</li>
          <li><strong>Incomplete information:</strong> Transit data alone reveal size but not mass; combining with radial velocity is often needed to calculate density and composition.</li>
        </ul>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#D4481E] mr-2" />
          <h2 className="text-2xl font-semibold text-[#D4481E]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          The transit method turns tiny, almost imperceptible dips in starlight into rich scientific insights. It has allowed astronomers to measure planets’ sizes, map their orbits, probe their atmospheres, and even search for signs of habitability — all from light-years away.
        </p>
        <p className="italic text-slate-400">
          Somewhere out there, a distant star might dim ever so slightly, revealing a planet with oceans, continents, and maybe even life — all hidden in a flicker of starlight.
        </p>
      </div>
    </div>
  )
}

export default Page
