"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Page() {
  const images = [
    "https://picsum.photos/seed/10/800/450",
    "https://picsum.photos/seed/20/800/450",
    "https://picsum.photos/seed/30/800/450",
    "https://picsum.photos/seed/40/800/450",
    "https://picsum.photos/seed/50/800/450",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8">
      <h1 className={styles.title}>Hello World</h1>

      <h1 className="text-4xl font-bold">Ben Shalem 🚀</h1>

      {/* YouTube Video - Eagerly loaded if it's at the very top, but lazy loading is safer if it's slightly down the page */}
      <div className="w-full max-w-3xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/ogRMIxHsKAI"
            title="Ben Shalem Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy" /* <-- Added lazy loading */
          />
        </div>
      </div>

      {/* Image Carousel - Below the fold */}
      <div className="w-full max-w-3xl">
        <div className="relative w-full overflow-hidden rounded-2xl border border-white group" style={{ paddingBottom: '56.25%' }}>
          
          <div 
            className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div key={index} className="min-w-full h-full flex-shrink-0">
                <img
                  src={src}
                  alt={`Carousel slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy" /* <-- Added lazy loading so these don't slow down the initial load */
                />
              </div>
            ))}
          </div>

          {/* Clickable Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${
                  currentIndex === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-6">
        <p className="text-sm opacity-70 mb-4">Testimonials</p>
      </div>
    </main>
  );
}