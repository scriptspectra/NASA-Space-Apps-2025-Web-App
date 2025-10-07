"use client";

import React, { useEffect, useState } from 'react'
import MainLoader from '@/components/MainLoader'
import { getHasLoadedOnce, setHasLoadedOnce } from '@/lib/loading-state'

import { 
    Tabs,
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import TessForm from './_components/TessForm'
import Image from 'next/image'
import ModelImage from './_components/ModelImage'
import K2Form from './_components/K2Form'
import KeplerForm from './_components/KeplerForm'
import { useBackend } from '@/lib/backendContext';

const page = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show loading animation if it hasn't been shown before
    if (!getHasLoadedOnce()) {
      setLoading(true);
      
      // Show animation for 5 seconds
      const timer = setTimeout(() => {
        setLoading(false);
        setHasLoadedOnce(true); // Mark as loaded
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative">
      {/* Full-page loader overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "black",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MainLoader />
        </div>
      )}

      {/* Actual page content */}
      <div className='md:pl-25 p-8 md:pt-0'>
        <div>
            <Tabs defaultValue="tess" className="w-full">
            <TabsList>
                <TabsTrigger value="tess">TESS</TabsTrigger>
                <TabsTrigger value="kepler">Kepler</TabsTrigger>
            </TabsList>
            <TabsContent value="tess">
                <div className='grid md:grid-cols-2'>
                    <div className='w-full'>
                        <TessForm />
                    </div>                    
                    <div className='flex justify-center'>
                        <ModelImage 
                            imageUrl = "/tess.jpg" 
                            alt = "tess"
                            title = "Tess"
                            subtitle = "Launched in 2018, TESS surveys nearly the entire sky to find exoplanets around bright, nearby stars. By focusing on closer stars, it makes follow-up observations, including studying planetary atmospheres, much easier and more detailed than ever before."
                        />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="kepler">
                <div className='grid md:grid-cols-2'>
                    <KeplerForm />
                    <div className='flex justify-center'>
                        <ModelImage 
                            imageUrl = "/kepler.jpg" 
                            alt = "kepler"
                            title = "Kepler"
                            subtitle = "Launched in 2018, TESS surveys nearly the entire sky to find exoplanets around bright, nearby stars. By focusing on closer stars, it makes follow-up observations, including studying planetary atmospheres, much easier and more detailed than ever before."
                        />
                    </div>
                </div>
            </TabsContent>
            </Tabs>        
        </div>
      </div>
    </div>
  )
}

export default page