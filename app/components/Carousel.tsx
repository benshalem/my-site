"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselProps = {
  items: React.ReactNode[];
};

export default function Carousel({ items }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-xl font-semibold">Carousel</h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="px-3 py-2 rounded-md border border-white/20 hover:border-white/40"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="px-3 py-2 rounded-md border border-white/20 hover:border-white/40"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {items.map((node, idx) => (
            <div
              key={idx}
              className="min-w-[80%] sm:min-w-[50%] lg:min-w-[33.333%]"
            >
              <div className="h-full rounded-xl border border-white/10 p-6">
                {node}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
