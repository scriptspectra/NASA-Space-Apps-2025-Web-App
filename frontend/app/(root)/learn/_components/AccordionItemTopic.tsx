// ...existing code...
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import React from 'react';
import SubTopicCard from './SubTopicCard';

type SubtopicItem = string | { name?: string; image?: string; link?: string };

interface AccordionItemTopicProps {
  id: number;
  title: string;
  subtopics: SubtopicItem[];
}

const AccordionItemTopic = ({ id, title, subtopics }: AccordionItemTopicProps) => {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        {id}. {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {subtopics.map((subtopic, index) => {
            const isString = typeof subtopic === 'string';
            const name = isString ? subtopic : subtopic.name ?? 'Untitled';
            const image = isString ? '/kepler.jpg' : subtopic.image ?? '/kepler.jpg';
            const link = isString ? '/' : subtopic.link ?? '/';

            return (
              <SubTopicCard
                key={index}
                image={image}
                subtopic={name}
                link={link}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionItemTopic;
// ...existing code...