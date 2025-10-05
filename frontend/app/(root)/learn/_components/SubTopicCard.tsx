'use client'
// ...existing code...
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SubTopicCardProps {
  image?: string;
  subtopic: string;
  link?: string;
}

const SubTopicCard = ({ image = '/exo.png', subtopic, link = '/' }: SubTopicCardProps) => {
  const external = typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://'));

  const cardContent = (
    <>
      <div className="h-[120px] p-6 bg-white dark:bg-gray-900 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-[#2563EB] dark:text-white group-hover:text-[#3b82f6] transition-colors duration-300 line-clamp-2">
          {subtopic}
        </h3>
        <div className="mt-auto w-8 h-0.5 bg-[#2563EB] group-hover:w-full transition-all duration-300 ease-in-out"></div>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-lg shadow-md group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 hover:transform hover:-translate-y-1 border-l-4 border-[#2563EB]"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link 
      href={link ?? '/'} 
      className="relative block overflow-hidden rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 hover:transform hover:-translate-y-1"
    >
      {cardContent}
    </Link>
  );
};

export default SubTopicCard;
// ...existing code...