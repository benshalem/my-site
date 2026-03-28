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
      content: (
        <div className="flex flex-col gap-2">
          <p>Welcome to the <strong>first step</strong> of the process.</p>
          <p>You can even add bullet points:</p>
          <ul className="list-disc ml-5 text-cyan-200">
            <li>Fully responsive</li>
            <li>Zero JavaScript required</li>
            <li>Customizable colors</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "Step 2: Important Links",
      content: (
        <p>
          Check out my <a href="https://github.com/your-profile" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">GitHub profile</a> for more projects!
        </p>
      )
    },
    {
      id: 3,
      title: "Step 3: Configuration",
      content: (
        <p>Content for step three goes here. Just simple text works fine too!</p>
      )
    },
    {
      id: 4,
      title: "Step 4: Execution",
      content: (
        <p>Step four details. You can add images in here too if you want!</p>
      )
    },
    {
      id: 5,
      title: "Step 5: Completion",
      content: (
        <p>Final step content. 🚀</p>
      )
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe / Drag State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-play effect
  useEffect(() => {
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
      const minSwipeDistance = 50;

      if (distance > minSwipeDistance) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (distance < -minSwipeDistance) {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <main className="relative min-h-screen w-full bg-[url('/verde-terra-bg.png')] bg-cover bg-center bg-fixed">
      
      {/* LAYER 2: The subtle green tint */}
      <div className="absolute inset-0 bg-[#A8D5BA]/30 pointer-events-none"></div>

      {/* LAYER 3: YOUR CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 p-8 min-h-screen">
        
        {/* --- NEW HEADER SECTION --- */}
        <div className="flex flex-col items-center gap-2">
          
          {/* 1. Your Logo */}
          {/* I set a fixed container size (w-32 h-32) so it stays perfectly proportioned */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 drop-shadow-lg">
            <Image
              src="/logo.png" 
              alt="Ben Shalem Logo"
              fill
              className="object-contain" 
              priority
            />
          </div>

          {/* 2. Your Titles (Rocket removed!) */}
          <h1 className={styles.title}>Hello World</h1>
          <h1 className="text-4xl font-bold text-white drop-shadow-md">Ben Shalem</h1>

        </div>
        {/* --- END HEADER SECTION --- */}


        {/* YouTube Video */}
        <div className="w-full max-w-3xl">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
              src="https://www.youtube.com/embed/ogRMIxHsKAI"
              title="Ben Shalem Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Image Carousel */}
        <div className="w-full max-w-3xl">
          <div 
            className="relative w-full overflow-hidden rounded-2xl border border-white/30 shadow-lg group cursor-grab active:cursor-grabbing" 
            style={{ paddingBottom: '56.25%' }}
            onTouchStart={(e) => handleDragStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.targetTouches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
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
                    unoptimized
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="w-full max-w-3xl shadow-lg rounded-xl">
          <Accordion steps={myAccordionData} />
        </div>

      </div>
    </main>
  );
}