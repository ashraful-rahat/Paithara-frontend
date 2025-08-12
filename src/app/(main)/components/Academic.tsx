"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Beaker,
  Briefcase,
  BookOpen,
  Sparkles,
  GraduationCap,
  Users,
} from "lucide-react";

const streams = [
  {
    id: 1,
    title: "বিজ্ঞান শাখা",
    description:
      "পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, গণিত এবং কম্পিউটার সায়েন্স এর মতো বিষয় অন্তর্ভুক্ত। গবেষণা ও প্রযুক্তির ভবিষ্যৎ নেতাদের জন্য।",
    icon: <Beaker className="icon-science" />,
    cardClass: "science-card",
    subjects: ["পদার্থবিজ্ঞান", "রসায়ন", "জীববিজ্ঞান", "গণিত"],
    career: "ইঞ্জিনিয়ারিং, মেডিকেল, গবেষণা",
  },
  {
    id: 2,
    title: "ব্যবসায় শিক্ষা শাখা",
    description:
      "হিসাববিজ্ঞান, ব্যবসায় অধ্যয়ন, অর্থনীতি এবং গণিত বিষয়গুলোর ওপর গুরুত্ব দেয়। ভবিষ্যৎ উদ্যোক্তা ও ব্যবসায়িক নেতাদের জন্য।",
    icon: <Briefcase className="icon-business" />,
    cardClass: "business-card",
    subjects: ["হিসাববিজ্ঞান", "ব্যবসায় অধ্যয়ন", "অর্থনীতি", "গণিত"],
    career: "ব্যাংকিং, ব্যবসা, অর্থনীতি",
  },
  {
    id: 3,
    title: "মানবিক শাখা",
    description:
      "ইতিহাস, ভূগোল, রাজনৈতিক বিজ্ঞান, সাহিত্য এবং সমাজবিজ্ঞান এর মত বিষয় অন্তর্ভুক্ত। সমাজ ও সংস্কৃতির ভবিষ্যৎ কর্ণধারদের জন্য।",
    icon: <BookOpen className="icon-humanities" />,
    cardClass: "humanities-card",
    subjects: ["ইতিহাস", "ভূগোল", "রাজনীতি", "সাহিত্য"],
    career: "শিক্ষকতা, প্রশাসন, সাংবাদিকতা",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      duration: 0.8,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
    },
  },
};

const AcademicPrograms = () => {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden floating-shapes">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float-delayed">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-xl"></div>
      </div>

      <div className="relative z-10 py-20 px-6 md:px-12 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h1 className="hero-title mb-4 text-gray-900 font-bold text-4xl md:text-5xl">
              একাডেমিক প্রোগ্রামসমূহ
            </h1>
            <div className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-700">
              <GraduationCap className="w-8 h-8" />
              <span>শিক্ষার উৎকর্ষতা</span>
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
          </motion.div>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed"
          >
            আমাদের বিদ্যালয় শ্রেণি ৬ থেকে ১০ পর্যন্ত শিক্ষার্থীদের জন্য বিস্তৃত
            একাডেমিক প্রোগ্রাম সরবরাহ করে। শিক্ষার্থীরা তাদের আগ্রহ ও ক্যারিয়ার
            লক্ষ্যের উপর ভিত্তি করে তিনটি প্রধান ধারার মধ্যে নির্বাচন করতে
            পারেন।
          </motion.p>
        </div>

        {/* Academic Streams Grid */}
        <motion.div
          className="grid gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {streams.map((stream) => (
            <motion.div
              key={stream.id}
              className={`academic-card ${stream.cardClass} group bg-white rounded-3xl shadow-lg p-8 cursor-pointer`}
              variants={cardVariants}
              whileHover="hover"
              tabIndex={0}
            >
              {/* Icon Container */}
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl dow-inner  text-black group-hover:scale-110 transition-transform duration-300">
                  {stream.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {stream.title}
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  {stream.description}
                </p>

                {/* Subject Tags */}
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  {stream.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 border border-gray-300"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* Career Path */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-accent mb-1">
                    ক্যারিয়ার সুযোগ:
                  </p>
                  <p className="text-sm text-gray-700">{stream.career}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="section-title text-3xl mb-2 text-gray-900 font-semibold">
                কেন আমাদের প্রোগ্রাম বেছে নিবেন?
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">অভিজ্ঞ শিক্ষকমণ্ডলী</h4>
                <p className="text-sm text-gray-700">
                  উচ্চ যোগ্যতাসম্পন্ন ও অভিজ্ঞ শিক্ষকদের দ্বারা পাঠদান
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900">ব্যক্তিগত মনোযোগ</h4>
                <p className="text-sm text-gray-700">
                  প্রতিটি শিক্ষার্থীর প্রতি বিশেষ যত্ন ও নির্দেশনা
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900">আধুনিক সুবিধা</h4>
                <p className="text-sm text-gray-700">
                  উন্নত ল্যাব, লাইব্রেরি ও ডিজিটাল শিক্ষা ব্যবস্থা
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default AcademicPrograms;
