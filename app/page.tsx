"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Page() {
  // Replace these URLs with your actual local image paths (e.g., "/image-1.jpg")
  const images = [
    "https://picsum.photos/seed/10/800/450",
    "https://picsum.photos/seed/20/800/450",
    "https://picsum.photos/seed/30/800/450",
    "https://picsum.photos/seed/40/800/450",
    "https://picsum.photos/seed/50/800/450",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect: changes the image every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

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

      {/* Image Carousel - Optimized with Next.js Image (No Dots) */}
      <div className="w-full max-w-3xl">
        <div className="relative w-full overflow-hidden rounded-2xl border border-white group" style={{ paddingBottom: '56.25%' }}>
          
          <div 
            className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div key={index} className="relative min-w-full h-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Carousel slide ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized // <-- Remove this line when you switch to your own local images!
                />
              </div>
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