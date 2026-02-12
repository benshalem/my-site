"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type CarouselProps = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export default function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 4500,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const count = items.length;

  const goTo = (i: number) => {
    const nextIndex = (i + count) % count;
    setIndex(nextIndex);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Auto play
  useEffect(() => {
    if (!autoPlay || count <= 1) return;

    const id = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % count);
    }, autoPlayInterval);

    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, count]);

  // Touch + Mouse swipe
  const onStart = (clientX: number) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const onEnd = (clientX: number) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = clientX - startX.current;

    // swipe threshold
    if (diff > 60) prev();
    if (diff < -60) next();

    isDragging.current = false;
    startX.current = null;
  };

  const trackStyle = useMemo(() => {
    return {
      transform: `translateX(-${index * 100}%)`,
    };
  }, [index]);

  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm opacity-70">
        No items provided to Carousel.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* viewport */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
        onMouseDown={(e) => onStart(e.clientX)}
        onMouseUp={(e) => onEnd(e.clientX)}
        onMouseLeave={(e) => onEnd(e.clientX)}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
      >
        {/* track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={trackStyle}
        >
          {items.map((item, i) => (
            <div key={i} className="min-w-full p-8 md:p-10">
              <div className="text-center">{item}</div>
            </div>
          ))}
        </div>

        {/* arrows */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-sm text-white/90 backdrop-blur hover:bg-black/60"
            >
              ←
            </button>

            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-sm text-white/90 backdrop-blur hover:bg-black/60"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* dots */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                i === index
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
