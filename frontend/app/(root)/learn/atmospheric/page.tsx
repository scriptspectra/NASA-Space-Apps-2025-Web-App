'use client'

import React from 'react'
import { Info } from 'lucide-react'

const AtmospherePage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Atmospheric Analysis and Spectroscopy — Peeking into Alien Skies
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Finding an exoplanet is thrilling, but uncovering the composition of its atmosphere is where things get truly fascinating. By studying exoplanet atmospheres, astronomers can evaluate habitability, search for potential biosignatures, and even understand planetary evolution.
        </p>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The key tool for this is spectroscopy — a technique that splits light into its component colors, revealing the chemical fingerprints of atoms and molecules.
        </p>
      </div>

      {/* How Spectroscopy Works */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">How Spectroscopy Works</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Every atom or molecule absorbs and emits light at characteristic wavelengths. When starlight passes through a planet’s atmosphere (or reflects off its surface), certain wavelengths are absorbed by atmospheric gases. By analyzing these absorption patterns, astronomers can determine:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Which gases are present</li>
          <li>The density of the atmosphere</li>
          <li>Clues about temperature and pressure</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          This is analogous to analyzing fingerprints: each molecule leaves a unique signature in the light.
        </p>
      </div>

      {/* Types of Spectroscopy */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Types of Spectroscopy for Exoplanets</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Transmission Spectroscopy:</strong> Observes starlight filtered through a planet’s atmosphere during transit, detecting molecules like water vapor, carbon dioxide, and methane.</li>
          <li><strong>Emission Spectroscopy:</strong> Measures light emitted directly by the planet (especially infrared) to study temperature, weather patterns, and heat distribution.</li>
          <li><strong>Reflection Spectroscopy:</strong> Observes light reflected off the planet’s surface or clouds, revealing surface features and potentially oceans or vegetation-like pigments.</li>
        </ul>
      </div>

      {/* What We Can Learn */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">What We Can Learn</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Atmospheric composition: Oxygen, carbon dioxide, methane, water vapor, and other gases</li>
          <li>Temperature and weather: Hot Jupiters can have scorching daysides and freezing nightsides</li>
          <li>Clouds and hazes: Dense atmospheres can obscure chemical signatures</li>
          <li>Biosignatures: Combinations like oxygen with methane could indicate biological activity</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Notably, in 2022, the James Webb Space Telescope detected water vapor in a hot Jupiter's atmosphere, demonstrating the precision now possible in studying distant worlds.
        </p>
      </div>

      {/* Challenges */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Challenges in Atmospheric Analysis</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Weak signals: Planet light is billions of times fainter than the host star</li>
          <li>Stellar noise: Variability from starspots or flares can confuse data</li>
          <li>Clouds and hazes: Some atmospheres hide their chemical fingerprints</li>
          <li>Distance and size: Small, Earth-like planets are much harder to analyze than giant gas planets</li>
        </ul>
      </div>

      {/* Why It Matters */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Why It Matters</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Studying exoplanet atmospheres allows scientists to:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Identify potentially habitable worlds</li>
          <li>Compare planetary climates and evolutionary history</li>
          <li>Understand planet-star interactions</li>
          <li>Detect signs of life beyond Earth</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          The first evidence of extraterrestrial life may come from subtle patterns of gases in the atmosphere of a distant planet, revealed through the power of light.
        </p>
      </div>

      {/* Optional Advanced Insight */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Advanced Insight (Optional)</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          For readers interested in technical details, the observed spectrum F(λ) of a planet’s atmosphere is analyzed using:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>F_star(λ) is the star’s light at wavelength λ</li>
          <li>τ(λ) is the optical depth of the planet’s atmosphere</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Peaks and dips in F(λ) reveal the presence of specific molecules — the foundation for both transmission and emission spectroscopy in exoplanet research.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-slate-300 dark:border-slate-700 text-left">
          <thead className="bg-slate-200 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2 border border-slate-300 dark:border-slate-700">Habitability Factor</th>
              <th className="px-4 py-2 border border-slate-300 dark:border-slate-700">Why It Matters</th>
              <th className="px-4 py-2 border border-slate-300 dark:border-slate-700">Atmospheric Clues & Biosignatures</th>
              <th className="px-4 py-2 border border-slate-300 dark:border-slate-700">How We Detect It</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Liquid Water</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Solvent for biological chemistry</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">H₂O vapor in the atmosphere</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Transmission/Emission Spectroscopy</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Rocky Surface</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Supports stable land & oceans</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Surface reflectance; planet density</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Light Curves + Radial Velocity</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Temperature & Climate</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Permits stable liquid water</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">CO₂, H₂O, CH₄ levels, thermal emission</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Spectroscopy & Direct Imaging</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Atmospheric Protection</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Shields life from radiation</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">O₃, N₂, atmospheric thickness</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Transmission/Reflection Spectroscopy</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Chemical Signatures of Life</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Suggests biological activity</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">O₂ + CH₄ together, unusual gas ratios</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Spectroscopy</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Magnetic Field</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Protects atmosphere from stellar winds</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Indirect: aurora emissions, radio signals</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Radio Emission & Modeling</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Stellar Stability</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Reduces sterilizing flares</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Star characterization (X-ray, UV output)</td>
              <td className="px-4 py-2 border border-slate-300 dark:border-slate-700">Stellar Observation</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AtmospherePage
