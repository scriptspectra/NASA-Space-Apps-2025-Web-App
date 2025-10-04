import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
  return (
    <>
    <Sheet>
        <SheetTrigger className="relative z-50">
            <Menu className='text-slate-300'/>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 dark:bg-[#2A2A2A] pt-10 w-22 z-50'>
            <Sidebar />
        </SheetContent>
    </Sheet>
    </>
  )
}

export default MobileSidebar