'use client'
import React from 'react'

type ExoplanetCardProps = {
  title: string
  source?: string
  content: string
  link: string
  date?: string
}

const ExoplanetCard: React.FC<ExoplanetCardProps> = ({ title, source = "NASA", content, link, date }) => {
  return (
    <div className="w-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Image and Title Section */}
      <div className="flex">
        {/* Left side - Image */}
        <div className="w-32 h-32 bg-gradient-to-br from-orange-400 via-red-600 to-black relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-1 left-1 text-white text-xs font-medium">
            {source}
          </div>
        </div>
        
        {/* Right side - Title */}
        <div className="flex-1 p-4 flex items-center">
          <h2 className="text-white text-xl font-bold leading-tight">
            {title}
          </h2>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 pt-0">
        {date && <p className="text-xs text-gray-400 mb-2">{date}</p>}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {content}
        </p>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors duration-200"
        >
          Read more...
        </a>
      </div>
    </div>
  )
}

export default ExoplanetCard
