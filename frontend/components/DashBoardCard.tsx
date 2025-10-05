import React from 'react'
import { Jersey_25 } from "next/font/google";

const Jersey25 = Jersey_25({
  subsets: ["latin"],
  weight: ["400"],
});

const DashBoardCard = () => {
  return (
    <>
    <div className={`dark:bg-[#383838] bg-[#E2E1DC] rounded-lg p-3 flex flex-col justify-center items-center`}>
        <h1 className={`${Jersey25.className} md:text-5xl text-4xl text-[#2563EB]`}>6000+</h1>
        <p className='text-xs'>Total planets in the database</p>
    </div>    
    </>
)
}

export default DashBoardCard