import { Book, Brain, Calendar, Globe, Orbit, Search, Sparkles } from 'lucide-react'
import React from 'react'

const whyStudyList = [
  {
    id: 1,
    icon: Search,
    topic: "Are we alone in the universe?",
    description: "By studying planets in the habitable zone — the region around a star where liquid water can exist — scientists hope to discover conditions suitable for life. Finding even one potentially habitable exoplanet could transform our understanding of life’s place in the cosmos.",
  },
  {
    id: 2,
    icon: Globe,
    topic: "How do planetary systems form and evolve?",
    description: "Observing a wide range of planetary systems helps refine theories of planet formation and migration. For example, the discovery of “hot Jupiters” close to their stars forced scientists to rethink how planets move after they form.",
  },
  {
    id: 3,
    icon: Sparkles,
    topic: "What makes a planet habitable?",
    description: "Comparing different types of exoplanets — from scorching gas giants and icy super-Earths to water-rich mini-Neptunes — allows us to identify the conditions that support life and those that make planets sterile.",
  },
  {
    id: 4,
    icon: Book,
    topic: "What can exoplanets teach us about Earth?",
    description: "Studying other worlds provides new insights into our own planet’s atmosphere, geology, and long-term evolution. It helps us understand why Earth is habitable — and how fragile that habitability might be.",
  },
]

interface WhyStudyprops {
  id: number,
  icon: React.ElementType,
  topic: string,
  description: string,
}

export const WhyStudy = ({
  id,
  icon: Icon,
  topic,
  description,
}: WhyStudyprops) => {
  return (
    <div className='rounded-md dark:bg-[#2A2A2A]'>
      <div className='flex flex-col items-center justify-center'>
        <Icon className='w-6 h-6 mb-4'/>
        <h1 className='text-xl py-1 text-[#C96E53]'>{ topic }</h1>
        <p className='text-sm font-light italic text-slate-400'>{ description }</p>
      </div>
    </div>
  )
}

