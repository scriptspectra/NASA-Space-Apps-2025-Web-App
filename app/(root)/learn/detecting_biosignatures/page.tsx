'use client'

import React from 'react'

const BiosignaturesPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Detecting Biosignatures — Signs of Life on Distant Worlds
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Finding a planet in the habitable zone is exciting, but the ultimate question is: Is there life there? Astronomers search for biosignatures — measurable indicators that life might exist or has existed on a planet. Biosignatures are like fingerprints of life, and detecting them from light-years away requires careful observation and sophisticated techniques.
        </p>
      </div>

      {/* What Are Biosignatures */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">What Are Biosignatures?</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          A biosignature is any substance, pattern, or signal in a planet’s atmosphere, surface, or light that could indicate life. Common examples include:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Gases out of equilibrium:</strong> Oxygen, methane, ozone, nitrous oxide, or combinations that wouldn’t naturally coexist without biological processes.</li>
          <li><strong>Surface features:</strong> Vegetation-like reflectance patterns (the “red edge” effect from plants).</li>
          <li><strong>Temporal changes:</strong> Seasonal variations in gas levels or surface reflectivity.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Earth itself would be detectable as a “living planet” from light-years away, thanks to its oxygen-rich atmosphere and seasonal vegetation cycles.
        </p>
      </div>

      {/* How Biosignatures Are Detected */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">How Biosignatures Are Detected</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li><strong>Transmission Spectroscopy:</strong> Observes starlight passing through a planet’s atmosphere during a transit. Absorption lines reveal molecules like water vapor, oxygen, or methane.</li>
          <li><strong>Emission and Reflection Spectroscopy:</strong> Measures light emitted or reflected by a planet, revealing temperature, cloud coverage, and chemical imbalances caused by life.</li>
          <li><strong>Surface Imaging and Photometry:</strong> Advanced future telescopes may detect color variations indicating vegetation or oceans. The “red edge” of chlorophyll — a sharp increase in reflectance around 700 nm — could indicate plant-like life.</li>
        </ul>
      </div>

      {/* Key Biosignature Combinations */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Key Biosignature Combinations</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          No single molecule proves life exists. Scientists look for pairs or combinations of gases that suggest biological activity:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
          <li><strong>Oxygen + Methane:</strong> Both gases would normally react and cancel out; their coexistence hints at life.</li>
          <li><strong>Nitrous Oxide + Ozone:</strong> May indicate microbial activity.</li>
          <li><strong>Water + Carbon Dioxide:</strong> Necessary for life-supporting chemistry.</li>
        </ul>
      </div>

      {/* Challenges */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Challenges in Detecting Biosignatures</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
          <li><strong>False positives:</strong> Geological or photochemical processes can produce some biosignature gases.</li>
          <li><strong>Distance and faint signals:</strong> Exoplanet light is extremely weak compared to its star.</li>
          <li><strong>Clouds and hazes:</strong> Can obscure atmospheric gases.</li>
          <li><strong>Technological limits:</strong> Only large planets or nearby stars can be studied with current instruments.</li>
        </ul>
      </div>

      {/* Advanced Insight */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Advanced Insight</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Scientists quantify potential biosignatures using the biosignature detectability index (BDI): <br />
          <strong>BDI = S<sub>bio</sub> / (S<sub>noise</sub> + S<sub>stellar</sub>)</strong>
        </p>
        <p className="text-slate-700 dark:text-slate-300 mt-2">
          Where S<sub>bio</sub> is the signal strength of the biosignature molecule, S<sub>noise</sub> is instrumental and background noise, and S<sub>stellar</sub> is contamination from the star. A higher BDI indicates a more detectable biosignature in the spectrum.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#D4481E] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#D4481E] mb-2">Why Biosignatures Matter</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Detecting biosignatures is the first step in answering humanity’s oldest question: Are we alone? Even indirect evidence could revolutionize our understanding of biology, chemistry, and planetary evolution. Some scientists predict that the first confirmed evidence of extraterrestrial life may come from biosignature gases, not alien messages or probes.
        </p>
        <p className="text-slate-700 dark:text-slate-300 mt-2">
          Biosignatures turn faint patterns in light into possible signs of life. By combining spectroscopy, photometry, and theoretical models, astronomers can study distant atmospheres and look for chemical fingerprints that hint at biology. The first clue of alien life may be a faint chemical imbalance in a planet’s atmosphere — a whisper from a distant world suggesting that life is possible beyond Earth.
        </p>
      </div>

    </div>
  )
}

export default BiosignaturesPage
