"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Page() {
  // Using placeholders for now. Swap these back to "/carousel/photo-1.jpg" when ready!
  const images = [
    "https://picsum.photos/seed/10/800/450",
    "https://picsum.photos/seed/20/800/450",
    "https://picsum.photos/seed/30/800/450",
    "https://picsum.photos/seed/40/800/450",
    "https://picsum.photos/seed/50/800/450",
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
      <div className