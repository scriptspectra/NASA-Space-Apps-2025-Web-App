'use client'

import React from 'react'

const HabitabilityPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Habitability and Atmospheric Clues — Searching for Life Beyond Earth
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Finding an exoplanet is exciting, but discovering whether it could support life is even more fascinating. Scientists assess habitability by looking at conditions such as water availability, atmosphere, temperature, and magnetic protection. Spectroscopy allows us to peek into alien skies and detect signs that a planet could be hospitable or even host life.
        </p>
      </div>

      {/* Key Habitability Factors */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Key Habitability Factors</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Habitable Zone (HZ):</strong> The orbital region where liquid water can exist. Too close → water evaporates; too far → water freezes.</li>
          <li><strong>Planet Size & Composition:</strong> Rocky planets are more likely to support life than gas giants.</li>
          <li><strong>Atmosphere:</strong> Stabilizes temperature, protects from radiation, and supports chemical cycles.</li>
          <li><strong>Magnetic Field:</strong> Shields against stellar wind and cosmic radiation.</li>
          <li><strong>Stellar Activity:</strong> Frequent flares can threaten life; quiet stars are better candidates.</li>
        </ul>
      </div>

      {/* Atmospheric Analysis */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Atmospheric Analysis — Detecting Biosignatures</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Using spectroscopy, astronomers analyze starlight that passes through or reflects off a planet’s atmosphere. They look for chemical fingerprints that indicate habitability or life:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Water vapor (H₂O):</strong> Essential for life as we know it.</li>
          <li><strong>Oxygen (O₂):</strong> Could suggest photosynthetic life.</li>
          <li><strong>Methane (CH₄):</strong> Can indicate biological or geological activity.</li>
          <li><strong>Carbon dioxide (CO₂):</strong> Important for climate regulation and potential habitability.</li>
          <li><strong>Ozone (O₃):</strong> Protects surface life from harmful UV radiation.</li>
        </ul>
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

export default HabitabilityPage
