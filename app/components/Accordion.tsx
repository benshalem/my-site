// app/components/Accordion.tsx

// Define the shape of our data so TypeScript can help catch errors
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
          className="group bg-white/5 border border-white/20 rounded-xl overflow-hidden backdrop-blur-sm"
        >
          <summary className="p-4 font-semibold cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden">
            {step.title}
            <span className="text-xl font-light group-open:hidden">+</span>
            <span className="text-xl font-light hidden group-open:block">−</span>
          </summary>
          
          <div className="p-4 text-white/80 bg-black/20 leading-relaxed border-t border-white/10">
            <p>{step.content}</p>
          </div>
        </details>
      ))}

    </div>
  );
}