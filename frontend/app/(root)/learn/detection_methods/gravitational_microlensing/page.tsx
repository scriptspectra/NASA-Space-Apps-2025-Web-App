'use client'

import React from 'react'
import { Info, Globe, Sparkles } from 'lucide-react'

const MicrolensingPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">
      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-2">
          Gravitational Microlensing Method — Using Gravity as a Cosmic Magnifying Glass
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <img 
            src="/Gravitational Microlensing.PNG" 
            alt="Gravitational Microlensing Diagram"
            className="w-full h-[300px] object-cover rounded-lg shadow-lg"
          />
          <img 
            src="/Gravitational Microlensing 2.jpg" 
            alt="Microlensing Event Example"
            className="w-full h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Some exoplanets are so distant, faint, or small that even our best telescopes cannot spot them directly. Fortunately, the universe itself provides a clever trick: gravity can bend light. This natural effect, predicted by Einstein's general theory of relativity, is called gravitational lensing. When the lensing effect is subtle and short-lived, we call it microlensing — and it has become one of the most powerful ways to detect otherwise invisible planets.
        </p>
      </div>

      {/* How It Works */}
      <div className="dark:bg-[#2A2A2A] bg-white p-6 rounded-md border-l-4 border-[#2563EB] shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">How It Works</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Imagine Earth, a distant background star, and a closer star that happens to pass in front of it. The gravity of the closer star bends the light of the background star, causing it to appear brighter for a short period of time. Now, if that closer star has a planet:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>The star's gravity creates a large, smooth magnification of the background light.</li>
          <li>The planet's gravity adds a small, sharp "blip" in the brightness curve.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          By carefully analyzing the shape of this light curve, astronomers can confirm the presence of a planet, estimate its mass, and determine its distance from its star.
        </p>
        <p className="italic text-slate-500">
          Interesting note: Microlensing is the only detection method that can reveal "free-floating" planets — lonely worlds drifting through the galaxy without a host star.
        </p>
      </div>

      {/* What Microlensing Reveals */}
      <div className="dark:bg-[#2A2A2A] bg-white p-6 rounded-md border-l-4 border-[#2563EB] shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">What Microlensing Reveals</h2>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-2">
          <li><strong>Planet Mass:</strong> The strength of the lensing signal depends on the mass of the planet.</li>
          <li><strong>Orbital Distance:</strong> It can reveal how far the planet orbits from its star.</li>
          <li><strong>Rogue Planets:</strong> Since no host star is needed, microlensing can detect planets wandering freely.</li>
          <li><strong>Planets at Great Distances:</strong> Can detect planets thousands of light-years away.</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 italic">
          Some microlensing events are extremely brief — lasting only a few hours — which is why astronomers must monitor the sky continuously to catch them.
        </p>
      </div>

      {/* Challenges and Limitations */}
      <div className="dark:bg-[#2A2A2A] bg-white p-6 rounded-md border-l-4 border-[#2563EB] shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Challenges and Limitations</h2>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-2">
          <li><strong>Precise Alignment Required:</strong> Earth, the background star, and the lensing star must line up almost perfectly.</li>
          <li><strong>One-Time Events:</strong> Each microlensing event is unique and cannot be repeated.</li>
          <li><strong>Limited Information:</strong> Reveals mass and distance but not planet size, density, or atmosphere.</li>
          <li><strong>Global Cooperation Needed:</strong> Worldwide telescope networks (OGLE, MOA) monitor events in real-time.</li>
        </ul>
      </div>

      {/* Gravitational Lensing Bigger Picture */}
      <div className="dark:bg-[#2A2A2A] bg-white p-6 rounded-md border-l-4 border-[#2563EB] shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Gravitational Lensing — The Bigger Picture</h2>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-2">
          <li><strong>Strong lensing:</strong> Multiple images, arcs, or Einstein rings of a background galaxy.</li>
          <li><strong>Weak lensing:</strong> Subtle distortions used to map dark matter.</li>
          <li><strong>Microlensing:</strong> Small-scale lensing caused by stars and their planets.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: The very first gravitational lens was discovered in 1979, confirming Einstein's predictions more than 60 years later!
        </p>
      </div>

      {/* Why It Matters */}
      <div className="dark:bg-[#2A2A2A] bg-white p-6 rounded-md border-l-4 border-[#2563EB] shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Why It Matters</h2>
        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-2">
          <li>Detects planets at large orbital distances.</li>
          <li>Finds cold, faint planets missed by other methods.</li>
          <li>Detects rogue planets without host stars.</li>
          <li>Probes galactic structure over vast distances.</li>
        </ul>
        <p className="italic text-slate-400">
          Gravitational microlensing is currently the best tool for studying cold, distant planets — helping scientists understand how planetary systems form and evolve.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white p-6 rounded-md border-l-4 border-[#2563EB] shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#2563EB] mr-2"/>
          <h2 className="text-2xl font-semibold text-[#2563EB]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          Gravitational microlensing turns Einstein's theory of gravity into a natural telescope. Even when a planet is invisible to direct observation, it can leave a faint but unmistakable signature in the light of a background star. Each microlensing event is like a cosmic lottery ticket, and every so often, it reveals a hidden planet — whether orbiting a star or wandering alone across the galaxy.
        </p>
      </div>
    </div>
  )
}

export default MicrolensingPage