'use client'

import React from 'react'
import { Search, Globe, Sparkles, Orbit, Book, Calendar, Brain, Info } from 'lucide-react'

interface DetectionMethod {
  id: number
  title: string
  description: string
  bestFor: string
  whatWeLearn: string
  pros: string
  cons: string
  funfact?: string
}

const detectionMethods: DetectionMethod[] = [
  {
    id: 1,
    title: 'Transit Method – Watching Stars Dim',
    description: `When a planet passes in front of its star (from our perspective), it blocks a tiny fraction of the starlight, causing the star’s brightness to dip briefly. By tracking these dips, astronomers can infer the size of the planet, its orbital period, distance from the star, and even atmospheric composition.`,
    bestFor: 'Finding planets that pass directly in front of their stars.',
    whatWeLearn: 'Size, orbital period, distance, sometimes atmosphere.',
    pros: 'Most successful method, works for Earth-sized planets.',
    cons: 'Requires perfect alignment; no info on mass.',
    funfact: 'NASA’s Kepler and TESS missions have discovered thousands of planets using this method.'
  },
  {
    id: 2,
    title: 'Radial Velocity Method – Listening to Stellar Wobbles',
    description: `Planets and stars orbit a shared center of mass, which causes the star to wobble slightly. This wobble shifts the wavelength of the star’s light, known as the Doppler shift. Measuring these shifts reveals the planet’s mass, orbital period, and eccentricity.`,
    bestFor: 'Detecting massive planets close to their stars.',
    whatWeLearn: 'Mass, orbital period, eccentricity.',
    pros: 'Complements transit data, works even without transit.',
    cons: 'Less sensitive to small planets.',
    funfact: 'The first planet around a Sun-like star — 51 Pegasi b — was discovered this way in 1995.'
  },
  {
    id: 3,
    title: 'Direct Imaging – Seeing the Planet Itself',
    description: `Simply taking a picture of the planet using instruments like coronagraphs or starshades to block starlight. Very challenging due to the brightness contrast between star and planet.`,
    bestFor: 'Young, massive planets orbiting far from their stars.',
    whatWeLearn: 'Atmosphere, temperature, orbit.',
    pros: 'Direct observation, rich data.',
    cons: 'Very challenging, few planets detected.',
    funfact: 'Only a few dozen exoplanets have been directly imaged so far.'
  },
  {
    id: 4,
    title: 'Gravitational Microlensing – Nature’s Cosmic Magnifying Glass',
    description: `When a star with planets passes in front of a more distant star, its gravity magnifies the background starlight. A planet causes a brief additional brightening, revealing its presence.`,
    bestFor: 'Detecting planets far from Earth, including rogue planets.',
    whatWeLearn: 'Mass, presence of planet.',
    pros: 'Can find very distant planets.',
    cons: 'One-time events, hard to repeat.',
    funfact: 'Microlensing can reveal planets thousands of light-years away.'
  },
  {
    id: 5,
    title: 'Astrometry – Tracking Tiny Star Movements',
    description: `Carefully measuring tiny changes in a star’s position caused by orbiting planets. Provides exact planet masses and detailed orbital information.`,
    bestFor: 'Detecting massive planets in wide orbits.',
    whatWeLearn: 'Mass, distance, orbit.',
    pros: 'Very precise orbital details.',
    cons: 'Technically difficult, few detections so far.',
    funfact: 'ESA’s Gaia mission is expected to find thousands of planets using astrometry alone.'
  },
]

const Page = () => {
  return (
    <div className="p-6 md:pl-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="md:text-4xl text-3xl font-bold mb-2">How Do We Detect Exoplanets? — A Quick Overview</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Spotting an exoplanet directly is one of the hardest challenges in modern astronomy. These distant worlds are tiny, faint, and often completely lost in the blinding glare of their parent stars.
          Imagine trying to spot a firefly flying next to a lighthouse from thousands of kilometers away — that’s about how tough it is.
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Because of this, astronomers often use indirect methods — looking for a planet’s influence on its star or the light around it rather than the planet itself. Over the past few decades, these clever techniques have helped us discover thousands of new worlds, each with its own story.
        </p>
      </div>

      {/* Methods */}
      <div className="space-y-8">
        {detectionMethods.map((method) => (
          <div key={method.id} className="dark:bg-[#2A2A2A] bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              {/* Image section */}
              <div className="md:w-1/3 relative h-64 md:h-[400px]">
                <img
                  src={
                    method.id === 1 ? "/Transit Method.PNG" :
                    method.id === 2 ? "/Radial Velocity method.PNG" :
                    method.id === 3 ? "/Direct Imaging.jpg" :
                    method.id === 4 ? "/Gravitational Microlensing.PNG" :
                    "/Astrometry of Sun.PNG"
                  }
                  alt={method.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content section */}
              <div className="md:w-2/3 p-6 border-l-4 border-[#5693f5]">
                <h2 className="text-2xl font-semibold text-[#5693f5] mb-2">{method.title}</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">{method.description}</p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                    <li><strong className="text-[#5693f5]">Best for:</strong> {method.bestFor}</li>
                    <li><strong className="text-[#5693f5]">What we learn:</strong> {method.whatWeLearn}</li>
                    <li><strong className="text-[#5693f5]">Pros:</strong> {method.pros}</li>
                    <li><strong className="text-[#5693f5]">Cons:</strong> {method.cons}</li>
                  </ul>
                </div>
                {method.funfact && (
                  <div className="mt-4 bg-[#0a1c42] bg-opacity-10 rounded-lg p-3">
                    <p className="text-[#ecf0f8] dark:text-[#e6ebf1] italic text-sm">
                      ✨ Fun fact: {method.funfact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="dark:bg-[#2A2A2A] bg-white rounded-md border-l-4 border-[#5693f5] p-6 my-8">
        <div className="flex items-center mb-4">
          <Info className="text-[#5693f5] mr-2" />
          <h2 className="text-2xl font-semibold text-[#5693f5]">Summary</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-2">
          Each method is like a different detective tool, revealing unique clues about a planet’s size, mass, orbit, distance, and even atmosphere. By combining them, astronomers can build a complete profile of these distant worlds — turning faint hints of light into rich, detailed stories about alien solar systems.
        </p>
        <p className="italic text-slate-400">
          Quick Thought: Detecting exoplanets is like solving a cosmic puzzle — each technique uncovers a different piece, and together they reveal the bigger picture of our galaxy’s planetary diversity.
        </p>
      </div>
    </div>
  )
}

export default Page
