import { Accordion } from '@/components/ui/accordion'
import React from 'react'
import AccordionItemTopic from './_components/AccordionItemTopic'

export const exoplanetTopics = [
  {
    id: 1,
    title: "  Introduction to Exoplanets",
    subtopics: [
      "Intro to Exoplanets",
      "Types of Exoplanets",
    ]
  },
  {
    id: 2,
    title: " Detection Methods",
    subtopics: [
      "Exoplanet Detection Methods ",
      "Transit Method",
      "Radial Velocity Method",
      "Gravitational Microlensing",
      "Direct Imaging",
      "Astrometry & Other Methods",
    ]
  },
  {
    id: 3,
    title: " Light Curves and Data Analysis",
    subtopics: [
      "Light Curves and Data Analysis (Basics)",
      "Using ML for Exoplanet Detection",
    ]
  },
  {
    id: 4,
    title: " Habitability and Planetary Characterization",
    subtopics: [
      "Habitability and Life Potential",
      "Atmospheric Analysis and Spectroscopy",
      "Detecting Biosignature",
    ]
  },
];

const page = () => {
  return (
    <div className='md:pl-30 md:p-10 p-10'>
      <div>
        <h1 className='text-2xl mb-10'>
          Your Gateway to the Universe of Exoplanets
        </h1>
      </div>
    <Accordion
        type="single"
        defaultValue={ exoplanetTopics[0].title }
        collapsible
        className='w-full'
    >
        { exoplanetTopics.map((topic)=>(
            <AccordionItemTopic 
                key={ topic.id }
                id = { topic.id }
                title={ topic.title }
                subtopics={ topic.subtopics }
            />
        )) }
    </Accordion>
    </div>
  )
}

export default page