const page = () => {
  return (
    <div className='md:pl-25 p-15 '>
      <div>
      <h1 className='md:text-4xl md:font-bold text-3xl font-bold mb-4'>
        Introduction to Exoplanets  
      </h1>
      <div className='dark:bg-[#2A2A2A] border-1 border-l-[#2563EB] py-4 px-8 rounded-md bg-[#fff]'>
        <div className='flex items-center '>
          <Globe className='text-[#2563EB] mr-2'/>
          <h1 className='text-2xl text-[#2563EB]'>What are Exoplanets?</h1>
        </div>
        <p className='p-4'>
          Exoplanets — short for extrasolar planets — are planets that orbit stars beyond our own Solar System. Just as Earth orbits the Sun, these distant worlds revolve around other stars, sometimes located hundreds, thousands, or even tens of thousands of light-years away. Their discovery has opened an entirely new frontier in astronomy, fundamentally changing our understanding of the universe.
        </p>
        <p className='p-4'>
          Exoplanets come in an astonishing variety of types and sizes. Some are gas giants even larger than Jupiter, so close to their stars that their atmospheres reach scorching temperatures of over 1,000°C. Others are rocky, Earth-like planets — small, solid worlds that may have continents, oceans, and atmospheres, and perhaps even conditions suitable for life. There are also rogue planets, mysterious bodies that wander through interstellar space without orbiting any star at all, likely ejected from their original systems during violent gravitational interactions.
        </p>
        <p className='p-4'>
          The first confirmed discoveries of exoplanets were made in the early 1990s. Since then, thanks to powerful telescopes, space missions, and ingenious detection methods, astronomers have catalogued thousands of these distant worlds. Today, exoplanet science is one of the fastest-growing fields in astronomy, and we are only beginning to grasp the immense diversity and complexity of planetary systems beyond our own.
        </p>
        <div className='px-4 rounded-md py-2 bg-[#df4a1dc1] border-2 border-l-[#2563EB]'>
          <p>
            Over 5,000 exoplanets have been confirmed to date, with thousands more candidates awaiting verification.
          </p>
        </div>
      </div>             
      </div>
      <div>
      <div className='mt-8'>
        <div className='flex items-center'>
          <Calendar className='mr-2' />
          <h1 className='md:text-4xl md:font-bold text-3xl font-bold mb-4'>
            A Brief History of Exoplanet Discovery
          </h1>
        </div>
      <div className='dark:bg-[#2A2A2A] border-1 border-l-[#2563EB] py-4 px-8 rounded-md bg-[#fff]'>
        <p className='p-4'>
          The idea of other worlds is not new. For centuries, humans have gazed at the stars and wondered whether planets like Earth might exist around them. The Italian philosopher Giordano Bruno speculated as early as the 16th century that the universe contained "countless suns and planets." Yet, for most of history, such ideas remained purely philosophical — beyond the reach of scientific proof.
        </p>
        <p className='p-4'>
          That changed dramatically in the late 20th century, when advances in telescope technology and observational techniques finally allowed astronomers to detect planets around other stars. A few key milestones mark this journey:
        </p>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 px-10'>
          {/* Card 1 */}
          <div className=''>       
            <h3 className='text-2xl font-bold'>1992</h3>
            <p>The First Exoplanets</p>
            <p className='italic dark:text-slate-400'>Aleksander Wolszczan and Dale Frail discovered planets orbiting the pulsar PSR B1257+12, proving planets could form in extreme environments.</p>
          </div>
          {/* Card 1 */}
          <div className=''>       
            <h3 className='text-2xl font-bold'>1995</h3>
            <p>First Planet Around a Sun-like Star</p>
            <p className='italic dark:text-slate-400'>Michel Mayor and Didier Queloz discovered 51 Pegasi b, a "hot Jupiter" that challenged existing theories and earned them the 2019 Nobel Prize in Physics.</p>
          </div>
          {/* Card 1 */}
          <div className=''>       
            <h3 className='text-2xl font-bold'>2009</h3>
            <p>The First Exoplanets</p>
            <p className='italic dark:text-slate-400'>NASA's Kepler mission transformed exoplanet science using the transit method, identifying thousands of candidates, many Earth-like.</p>
          </div>
          {/* Card 1 */}
          <div className=''>       
            <h3 className='text-2xl font-bold'>2018</h3>
            <p>TESS Launch</p>
            <p className='italic dark:text-slate-400'>The Transiting Exoplanet Survey Satellite continues the search, scanning nearly the entire sky for planets around bright, nearby stars.</p>
          </div>
        </div>
        <p className='p-4'>
          Today, astronomers have confirmed over 5,000 exoplanets, and the number continues to grow rapidly. Future missions such as JWST (James Webb Space Telescope), PLATO, and Ariel promise to take this exploration even further — probing atmospheres, measuring chemical compositions, and searching for signs of habitability.
        </p>
      </div>
      </div>
      <div>
        <div className='flex items-center mt-4'>
          <Orbit className='mr-3' />
          <h1 className='md:text-4xl md:font-bold text-3xl font-bold'>
            Why Study Exoplanets? 
          </h1>
        </div>
        <div className='dark:bg-[#2A2A2A] border-1 border-l-[#2563EB] py-4 px-8 rounded-md bg-[#fff] my-4'>
          <p className='p-4'>
            The search for exoplanets goes far beyond simply cataloguing distant worlds. It addresses some of the most fundamental and profound questions humanity has ever asked:
          </p>
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 px-8 my-4'>
            { whyStudyList.map((item)=>(
              <WhyStudy
                id={1}
                topic={ item.topic }
                icon={ item.icon }
                description={ item.description }
              />
            )) }
          </div>
          <p className='p-4'>
            Each exoplanet discovered is more than a distant speck of light. It is a piece of a larger cosmic puzzle — a data point that deepens our knowledge of planetary diversity, the processes that shape worlds, and the potential for life beyond Earth.
          </p>
        </div>        
      </div>
      <div>
        <div className='dark:bg-[#2A2A2A] border-1 border-l-[#2563EB] py-4 px-8 rounded-md bg-[#fff] my-4'>
        <div className='flex items-center '>
          <Brain className='text-[#2563EB] mr-2'/>
          <h1 className='text-2xl text-[#2563EB]'>Did You Know?</h1>
        </div>
        <p className='p-4'>
          Astronomers estimate that our galaxy alone may contain hundreds of billions of planets. That means almost every star you see in the night sky likely hosts its own planetary system — and many of those planets could be worlds unlike anything we’ve ever imagined.        </p>
      </div>             
      </div>
      </div>
    </div>
  )
}

export default page