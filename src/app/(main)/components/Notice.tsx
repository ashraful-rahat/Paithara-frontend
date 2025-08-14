"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, ArrowRight } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify"; // if you want toast notifications

interface NoticeItem {
  id: string;
  title: string;
  link?: string;
}

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get("/notices");
        setNotices(response.data.data || []); // adapt based on your API response structure
      } catch {
        toast.error("নোটিশ লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Duplicate the notices for smooth marquee scroll effect
  const duplicatedNotices = [...notices, ...notices, ...notices];

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 text-center">
          লোড হচ্ছে...
        </div>
      </section>
    );
  }

  if (notices.length === 0) {
    return (
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 text-center">
          কোনো নোটিশ পাওয়া যায়নি।
        </div>
      </section>
    );
  }

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
              <h2 className="text-lg font-bold leading-tight">নোটিশ বোর্ড</h2>
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
                    href={notice.link || "#"}
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
