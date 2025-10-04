import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface NewsPreviewCardProps {
  title: string
  source?: string
  content?: string  // made optional
  link: string
  date?: string
}

const NewsPreviewCard = ({
  title,
  source,
  content,
  link,
  date,
}: NewsPreviewCardProps) => {
  const safeContent = content ?? "" // fallback if undefined
  let displayContent: string

  if (safeContent.length <= 100) {
    displayContent = safeContent
  } else {
    const trimmed = safeContent.slice(0, 100)
    displayContent = trimmed.slice(0, trimmed.lastIndexOf(" ")) + "..."
  }

  return (
    <div className="p-4 flex flex-col dark:bg-[#383838] bg-[#c5c4c4] border-none rounded-md">
      <div className="pb-4 flex">
        <div className="px-5 flex flex-col justify-center">
          <h1 className="text-lg font-medium">{title}</h1>
          {source && <p className="text-xs text-muted-foreground">{source}</p>}
          {date && <p className="text-xs text-muted-foreground">{date}</p>}
        </div>
      </div>

      <div className="text-muted-foreground text-sm">
        {displayContent} 
        <Link
        href={'/'}
        className='text-[#CD6E51]'
        >
        Read more
        </Link>
      </div>
    </div>
  )
}

export default NewsPreviewCard
