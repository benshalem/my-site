'use client'; 

import { ReactNode, useState } from 'react';

export type AccordionStep = {
  id: number | string;
  title: string;
  content: ReactNode; 
};

interface AccordionProps {
  steps: AccordionStep[];
}

export default function Accordion({ steps }: AccordionProps) {
  const [openId, setOpenId] = useState<number | string | null>(null);

  return (
    <div className="flex flex-col gap-3 w-full text-white">
      
      {steps.map((step) => {
        const isOpen = openId === step.id;

        return (
          <div 
            key={step.id} 
            // 1. Changed to a true dark gray (gray-800) with a subtle gray border
            className="group bg-gray-800 border border-gray-600 rounded-xl overflow-hidden transition-all shadow-lg"
          >
            <button 
              onClick={() => setOpenId(isOpen ? null : step.id)}
              // 2. Hover effect is now a slightly lighter gray (gray-700)
              className={`w-full text-left p-4 font-semibold cursor-pointer flex justify-between items-center transition-colors hover:bg-gray-700 ${isOpen ? 'text-cyan-300' : ''}`}
            >
              {step.title}
              <span className={`text-xl font-light transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-0 hidden' : 'opacity-100'}`}>+</span>
              <span className={`text-xl font-light transition-transform duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>−</span>
            </button>
            
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {/* 3. The inside is a slightly darker gray (gray-900) to create a nice inset depth effect */}
                <div className="p-4 text-white/90 bg-gray-900 leading-relaxed border-t border-gray-600">
                  {step.content}
                </div>
              </div>
            </div>

          </div>
        );
      })}

    </div>
  );
}