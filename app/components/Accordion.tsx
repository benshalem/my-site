// app/components/Accordion.tsx

export type AccordionStep = {
  id: number | string;
  title: string;
  content: string;
};

interface AccordionProps {
  steps: AccordionStep[];
}

export default function Accordion({ steps }: AccordionProps) {
  return (
    <div className="flex flex-col gap-3 w-full text-white">
      
      {steps.map((step) => (
        <details 
          key={step.id} 
          name="step-accordion" 
          className="group bg-white/5 border border-white/20 rounded-xl overflow-hidden backdrop-blur-sm transition-all"
        >
          {/* Added group-open:text-cyan-400 here! */}
          <summary className="p-4 font-semibold cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-white/10 group-open:text-cyan-400 [&::-webkit-details-marker]:hidden">
            {step.title}
            <span className="text-xl font-light transition-transform duration-300 group-open:rotate-180 group-open:hidden">+</span>
            <span className="text-xl font-light hidden transition-transform duration-300 group-open:block">−</span>
          </summary>
          
          <div className="grid grid-rows-[0fr] opacity-0 group-open:grid-rows-[1fr] group-open:opacity-100 transition-all duration-300 ease-out">
            <div className="overflow-hidden">
              {/* Note: I left the content text standard white/80 so only the headline highlights */}
              <div className="p-4 text-white/80 bg-black/20 leading-relaxed border-t border-white/10">
                <p>{step.content}</p>
              </div>
            </div>
          </div>

        </details>
      ))}

    </div>
  );
}