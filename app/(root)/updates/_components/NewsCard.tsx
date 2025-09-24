import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

interface NewsCardProps {
    title: string,
    source?: string,
    content: string,
    link: string,
    date?: string,
}

const NewsCard = ({
    title,
    source,
    content,
    link,
    date,
}: NewsCardProps) => {
    let displayContent;

    if(content.length <= 250){
        displayContent = content
    } else {
        displayContent = content.slice(0, 250)
        displayContent = displayContent.slice(0, displayContent.lastIndexOf(" ")) + '...'
    }

  return (
    <div className='p-4 flex flex-col dark:bg-[#383838] bg-[#c5c4c4] border-none rounded-md'>
        <div className='pb-4 flex'>
            <div className='rounded-lg overflow-hidden mr-1'>
                <Image
                    src={'/exo.png'}
                    alt='exoplanet'
                    width={100}
                    height={100}
                />
            </div>
            <div className='px-5 flex flex-col items-center'>
                <h1 className='text-2xl font-medium'>
                    { title }                    
                </h1>
            </div>
        </div>
        <div className='text-muted-foreground text-sm'>
            { displayContent } 
        </div>
        <div>
            <Button
                className='mt-3'
                variant={"gradientBtn"}
            >
                Read More
            </Button>
        </div>
    </div>
  )
}

export default NewsCard