"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Accordion from './components/Accordion';

export default function Page() {
  const images = [
    "https://picsum.photos/seed/10/800/450",
    "https://picsum.photos/seed/20/800/450",
    "https://picsum.photos/seed/30/800/450",
    "https://picsum.photos/seed/40/800/450",
    "https://picsum.photos/seed/50/800/450",
  ];

  // --- Accordion Data ---
  const myAccordionData = [
    {
      id: 1,
      title: "Step 1: Introduction",
      content: "This is the content for the first step. It is fully responsive."
    },
    {
      id: 2,
      title: "Step 2: Setup",
      content: "Here is the content for step two. When you open this, others close!"
    },
    {
      id: 3,
      title: "Step 3: Configuration",
      content: "Content for step three goes here."
    },
    {
      id: 4,
      title: "Step 4: Execution",
      content: "Step four details."
    },
    {
      id: 5,
      title: "Step 5: Completion",
      content: "Final step content."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe / Drag State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-play effect: changes the image every 3 seconds
  // The timer automatically resets if you swipe because currentIndex changes!
  useEffect(() => {
    // Pause auto-play while the user is actively dragging
    if (isDragging) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, isDragging]);

  // --- Drag & Swipe Handlers ---
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setTouchStartX(clientX);
    setTouchEndX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setTouchEndX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const minSwipeDistance = 50; // Require at least 50px drag to change slides

      if (distance > minSwipeDistance) {
        // Swiped left -> Next image
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (distance < -minSwipeDistance) {
        // Swiped right -> Previous image
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8">
      <h1 className={styles.title}>Hello World</h1>

      <h1 className="text-4xl font-bold">Ben Shalem 🚀</h1>

      {/* YouTube Video - Lazy loaded */}
      <div className="w-full max-w-3xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/ogRMIxHsKAI"
            title="Ben Shalem Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Image Carousel - Optimized, Auto-playing, and Swipeable */}
      <div className="w-full max-w-3xl">
        <div 
          className="relative w-full overflow-hidden rounded-2xl border border-white group cursor-grab active:cursor-grabbing" 
          style={{ paddingBottom: '56.25%' }}
          // Touch events for Mobile
          onTouchStart={(e) => handleDragStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.targetTouches[0].clientX)}
          onTouchEnd={handleDragEnd}
          // Mouse events for PC
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd} // Catch cases where mouse leaves the box while dragging
        >
          
          <div 
            className={`absolute top-0 left-0 w-full h-full flex ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
            style={{ 
              transform: `translateX(calc(-${currentIndex * 100}% - ${isDragging && touchStartX && touchEndX ? (touchStartX - touchEndX) : 0}px))` 
            }}
          >
            {images.map((src, index) => (
              <div key={index} className="relative min-w-full h-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Carousel slide ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized // <-- Remove this line when you switch to your own local images!
                  draggable="false" // Prevents the default browser image ghost-dragging on PC
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Accordion Section */}
      <div className="w-full max-w-3xl">
        {/* We pass the array into the component via the 'steps' prop */}
        <Accordion steps={myAccordionData} />
      </div>

    </main>
  );
}