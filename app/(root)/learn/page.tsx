import { Accordion } from '@/components/ui/accordion'
import React from 'react'
import AccordionItemTopic from './_components/AccordionItemTopic'

export const exoplanetTopics = [
  {
    title: "🪐 Introduction to Exoplanets",
    subtopics: [
      "What Are Exoplanets?",
      "A Brief History of Exoplanet Discovery",
      "Types of Exoplanets (Hot Jupiters, Super-Earths, Mini-Neptunes, etc.)",
      "Why Study Exoplanets? (Science Goals & Astrobiology)"
    ]
  },
  {
    title: "🔭 Detection Methods",
    subtopics: [
      "The Transit Method (with Light Curves Explained)",
      "Radial Velocity Method (Doppler Wobble)",
      "Direct Imaging of Exoplanets",
      "Gravitational Microlensing",
      "Astrometry and Other Rare Techniques",
      "Comparing Detection Methods: Strengths & Limitations"
    ]
  },
  {
    title: "📊 Light Curves and Data Analysis",
    subtopics: [
      "What Is a Light Curve? (Basics)",
      "How Transit Depth, Duration, and Shape Reveal Planetary Properties",
      "Common Noise Sources and How to Filter Them",
      "Analyzing Real Light Curves: Step-by-Step Guide",
      "Using Machine Learning to Detect Exoplanets from Transit Data",
      "Case Study: Kepler-10b – From Light Curve to Discovery"
    ]
  },
  {
    title: "🌍 Habitability and Planetary Characterization",
    subtopics: [
      "The Habitable Zone: Where Life Could Exist",
      "Key Factors That Affect Habitability (Temperature, Atmosphere, Water, etc.)",
      "How We Estimate Mass, Radius, and Density",
      "Detecting Atmospheres and Signs of Life",
      "Biosignatures: What We’re Looking For"
    ]
  },
  {
    title: "🧠 Advanced Topics & Tools",
    subtopics: [
      "Using Transit Timing Variations (TTVs) to Detect Multiple Planets",
      "Exomoons: What We Know and How We Might Find Them",
      "Planet Formation and Migration Theories",
      "Future Missions and Telescopes (TESS, JWST, PLATO, Ariel)",
      "Open Data Archives: How to Access and Use Kepler/TESS Data"
    ]
  },
  {
    title: "📚 Practical Guides (Optional but Useful)",
    subtopics: [
      "A Beginner’s Guide to Using NASA Exoplanet Archive",
      "How to Interpret FITS Files from TESS or Kepler",
      "Building Your Own Light Curve Analysis Pipeline",
      "Tips for Publishing Your First Exoplanet Discovery Paper",
      "Future Missions and Technologies for Exoplanet Discovery"
    ]
  }
];

const page = () => {
  return (
    <div className='pl-20'>
    <Accordion
        type="single"
        defaultValue='title_1'
        collapsible
        className='w-full'
    >
        { exoplanetTopics.map((topic)=>(
            <AccordionItemTopic 
                title={ topic.title }
                description='this is the sample description'
            />
        )) }
    </Accordion>
    </div>
  )
}

export default page