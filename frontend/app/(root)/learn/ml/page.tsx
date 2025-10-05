'use client'

import React from 'react'
import { Info } from 'lucide-react'

const MLExoplanetsPage = () => {
  return (
    <div className="p-6 md:pl-24 space-y-8">

      {/* Header */}
      <div>
        <h1 className="md:text-4xl text-3xl font-bold mb-4">
          Using Machine Learning for Exoplanet Detection — Teaching Computers to Find New Worlds
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Space telescopes like Kepler and TESS have collected millions of light curves, each potentially hiding the signature of a distant planet. Manually analyzing all that data would take decades. Machine learning (ML) gives computers the ability to spot patterns, classify signals, and discover new planets faster and more accurately than humans ever could.
        </p>
      </div>

      {/* Why Use ML */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Why Use Machine Learning?</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Traditional planet-hunting relies on humans or classical algorithms to search for repeating dips in starlight. These methods:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Struggle with large data volumes</li>
          <li>Miss subtle or noisy signals</li>
          <li>Can’t easily adapt to complex patterns</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: In 2017, Google and NASA used a neural network to re-analyze Kepler data — discovering two new exoplanets missed by traditional searches!
        </p>
      </div>

      {/* How ML Works */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">How Machine Learning Works in Exoplanet Science</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Machine learning teaches computers to recognize patterns and make predictions. In exoplanet detection, the process typically follows these steps:
        </p>

        {/* Step 1 */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">1. Data Collection & Preprocessing</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Raw light curves often contain noise from stellar activity, instrument errors, or background interference. Astronomers clean and normalize the data, remove trends, and label known examples (planet vs. non-planet). Think of this as tidying the textbook before a student starts learning.
        </p>

        {/* Step 2 */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">2. Training the Model</h3>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          The cleaned data trains an ML model to distinguish planetary signals from false positives. Common models include:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Neural Networks: Identify complex patterns in light curves.</li>
          <li>Random Forests: Simple, interpretable models for structured features.</li>
          <li>Convolutional Neural Networks (CNNs): Spot transit shapes in raw data, similar to image recognition.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: CNNs for exoplanet detection are like facial recognition — only they’re spotting planets instead of faces!
        </p>

        {/* Step 3 */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">3. Prediction and Classification</h3>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Likely exoplanet</li>
          <li>False positive (binary star, stellar noise, etc.)</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Some models estimate confidence levels — how likely a detected signal is truly planetary.
        </p>

        {/* Step 4 */}
        <h3 className="text-xl font-semibold text-[#2563EB] mb-1">4. Model Evaluation and Validation</h3>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Precision and recall: measure accuracy</li>
          <li>Confusion matrices: track false positives vs. false negatives</li>
          <li>Cross-validation: ensure model isn’t memorizing data</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Only rigorously tested models are used in real exoplanet searches.
        </p>
      </div>

      {/* Beyond Detection */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Beyond Detection: What ML Can Do Next</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Characterize exoplanets: predict size, temperature, atmosphere.</li>
          <li>Analyze multi-planet systems: detect complex orbital dynamics.</li>
          <li>Discover anomalies: spot moons, rings, or new astrophysical phenomena.</li>
        </ul>
        <p className="italic text-slate-400 mb-2">
          Fun Fact: Some ML models are trained to detect biosignatures — signs of life — in atmospheric spectra from telescopes like JWST.
        </p>
      </div>

      {/* Challenges */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Challenges and Limitations</h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-2">
          <li>Data bias: Models are only as good as their training data.</li>
          <li>False positives: ML might misclassify noise as a planet.</li>
          <li>Interpretability: Neural networks can be “black boxes,” hard to explain decisions.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Despite these challenges, ML is evolving, with each new generation of models becoming faster, smarter, and more accurate.
        </p>
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#2563EB] p-6 shadow-sm">
        <div className="flex items-center mb-2">
          <Info className="text-[#2563EB] mr-2" />
          <h2 className="text-2xl font-semibold text-[#2563EB]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Machine learning is transforming exoplanet science. What once required teams of astronomers months of careful analysis can now be done in minutes — often with greater sensitivity. As telescopes grow more powerful and data more abundant, AI becomes an essential partner in humanity’s search for new worlds.
        </p>
        <p className="italic text-slate-400">
          Quick Thought: The next Earth-like planet may not be found by an astronomer — it could be discovered by an algorithm quietly scanning the cosmos for the faintest flicker of light.
        </p>
      </div>

    </div>
  )
}

export default MLExoplanetsPage
