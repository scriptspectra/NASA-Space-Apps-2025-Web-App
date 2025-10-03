import { 
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
 } from '@/components/ui/accordion'
import React from 'react'

interface AccordionItemTopicProps {
    id: number,
    title: string,
    subtopics: string[],
}

const AccordionItemTopic = ({
    id,
    title,
    subtopics,
}:AccordionItemTopicProps) => {
  return (
    <>
        <AccordionItem value={ title }>
            <AccordionTrigger>{ id }. { title }</AccordionTrigger>
            <AccordionContent>
                <div className='pl-10'>
                    <ul>
                        { subtopics.map((subtopic) => (
                            <li className='dark:text-slate-200'>{ subtopic }</li>
                        )
                        ) }                   
                    </ul>
                </div>
            </AccordionContent>
        </AccordionItem>
    </>
  )
}

export default AccordionItemTopic