"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const streams = [
  {
    id: 1,
    title: "বিজ্ঞান শাখা",
    description:
      "পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান , গণিত   এবং উচ্চতর গণিত  এর মতো বিষয় অন্তর্ভুক্ত। গবেষণা ও প্রযুক্তির ভবিষ্যৎ নেতাদের জন্য।",
    icon: <Atom className="w-10 h-10" />,
    cardClass: "science-card",
    subjects: ["পদার্থ বিজ্ঞান", "রসায়ন", "জীববিজ্ঞান", "উচ্চতর গণিত"],
    career: "ইঞ্জিনিয়ারিং, মেডিকেল, গবেষণা",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    title: "ব্যবসায় শিক্ষা শাখা",
    description:
      "হিসাববিজ্ঞান, ব্যবসায় পরিচিতি এবং ফিন্যান্স ও ব্যাংকিং বিষয়গুলোর ওপর গুরুত্ব দেওয়া হয়। ভবিষ্যতে উদ্যোক্তা, ব্যবসায়ী ও অর্থনীতি সেক্টরে চাকরির সুযোগ সন্ধানী নেতাদের জন্য।",
    icon: <TrendingUp className="w-10 h-10" />,
    cardClass: "business-card",
    subjects: ["হিসাববিজ্ঞান", "ব্যবসায় পরিচিতি", "ফিন্যান্স ও ব্যাংকিং"],
    career: "ব্যাংকিং, ব্যবসা, অর্থনীতি",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-200",
  },

  {
    id: 3,
    title: "মানবিক শাখা",
    description:
      "ইতিহাস, ভূগোল, রাষ্ট্রবিজ্ঞান এবং সমাজবিজ্ঞান এর মত বিষয় অন্তর্ভুক্ত। সমাজ ও সংস্কৃতির ভবিষ্যতে কর্ণধারদের জন্য।",
    icon: <HeartHandshake className="w-10 h-10" />,
    cardClass: "humanities-card",
    subjects: ["ইতিহাস", "ভূগোল", "রাষ্ট্রবিজ্ঞান", "সমাজবিজ্ঞান"],
    career: "শিক্ষকতা, প্রশাসন, সাংবাদিকতা",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
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
    <div className="min-h-screen relative overflow-hidden bg-white py-16">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                একাডেমিক প্রোগ্রামসমূহ
              </h1>
            </div>

            <div className="flex items-center justify-center gap-3 text-xl font-semibold text-gray-700 mt-4">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>শিক্ষার উৎকর্ষতা ও সমৃদ্ধি</span>
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
          </motion.div>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-6"
          >
            আমাদের বিদ্যালয় শ্রেণি ৬ থেকে ১০ পর্যন্ত শিক্ষার্থীদের জন্য বিস্তৃত
            একাডেমিক প্রোগ্রাম সরবরাহ করে। শিক্ষার্থীরা তাদের আগ্রহ ও ক্যারিয়ার
            লক্ষ্যের উপর ভিত্তি করে তিনটি প্রধান ধারার মধ্যে নির্বাচন করতে
            পারেন।
          </motion.p>
        </div>

        {/* Academic Streams Grid */}
        <motion.div
          className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {streams.map((stream) => (
            <motion.div
              key={stream.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${stream.bgColor} border ${stream.borderColor}`}
              variants={cardVariants}
              whileHover="hover"
              tabIndex={0}
            >
              {/* Card Header with Gradient */}
              <div className={`h-2 bg-gradient-to-r ${stream.color}`}></div>

              <div className="p-7">
                {/* Icon Container */}
                <div className="mb-6 flex justify-center">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${stream.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stream.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-5">
                  <h2
                    className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stream.color}`}
                  >
                    {stream.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    {stream.description}
                  </p>

                  {/* Subject Tags */}
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                      মুখ্য বিষয়সমূহ:
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {stream.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-800 border shadow-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Career Path */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      ক্যারিয়ার সুযোগ:
                    </h3>
                    <p className="text-sm text-gray-700">{stream.career}</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r ${stream.color} text-white font-medium flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300`}
                  >
                    আরও জানুন
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Section */}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AcademicPrograms;
