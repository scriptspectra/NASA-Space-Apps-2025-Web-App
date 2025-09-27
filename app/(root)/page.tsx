import ChatItem from '@/components/ChatItem'
import DashBoardCard from '@/components/DashBoardCard'
import ProjectCard from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const RootPage = () => {
  return (
    <div className='p-4 md:p-8 pt-0 md:pl-25'>
      {/* Dashboard Cards */}
      <div className='grid md:grid-cols-4 grid-cols-1 gap-2'>
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
        {/* Chats */}
        <div className='flex flex-col p-4 dark:bg-[#2A2A2A] bg-[#E2E1DC] my-1 rounded-md mt-8 md:mt-4'>
          <div className='flex justify-between items-center w-full px-2'>
            <h1 className='text-2xl'>Chats</h1>
            <Button
             variant={'gradientBtn'}            
            >
              <Plus />
              &nbsp; New Chat
            </Button>        
          </div>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
          </div>
        </div>

        {/* Chats */}
        <div className='flex flex-col p-4 dark:bg-[#2A2A2A] bg-[#E2E1DC] my-1 rounded-md mt-8 md:mt-4'>
          <div className='flex justify-between items-center w-full px-2'>
            <h1 className='text-2xl'>Projects</h1>
            <Button
             variant={'gradientBtn'}            
            >
              <Plus />
              &nbsp; New Project
            </Button>        
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1'>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RootPage