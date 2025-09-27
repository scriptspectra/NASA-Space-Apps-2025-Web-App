import DashBoardCard from '@/components/DashBoardCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const RootPage = () => {
  return (
    <div className='p-8 pt-0 md:pl-25'>
      {/* Dashboard Cards */}
      <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
        {/* Chats */}
        <div className='flex p-4 dark:bg-[#383838] bg-[#E2E1DC] my-1 rounded-md mt-8 md:mt-4'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='text-2xl'>Chats</h1>
            <Button
             variant={'gradientBtn'}            
            >
              <Plus />
              &nbsp; New Chat
            </Button>        
          </div>
        </div>

        <div className='flex p-4 dark:bg-[#383838] bg-[#E2E1DC] my-1 rounded-md md:mt-4'>
          <div className='flex justify-between'>
            <h1 className='text-2xl'>Chats</h1>        
          </div>
        </div>
      </div>
    </div>
  )
}

export default RootPage