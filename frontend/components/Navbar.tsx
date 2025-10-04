import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import MobileSidebar from './MobileSidebar'
import ModeToggle from './mode-toggle'

const font = Poppins({
    weight: "600",
    subsets: ["latin",]
})

const Navbar = () => {
  return (
    <div className='text-black w-full fixed z-50 flex items-center border-b-1 justify-between border-primary/10  pl-5 pr-5 bg-slate-200 mt-0 dark:bg-[#2A2A2A] dark:text-white h-16'>
        <div className='flex items-center'>
            <div className='block md:hidden text-black dark:text-slate-200'>
                <MobileSidebar />
            </div>
            <Link href={'/'}>
                <h1
                 className={cn('hidden md:block text-xl font-bold text-black md:text-3xl dark:text-[#CD6E51]',
                            font.className
                )}>
                    Xplora
                </h1>
            </Link>
        </div>
        <div className='flex gap-3'>
            <ModeToggle />
        </div>
    </div>
  )
}

export default Navbar