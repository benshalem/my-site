"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Page() {
  // Using placeholders for now. Swap these back to "/carousel/photo-1.jpg" when ready!
  const images = [
    "https://picsum.photos/seed/10/800/800",
    "https://picsum.photos/seed/20/800/800",
    "https://picsum.photos/seed/30/800/800",
    "https://picsum.photos/seed/40/800/800",
    "https://picsum.photos/seed/50/800/800",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Auto-play effect: changes the image every 4 seconds (4000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  // --- Swipe Detection Handlers (For Fading) ---
  const handleSwipeStart = (clientX: number) => {
    setTouchStartX(clientX);
    setTouchEndX(clientX);
  };

  const handleSwipeMove = (clientX: number) => {
    setTouchEndX(clientX);
  };

  const handleSwipeEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const minSwipeDistance = 50; 

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

      {/* YouTube Video - Keeps 16:9 ratio */}
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

      {/* Image Carousel - Perfect square with 0.5s Crossfade */}
      <div className="w-full max-w-3xl">
        <div 
          className="relative w-full aspect-square overflow-hidden rounded-2xl border border-white group cursor-grab active:cursor-grabbing"
          // Touch events for Mobile
          onTouchStart={(e) => handleSwipeStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => handleSwipeMove(e.targetTouches[0].clientX)}
          onTouchEnd={handleSwipeEnd}
          // Mouse events for PC
          onMouseDown={(e) => handleSwipeStart(e.clientX)}
          onMouseMove={(e) => handleSwipeMove(e.clientX)}
          onMouseUp={handleSwipeEnd}
          onMouseLeave={handleSwipeEnd}
        >
          {/* Fading Images */}
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={src}
                alt={`Carousel slide ${index + 1}`}
                fill
                className="object-cover"
                unoptimized // <-- Remove this line when you switch to your real local images!
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-6">
        <p className="text-sm opacity-70 mb-4">Testimonials</p>
      </div>
    </main>
  );
}