'use client'

import React from 'react'
import { Globe, Orbit, Info } from 'lucide-react'

const Page = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">
      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Radial Velocity Method — Detecting the Wobble of Stars
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Not all exoplanets can be seen directly. In fact, most are too faint and too close to their stars to be observed with conventional telescopes. But planets are not entirely invisible. Every planet exerts a gravitational pull on its host star, causing the star to move in a tiny orbit around the system’s center of mass. This subtle motion, known as a stellar wobble, is the foundation of the Radial Velocity (RV) Method, one of the earliest and most successful techniques for discovering exoplanets.
        </p>
      </div>

      {/* How It Works */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">How It Works</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A planet’s gravitational pull causes its star to oscillate slightly. As the star moves:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Toward Earth:</strong> The star’s light is shifted toward shorter wavelengths (blueshift).</li>
          <li><strong>Away from Earth:</strong> The light shifts toward longer wavelengths (redshift).</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          By precisely measuring these shifts in the star’s spectral lines over time, astronomers can detect the presence of a planet, estimate its mass, and characterize its orbital properties. Larger, closer planets induce stronger wobbles, making them easier to detect.
        </p>
        <p className="italic text-slate-400">
          Historical Note: The first planet discovered around a Sun-like star, 51 Pegasi b in 1995, was identified using this method, revealing an entirely new world.
        </p>
      </div>

      {/* What We Can Learn */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">What We Can Learn from Radial Velocity</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Minimum Mass:</strong> The amplitude of the star’s wobble relates to the planet’s mass. Larger wobbles = more massive planets.</li>
          <li><strong>Orbital Period:</strong> The time between wobbles indicates how long the planet takes to complete one orbit.</li>
          <li><strong>Orbital Shape:</strong> The waveform reveals the orbit’s eccentricity and, with additional data, its inclination.</li>
          <li><strong>Multi-Planet Systems:</strong> Overlapping wobbles can indicate multiple planets orbiting the same star.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Some “hot Jupiters” were first detected with RV because their proximity to their stars causes extremely large wobbles — sometimes exceeding 50 m/s.
        </p>
      </div>

      {/* Challenges and Limitations */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Challenges and Limitations</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Inclination Ambiguity:</strong> RV only measures motion along the line of sight, so the true planet mass may be higher than measured.</li>
          <li><strong>Stellar Activity:</strong> Starspots, flares, and pulsations can mimic or obscure planetary signals.</li>
          <li><strong>Sensitivity Requirements:</strong> Detecting Earth-mass planets requires precision better than 1 m/s — a technical challenge pushing instrumentation to its limits.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Modern spectrographs like HARPS and ESPRESSO can detect RV shifts smaller than the speed of a crawling snail (&lt;1 m/s), enabling discovery of smaller and more distant planets.
        </p>
      </div>

      {/* Theoretical Insight */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Theoretical Insight</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The radial velocity of a star influenced by a planet can be modeled as:
        </p>
        <pre className="bg-slate-100 dark:bg-[#1F1F1F] p-4 rounded text-sm overflow-x-auto text-slate-800 dark:text-slate-200">
{`Vr(t) = K [cos(θ(t) + ω) + e cos ω]`}
        </pre>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Where:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Vr(t) = radial velocity of the star at time t</li>
          <li>K = velocity amplitude (depends on planet mass and orbital distance)</li>
          <li>θ(t) = true anomaly (star’s position in its orbit)</li>
          <li>ω = argument of periastron (orbit orientation)</li>
          <li>e = orbital eccentricity</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Fitting observed spectral shifts to this model allows astronomers to derive precise planetary parameters, including mass, orbital shape, and period.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#D4481E] mr-2" />
          <h2 className="text-2xl font-semibold text-[#D4481E]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          The radial velocity method transforms subtle stellar wobbles into powerful clues about the existence of planets. It excels at detecting massive planets near their stars and complements the transit method: transit gives size, RV gives mass, allowing density and composition calculations.
        </p>
        <p className="italic text-slate-400">
          Even when planets remain invisible to telescopes, their gravitational influence can be detected across light-years, revealing a hidden cosmic dance and expanding our understanding of planetary systems.
        </p>
      </div>
    </div>
  )
}

export default Page
