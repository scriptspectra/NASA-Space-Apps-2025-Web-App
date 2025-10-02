'use client'

import { cn } from '@/lib/utils'
import { Bell, Book, Brain, Eye, Home, Orbit, Plus, Settings, Sparkles, Telescope } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const params = useParams()
  const companionId = params?.companionId

  const onNavigate = (url: string) => {
    return router.push(url)
  }

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Dashboard",
    },
    {
      icon: Orbit,
      href: `/planets`,
      label: "Planets",
    },
    {
      icon: Brain,
      href: `/learn`,
      label: "Learn",
    },
    {
      icon: Telescope,
      href: "/observations",
      label: "Observed",
    },
    {
      icon: Sparkles,
      href: "/ask_ai",
      label: "Ask AI",
    },
    {
      icon: Bell,
      href: "/updates",
      label: "Updates",
    },
    {
      icon: Eye,
      href: "/space",
      label: "Space",
    },
  ]

  return (
    <div className='space-y-4 flex flex-col h-full text-primary dark:bg-secondary border-primary'>
      <div className='p-3 flex flex-1 justify-center'>
        <div className='space-y-2'>
          { routes.map((route) => (
            <div
            onClick={() => onNavigate(route.href)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-[#2A2A2A]/10 rounded-sm transition",
                pathname === route.href && "bg-primary/10 text-[#CD6E51] border-l-5 border-[#CD6E51]"
              )}
            >
              <div className='flex flex-col gap-y-2 items-center flex-1'>
                <route.icon className='h-5 w-5'/>
                { route.label }
              </div>            
            </div>
          )) }
        </div>
      </div>
    </div>
  )
}

export default Sidebar