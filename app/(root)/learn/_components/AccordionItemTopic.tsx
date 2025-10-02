import { 
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
 } from '@/components/ui/accordion'
import React from 'react'

interface AccordionItemTopicProps {
    title: string,
    description: string,
}

const AccordionItemTopic = ({
    title,
    description,
}:AccordionItemTopicProps) => {
  return (
    <>
        <AccordionItem value={ title }>
            <AccordionTrigger>{ title }</AccordionTrigger>
            <AccordionContent>{ description }</AccordionContent>
        </AccordionItem>
    </>
  )
}

export default AccordionItemTopic