"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

interface CarouselSlide {
  id: number;
  image: string;
}

interface BannerProps {
  slides?: CarouselSlide[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
}

const defaultSlides: CarouselSlide[] = [
  { id: 1, image: "/images/bannnnnnnner.jpg" },
  { id: 2, image: "/images/banner2.jpg" },
  { id: 3, image: "/images/banner.jpg" },
];

const Banner: React.FC<BannerProps> = ({
  slides = defaultSlides,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
            style={{
              backgroundColor: "transparent",
            }}
          >
            {/* Just show the image */}
            <Image
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="100vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 md:p-3 rounded-full text-white hover:bg-black/50 transition-all duration-300 z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 md:p-3 rounded-full text-white hover:bg-black/50 transition-all duration-300 z-10"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 bg-black/30 p-2 md:p-3 rounded-full text-white hover:bg-black/50 transition-all duration-300 z-10"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isAutoPlaying ? (
              <Pause size={16} className="md:w-5 md:h-5" />
            ) : (
              <Play size={16} className="md:w-5 md:h-5" />
            )}
          </motion.button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 left-4 bg-black/30 px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium z-10 select-none">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Banner;
