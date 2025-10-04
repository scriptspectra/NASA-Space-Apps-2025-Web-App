import { Notebook } from 'lucide-react'
import React from 'react'
import { Badge } from "@/components/ui/badge"

const ProjectCard = () => {
  return (
    <>
    <div className='flex flex-col dark:bg-[#383838] bg-[#E2E1DC] rounded-md p-3'>
        <div>
            <Notebook />
        </div>
        <div>
            <h1 className='font-medium text-md pt-1'>
                Kepler Data Analysis - Transit Method
            </h1>
        </div>
        <div className='pt-2'>
            <Badge variant={'secondary'} className='bg-[#730903] text-white'>In Progress</Badge>
        </div>
    </div>
    </>
  )
}

export default ProjectCard