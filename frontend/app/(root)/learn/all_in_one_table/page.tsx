'use client'

import React from 'react'

const DetectionMethodsPage = () => {
  const methods = [
    {
      method: 'Transit Method',
      how: 'Observes periodic dips in starlight when a planet passes in front of its star',
      best: 'Most exoplanets today; measures planet size, orbit',
      limit: 'Requires precise alignment; only detects planets that transit their stars',
      habitability: 'Allows detection of atmospheric signatures during transit, including water vapor, oxygen, methane',
    },
    {
      method: 'Radial Velocity (RV) Method',
      how: 'Measures Doppler shifts in a star’s spectrum caused by stellar wobble',
      best: 'Large planets close to stars; gives planet mass',
      limit: 'Inclination ambiguity; stellar activity; difficult for Earth-mass planets',
      habitability: 'Mass and density determination; helps infer potential surface conditions and atmosphere retention',
    },
    {
      method: 'Direct Imaging',
      how: 'Blocks starlight to directly capture planet light, often in infrared',
      best: 'Young, hot, massive planets far from star',
      limit: 'Brightness contrast; works best for distant planets; very few planets detected',
      habitability: 'Allows spectroscopy of planetary atmosphere, clouds, temperature; can detect molecules and weather patterns',
    },
    {
      method: 'Gravitational Microlensing',
      how: 'Uses gravity of a foreground star/planet to magnify light from a background star',
      best: 'Detects planets far from Earth; can find free-floating “rogue” planets',
      limit: 'Rare alignments; one-time events; limited info on atmosphere or size',
      habitability: 'Can reveal planets in cold, distant orbits; mass and distance estimation; potential for cold-habitable zone studies',
    },
    {
      method: 'Astrometry',
      how: 'Measures tiny positional changes of a star caused by orbiting planet',
      best: 'Massive planets around nearby stars; provides accurate orbit and mass',
      limit: 'Requires extreme precision; challenging for small planets',
      habitability: 'Determines orbit, mass; complements other methods for habitability studies',
    },
    {
      method: 'Pulsar Timing / Timing Variations',
      how: 'Measures variations in timing of pulses or transits',
      best: 'Planets around pulsars or multi-planet systems',
      limit: 'Only applicable to specific stars; very rare',
      habitability: 'Identifies exotic planetary systems; possible study of extreme environments for life',
    },
    {
      method: 'Eclipsing Binary Timing',
      how: 'Observes timing variations in eclipsing binary stars',
      best: 'Planets around binary stars',
      limit: 'Limited to binary systems; rare',
      habitability: 'Helps understand habitability in complex stellar environments',
    },
    {
      method: 'Polarimetry',
      how: 'Measures polarization of starlight affected by planet',
      best: 'Detects clouds or atmospheric particles',
      limit: 'Requires sensitive instruments; subtle signals',
      habitability: 'Can hint at atmospheric composition, clouds, hazes',
    },
    {
      method: 'Radio Emission',
      how: 'Detects radio waves emitted by planets interacting with magnetic fields',
      best: 'Giant planets with strong magnetic fields',
      limit: 'Only works for strong magnetic systems; faint',
      habitability: 'Provides clues about magnetic fields and protection from stellar radiation, important for habitability',
    },
  ]

  const keyNotes = [
    'Transit + RV combined → Gives both size and mass → planet density → composition → habitability potential.',
    'Spectroscopy (transmission, emission, reflection) → Detects atmospheric gases and potential biosignatures (oxygen, methane, water).',
    'Direct imaging → Visual confirmation + atmospheric studies + weather patterns.',
    'Gravitational microlensing → Expands detection to distant and rogue planets.',
    'Astrometry & Timing → Useful for unique systems and long-period planets.',
  ]

  return (
    <div className="p-6 md:pl-24 space-y-8">
      <h1 className="md:text-4xl text-3xl font-bold mb-4">
        Master Table of Exoplanet Detection Methods, Habitability Insights, and Biosignature Potential
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#2563EB] text-white">
              <th className="p-3 text-left">Detection Method</th>
              <th className="p-3 text-left">How It Works</th>
              <th className="p-3 text-left">Best For / Strengths</th>
              <th className="p-3 text-left">Limitations / Challenges</th>
              <th className="p-3 text-left">Habitability & Biosignature Insights</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-white dark:bg-[#2A2A2A]' : 'bg-[#F9F9F9] dark:bg-[#1E1E1E]'}
              >
                <td className="p-3 border-b border-slate-200 dark:border-slate-700">{m.method}</td>
                <td className="p-3 border-b border-slate-200 dark:border-slate-700">{m.how}</td>
                <td className="p-3 border-b border-slate-200 dark:border-slate-700">{m.best}</td>
                <td className="p-3 border-b border-slate-200 dark:border-slate-700">{m.limit}</td>
                <td className="p-3 border-b border-slate-200 dark:border-slate-700">{m.habitability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Notes */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Key Notes</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
          {keyNotes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DetectionMethodsPage