'use client'

import React from 'react'
import { Globe, Orbit, Info } from 'lucide-react'

const DirectImagingPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Direct Imaging Method — Seeing Exoplanets with Our Own Eyes
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Most exoplanets are incredibly faint compared to their host stars. Imagine trying to spot a firefly buzzing around a lighthouse — from thousands of kilometers away. That’s the challenge astronomers face when they try to see planets outside our solar system. But with cutting-edge technology, they’ve managed to do something once thought impossible: directly capture images of exoplanets. This approach, known as the Direct Imaging Method, doesn’t just detect planets indirectly through wobbles or shadows — it allows us to actually see them as separate points of light.
        </p>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          <strong>Example:</strong> The HR 8799 star system, located about 130 light-years from Earth, features its central star and three directly imaged exoplanets (b, c, d) captured with infrared photography from the Palomar Observatory's Hale Telescope.
        </p>
      </div>

      {/* How It Works */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">How It Works</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Direct imaging relies on advanced techniques to cancel out the overwhelming brightness of stars:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Coronagraphy:</strong> A device inside the telescope blocks most of the starlight, like using your hand to block the Sun to see something faint nearby.</li>
          <li><strong>Adaptive Optics:</strong> Earth’s atmosphere blurs starlight. Adaptive optics corrects this distortion in real-time, making ground-based images sharper.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Once the star’s glare is suppressed, the faint glow of the planet — usually brightest in infrared — can be captured.
        </p>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: The first directly imaged exoplanets were spotted in 2008 around HR 8799, revealing three giant planets orbiting the same star.
        </p>
      </div>

      {/* Adaptive Optics */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Adaptive Optics — Correcting Earth’s Distorting Lens</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Earth’s atmosphere bends and distorts incoming starlight, making stars twinkle and planets blur. Adaptive optics (AO) solves this:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>A laser creates an artificial star in the sky.</li>
          <li>Instruments measure how it twinkles, revealing atmospheric distortions.</li>
          <li>A flexible mirror rapidly changes shape to cancel out distortions hundreds of times per second.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The result? Extremely sharp images where faint exoplanets can be distinguished next to their host stars.
        </p>
        <p className="italic text-slate-400">
          Fun Fact: Ground-based telescopes like the Very Large Telescope (VLT) in Chile can rival or surpass Hubble's sharpness with adaptive optics.
        </p>
      </div>

      {/* What We Can Learn */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">What We Can Learn</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Brightness & Color:</strong> Reveal temperature, chemistry, and atmosphere.</li>
          <li><strong>Orbits:</strong> Tracking position over years maps orbital paths.</li>
          <li><strong>Composition & Weather:</strong> Spectroscopy detects molecules like methane or water vapor, cloud layers, and even weather patterns.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: Many directly imaged planets are young and hot, glowing in infrared as they radiate leftover heat from formation.
        </p>
      </div>

      {/* Challenges */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Challenges and Limitations</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Extreme Contrast: A star is often a billion times brighter than its planet.</li>
          <li>Distance Limits: Works best for planets orbiting far from their stars.</li>
          <li>Planet Type: Young, massive planets are easiest to spot.</li>
          <li>Rarity: Only a few dozen planets have been directly imaged so far.</li>
        </ul>
      </div>

      {/* Advanced Insight */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Advanced Insight</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The flux (brightness) from a directly imaged planet can be approximated by:
        </p>
        <pre className="bg-slate-100 dark:bg-[#1F1F1F] p-4 rounded text-sm overflow-x-auto text-slate-800 dark:text-slate-200">
{`F_P = (R_P^2 / d^2) * B_λ(T_P)`}
        </pre>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Where: FP = observed flux from the planet, RP = planet radius, d = distance to system, Bλ(TP) = Planck function depending on planet temperature.
        </p>
      </div>

      {/* Why It Matters */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Why It Matters</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Unlike most methods that give indirect evidence, direct imaging provides actual visual confirmation. It allows us to study alien skies, clouds, and even weather systems light-years away.
        </p>
        <p className="italic text-slate-400">
          Exciting future missions like LUVOIR and HabEx aim to directly image Earth-like worlds in habitable zones. NASA’s JWST is already pushing these limits, with potential to study atmospheres of rocky planets near their stars.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#D4481E] mr-2" />
          <h2 className="text-2xl font-semibold text-[#D4481E]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          The Direct Imaging Method turns science fiction into science fact. By using clever instruments to block starlight, astronomers can capture the glow of distant planets. While limited to certain kinds of worlds today, the technique holds the promise of revealing planets with oceans, clouds, and maybe even signs of life.
        </p>
        <p className="italic text-slate-400">
          Quick Thought: The first image of another Earth-like planet may change how humanity sees its place in the universe — because for the first time, we’ll have seen a world that could look a lot like home.
        </p>
      </div>

    </div>
  )
}

export default DirectImagingPage
