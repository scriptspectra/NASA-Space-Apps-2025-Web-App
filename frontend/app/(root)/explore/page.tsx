import React from 'react'

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

const page = () => {
  return (
    <div className='md:pl-25 p-8 md:pt-0'>
        <div>
            <Tabs defaultValue="tess" className="w-full">
            <TabsList>
                <TabsTrigger value="tess">TESS</TabsTrigger>
                <TabsTrigger value="k2">K2</TabsTrigger>
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
            <TabsContent value="k2">
                <div className='grid md:grid-cols-2'>
                    <K2Form />
                    <div className='flex justify-center'>
                        <ModelImage 
                            imageUrl = "/k2.jpg" 
                            alt = "k2"
                            title = "K2"
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
                        <div>

                        </div>
                    </div>
                </div>
            </TabsContent>
            </Tabs>        
        </div>
    </div>
  )
}

export default page