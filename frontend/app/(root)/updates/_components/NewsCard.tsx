import { Button } from '@/components/ui/button'
import { Orbit } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface NewsCardProps {
  title: string
  source?: string
  content?: string  // made optional
  link: string
  date?: string
}

const NewsCard = ({
  title,
  source,
  content,
  link,
  date,
}: NewsCardProps) => {
  const safeContent = content ?? "" // fallback if undefined
  let displayContent: string

  if (safeContent.length <= 250) {
    displayContent = safeContent
  } else {
    const trimmed = safeContent.slice(0, 250)
    displayContent = trimmed.slice(0, trimmed.lastIndexOf(" ")) + "..."
  }

  return (
    <div className="p-4 flex flex-col dark:bg-[#383838] bg-[#c5c4c4] border-none rounded-md">
      <div className="pb-4 flex">
        <div className="rounded-lg overflow-hidden mr-1">
          <Orbit 
            className='w-20 h-20'
          />
        </div>
        <div className="px-5 flex flex-col justify-center">
          <h1 className="text-2xl font-medium">{title}</h1>
          {source && <p className="text-xs text-muted-foreground">{source}</p>}
          {date && <p className="text-xs text-muted-foreground">{date}</p>}
        </div>
      </div>

      <div className="text-muted-foreground text-sm">
        {displayContent}
      </div>

      <div>
        <Button
          className="mt-3"
          variant={"gradientBtn"}
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </Button>
      </div>
    </div>
  )
}

export default NewsCard
