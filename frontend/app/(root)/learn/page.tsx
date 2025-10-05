import { Accordion } from '@/components/ui/accordion'
import React from 'react'
import AccordionItemTopic from './_components/AccordionItemTopic'

export const exoplanetTopics = [
  {
    id: 1,
    title: "  Introduction to Exoplanets",
    subtopics: [
      { name: "Intro to Exoplanets", image: "https://exoplanets.nasa.gov/system/resources/detail_files/5123_exoplanets_banner.jpg", link: "/learn/exoplanet_intro" },
      { name: "Types of Exoplanets", image: "https://exoplanets.nasa.gov/system/news_items/list_view_images/1551_971_tips_320.jpg", link: "/learn/exoplanet_types" },
    ]
  },
  {
    id: 2,
    title: " Detection Methods",
    subtopics: [
      { name:"Exoplanet Detection Methods", image: "https://exoplanets.nasa.gov/system/news_items/main_images/1692_ESO_VLT.jpg", link: "/learn/detection_methods" },
      { name:"Transit Method", image: "https://exoplanets.nasa.gov/system/internal_resources/details/original/2233_TauCeti_transit_1280.jpg", link: "/learn/detection_methods/transit_method"},
      { name:"Radial Velocity Method", image: "https://exoplanets.nasa.gov/system/video_items/191_Wobble.jpg", link: "/learn/detection_methods/radial_velocity" },
      { name:"Gravitational Microlensing", image: "https://exoplanets.nasa.gov/system/news_items/main_images/1319_PIA23863.jpg", link: "/learn/detection_methods/gravitational_microlensing" },
      { name:"Direct Imaging", image: "https://www.nasa.gov/wp-content/uploads/2015/07/nyc-jupiter-large.jpg", link: "/learn/detection_methods/direct_imaging" },
      { name:"Astrometry & Other Methods", image: "https://exoplanets.nasa.gov/system/news_items/main_images/1666_astrometry_art_large.jpg", link: "/learn/detection_methods/other_methods" },
    ]
  },
  {
    id: 3,
    title: " Light Curves and Data Analysis",
    subtopics: [
      { name:"Light Curves and Data Analysis (Basics)", image: "https://exoplanets.nasa.gov/system/news_items/main_images/1288_lightcurve-graphic.jpg", link: "/learn/light_curves"},
      { name:"Using ML for Exoplanet Detection", image: "https://www.nasa.gov/wp-content/uploads/2019/03/kepler-title-image-large.jpg", link: "/learn/ml" },
    ]
  },
  {
    id: 4,
    title: " Habitability and Planetary Characterization",
    subtopics: [
      { name:"Habitability and Life Potential", image: "https://exoplanets.nasa.gov/system/news_items/main_images/1669_Ocean_World_Art.jpg", link: "/learn/habitability" },
      { name:"Atmospheric Analysis and Spectroscopy", image: "https://exoplanets.nasa.gov/system/news_items/main_images/1538_artist_impression_wasp-39_b.jpg", link: "/learn/atmosphere" },
      { name:"Detecting Biosignature", image: "https://exoplanets.nasa.gov/system/resources/detail_files/2393_rocky-habitable-zone-planet.jpg", link: "/learn/detecting_biosignatures" },
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