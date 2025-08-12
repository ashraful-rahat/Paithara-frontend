"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

interface BannerProps {
  slides?: CarouselSlide[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
}

const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "পৈথারা  উচ্চ বিদ্যালয় স্বাগতম",
    subtitle: "জ্ঞানের আলোয় আলোকিত হোন",
    description:
      "আমাদের আধুনিক শিক্ষা ব্যবস্থা এবং অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে আপনার সন্তানের ভবিষ্যৎ গড়ে তুলুন।",
    image: "/images/banner3.jpg",
    ctaText: "ভর্তি করুন",
    ctaLink: "#",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "শিক্ষার মান উন্নয়ন",
    subtitle: "ভবিষ্যতের জন্য প্রস্তুত",
    description:
      "আধুনিক প্রযুক্তি এবং উদ্ভাবনী শিক্ষা পদ্ধতির মাধ্যমে শিক্ষার্থীদের সর্বোচ্চ সম্ভাবনা বিকাশে সহায়তা করি।",
    image: "/images/banner2.jpg",
    ctaText: "আরও জানুন",
    ctaLink: "#",
    bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "সাফল্যের পথে অগ্রযাত্রা",
    subtitle: "উৎকর্ষতার প্রতিশ্রুতি",
    description:
      "প্রতিটি শিক্ষার্থীর ব্যক্তিগত বিকাশ এবং একাডেমিক সাফল্য নিশ্চিত করার জন্য আমরা প্রতিশ্রুতিবদ্ধ।",
    image: "/images/banner.jpg",
    ctaText: "অন্বেষণ করুন",
    ctaLink: "#",
    bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
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
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
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
              background: slides[currentSlide].bgColor,
            }}
          >
            {/* Background Image with Next.js Image */}
            <div className="absolute inset-0">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover opacity-20"
                priority={currentSlide === 0}
                sizes="100vw"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>

            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Slide Content */}
            <div className="relative flex items-center justify-center h-full px-4 md:px-8">
              <div className="text-center text-white max-w-4xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-lg leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-white/90 leading-tight"
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-base md:text-lg lg:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                >
                  {slides[currentSlide].ctaText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 z-10"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 z-10"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </motion.button>

          {/* Auto-play Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 z-10"
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
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium z-10">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Banner;
