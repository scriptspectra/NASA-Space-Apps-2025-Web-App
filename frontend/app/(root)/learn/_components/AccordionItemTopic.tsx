import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import React from 'react';
import SubTopicCard from './SubTopicCard';

interface AccordionItemTopicProps {
  id: number;
  title: string;
  subtopics: string[];
}

const AccordionItemTopic = ({ id, title, subtopics }: AccordionItemTopicProps) => {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        {id}. {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {subtopics.map((subtopic, index) => (
            <SubTopicCard
              key={index}
              image='/kepler.jpg' // must be inside /public folder
              subtopic={subtopic}
              link="/"
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionItemTopic;
