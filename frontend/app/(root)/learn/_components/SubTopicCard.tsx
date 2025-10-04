import React from "react";
import Image from "next/image";

interface SubTopicCardProps {
  image: string;
  subtopic: string;
  link: string;
}

const SubTopicCard = ({ image, subtopic, link }: SubTopicCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden rounded-md shadow-lg group"
    >
      {/* Background Image */}
        <div className="relative w-full h-48">
        <Image
            src="/exo.png"   // must be exactly like this
            alt={subtopic}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-500"></div>

      {/* Text */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-semibold drop-shadow-md">{subtopic}</h3>
      </div>
    </a>
  );
};

export default SubTopicCard;
