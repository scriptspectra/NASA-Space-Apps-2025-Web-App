'use client'

import { Orbit, Globe, Sparkles, Waves, Flame, Moon, Info } from 'lucide-react'
import React from 'react'

interface PlanetTypeProps {
  icon: React.ElementType
  title: string
  what: string
  traits: string[]
  why: string
  funfact: string
  image?: string
}

const PlanetTypeSection = ({ icon: Icon, title, what, traits, why, funfact, image }: PlanetTypeProps) => {
  return (
    <div className='dark:bg-[#2A2A2A] bg-[#fff] border-1 border-l-[#2563EB] rounded-md my-6 overflow-hidden grid md:grid-cols-4 gap-6'>
      {/* Image Column */}
      {image && (
        <div className="md:col-span-1 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain rounded-md hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Text Column */}
      <div className='md:col-span-3 py-4 px-6'>
        {/* Icon + Title */}
        <div className='flex items-center mb-2'>
          <Icon className='text-[#2563EB] mr-2' />
          <h2 className='text-2xl text-[#2563EB] font-semibold'>{title}</h2>
        </div>

        <p className='p-2'>{what}</p>

        <ul className='list-disc list-inside px-4 text-sm italic text-slate-500'>
          {traits.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <p className='p-2 mt-2'>{why}</p>

        <div className='px-4 py-2 border-1 border-[#df4a1dc1] rounded-md mt-2'>
          <p className='text-sm'>
            <strong>Fun fact:</strong> {funfact}
          </p>
        </div>
      </div>
    </div>
  )
}

const planetTypes = [
  {
    icon: Orbit,
    title: 'Hot Jupiters — The Unexpected Giants',
    image: '/Hot Jupiters.jpg',
    what: 'Hot Jupiters are enormous gas giants, often larger than Jupiter, that orbit very close to their parent stars — sometimes closer than Mercury is to the Sun. Because of this proximity, their surface temperatures can exceed 1,000°C, and their atmospheres are constantly blasted by intense stellar radiation.',
    traits: [
      'Composed mostly of hydrogen and helium.',
      'Complete their orbits in just a few days — some in less than 24 hours.',
      'Often “inflated” to unusually large sizes due to extreme heat.'
    ],
    why: 'Before the 1990s, astronomers assumed gas giants could only form far from their stars. The discovery of 51 Pegasi b shattered that idea, showing that giant planets can migrate inward — a process still not fully understood.',
    funfact: 'Many hot Jupiters are tidally locked, with one hemisphere in permanent day and the other in endless night.'
  },
  {
    icon: Globe,
    title: 'Super-Earths — Bigger Cousins of Our Planet',
    image: '/Super earth.PNG',
    what: 'Super-Earths are rocky planets with masses roughly 1.5 to 10 times that of Earth. They’re among the most common types of exoplanets in the galaxy — yet oddly, none exist in our Solar System.',
    traits: [
      'Likely to have solid surfaces and possibly active geology.',
      'Many have thick atmospheres and could support oceans.',
      'Some orbit within the “habitable zone,” where liquid water might exist.'
    ],
    why: 'Super-Earths are top targets in the search for life because they are easier to detect and may offer Earth-like conditions. They also help refine theories of planetary formation.',
    funfact: '“Super-Earth” refers only to size and mass, not habitability — some are scorching hot, others are icy worlds.'
  },
  {
    icon: Sparkles,
    title: 'Mini-Neptunes — The Missing Middle Class',
    image: '/Mini Neptune.jpg',
    what: 'Mini-Neptunes are planets larger than Earth but smaller than Neptune — a “bridge” category between rocky worlds and gas giants. They usually have thick hydrogen-helium atmospheres surrounding icy or rocky cores.',
    traits: [
      'Typically 2 to 4 times Earth’s radius.',
      'Likely lack a solid surface.',
      'Among the most common exoplanets discovered, though none exist in our Solar System.'
    ],
    why: 'Mini-Neptunes help astronomers understand how planetary atmospheres evolve. Some may eventually lose their gaseous envelopes and transform into Super-Earths.',
    funfact: 'Their absence in our Solar System is still a mystery — Jupiter’s early migration might have disrupted their formation.'
  },
  {
    icon: Waves,
    title: 'Ocean Worlds — Planets Drowned in Water',
    image: '/Ocean world.jpg',
    what: 'Ocean worlds are believed to be covered entirely by vast global oceans, potentially hundreds of kilometers deep. Beneath these oceans, thick layers of ice or high-pressure water phases might exist.',
    traits: [
      'Likely water-rich, with significant amounts of ice and liquid water.',
      'Could have dynamic climates and even hydrothermal activity.',
      'Some may offer ideal conditions for microbial life.'
    ],
    why: 'Water is a key ingredient for life, making these planets prime candidates in the search for biology beyond Earth.',
    funfact: 'Europa and Enceladus are smaller versions of such worlds — hinting that full-sized ocean planets could be common.'
  },
  {
    icon: Flame,
    title: 'Lava Worlds — Planets of Fire and Magma',
    image: '/Lava World.jpg',
    what: 'Lava worlds are rocky planets that orbit so close to their stars that their surfaces are covered with molten rock. Their temperatures often exceed 2,000°C, creating alien environments that are both hostile and fascinating.',
    traits: [
      'Molten surfaces and vaporized rock atmospheres.',
      'Some may experience “lava rain” or violent magma winds.',
      'Extreme conditions that test the limits of planetary physics.'
    ],
    why: 'They offer insights into what young planets — including early Earth — may have looked like after formation.',
    funfact: 'On K2-141b, rock vaporizes on the dayside and falls as magma rain on the nightside — a planet-wide rock cycle.'
  },
  {
    icon: Moon,
    title: 'Rogue Planets — The Cosmic Wanderers',
    image: '/Rogue Planet.jpg',
    what: 'Rogue planets are planets without a star. They drift alone through the galaxy, often after being ejected from their original systems by gravitational interactions.',
    traits: [
      'Travel through interstellar space without orbiting a star.',
      'Can sometimes be detected through gravitational microlensing or infrared surveys.',
      'Some may still retain internal heat and hidden subsurface oceans.'
    ],
    why: 'Rogue planets challenge our definition of planets and raise questions about life in dark, starless environments.',
    funfact: 'There may be more rogue planets than stars in the Milky Way — making them possibly the most common planetary type.'
  }
]

const Page = () => {
  return (
    <div className='md:pl-25 p-15'>
      {/* ✅ Banner Image with Overlay */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
          src="/exo.png"
          alt="Types of exoplanets"
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h1 className="md:text-4xl text-3xl font-bold text-white mb-2">Types of Exoplanets</h1>
            <p className="text-slate-200 max-w-2xl text-sm md:text-base">
              Discover a stunning variety of worlds — some blazing with molten rock, some cloaked in endless oceans, and others wandering the galaxy alone. Each type reveals a different chapter in the story of planet formation.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className='dark:bg-[#2A2A2A] bg-[#fff] border-1 border-l-[#2563EB] py-4 px-8 rounded-md'>
        <p className='p-4'>
          The universe is home to a breathtaking variety of planets — far beyond the eight familiar worlds in our own Solar System. Astronomers have uncovered planets so massive they could swallow Jupiter, others smaller than Mars, some so hot that metals would vaporize on their surfaces, and a few that may even rain diamonds.
        </p>
        <p className='p-4'>
          To make sense of this incredible diversity, scientists group exoplanets into several main categories based on their size, composition, and how they orbit their stars. Many of these types are unlike anything we’ve ever seen close to home.
        </p>
      </div>

      {/* Planet Type Sections */}
      {planetTypes.map((type, i) => (
        <PlanetTypeSection key={i} {...type} />
      ))}

      {/* Summary */}
      <div className='dark:bg-[#2A2A2A] bg-[#fff] border-1 border-l-[#2563EB] py-4 px-8 rounded-md my-8'>
        <div className='flex items-center mb-2'>
          <Info className='text-[#2563EB] mr-2' />
          <h2 className='text-2xl text-[#2563EB] font-semibold'>Summary</h2>
        </div>
        <p className='p-4'>
          Exoplanets come in more shapes, sizes, and environments than anyone imagined just a few decades ago. This extraordinary diversity shows that our Solar System is just one example in a cosmic gallery of possibilities. From lava worlds that rain magma to lonely wanderers drifting between stars, every new discovery teaches us something about how planets form, evolve, and possibly host life.
        </p>
        <p className='p-4'>
          And here’s the big question: with billions of stars in our galaxy — most of them hosting multiple planets — how many of these worlds might be like Earth? That’s the mystery that keeps astronomers searching.
        </p>
      </div>
    </div>
  )
}

export default Page
