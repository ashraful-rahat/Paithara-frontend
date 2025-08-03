"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone, ArrowRight, Bell } from "lucide-react";

// এখানে নোটিশের ডেটা থাকবে (স্ট্যাটিক উদাহরণ)
const notices = [
  {
    id: 1,
    title: "২০২৫-২০২৬ শিক্ষাবর্ষের ভর্তি শুরু হয়েছে!",
    link: "#",
  },
  {
    id: 2,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ১০ আগস্ট, ২০২৫ তারিখে অনুষ্ঠিত হবে।",
    link: "#",
  },
  {
    id: 3,
    title: "গ্রীষ্মকালীন ছুটি ৫ আগস্ট, ২০২৫ পর্যন্ত বাড়ানো হয়েছে।",
    link: "#",
  },
  {
    id: 4,
    title: "বিজ্ঞান মেলায় অংশগ্রহণের শেষ তারিখ: ৩০ জুলাই, ২০২৫।",
    link: "#",
  },
  {
    id: 5,
    title: "অভিভাবক-শিক্ষক সভা ২৮ জুলাই, ২০২৫ তারিখে অনুষ্ঠিত হবে।",
    link: "#",
  },
  {
    id: 6,
    title: "১ আগস্ট, ২০২৫ থেকে নতুন লাইব্রেরি সময় কার্যকর হবে।",
    link: "#",
  },
];

const Notice: React.FC = () => {
  const duplicatedNotices = [...notices, ...notices, ...notices];

  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Notice Board Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 flex-shrink-0 pr-4"
          >
            <div className="bg-white/20 p-2 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">
                নোটিশ বোর্ড
              </h2>
              <p className="text-xs text-red-100">সর্বশেষ আপডেট</p>
            </div>
          </motion.div>

          {/* Marquee Container for notices */}
          <div className="flex-grow min-w-0">
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex flex-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 45,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedNotices.map((notice, index) => (
                  <a
                    href={notice.link}
                    key={`${notice.id}-${index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-6 py-2 text-base whitespace-nowrap font-medium text-white/95
                             transition-all duration-300 hover:text-white hover:bg-white/10 rounded-lg mx-1"
                  >
                    <span className="inline-block w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
                    {notice.title}
                    <span className="mx-4 text-white/30">•</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* "সকল নোটিশ" বাটন */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-shrink-0 pl-4"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-red-50 hover:scale-105"
            >
              সকল নোটিশ
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Notice;
