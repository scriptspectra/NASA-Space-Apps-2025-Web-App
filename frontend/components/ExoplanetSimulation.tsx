import React from 'react'

const ExoplanetSimulation = () => {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <iframe
        src="https://eyes.nasa.gov/apps/exo/?embed=true"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title="Eyes on Exoplanets"
      ></iframe>
    </div>
  )
}

export default ExoplanetSimulation
