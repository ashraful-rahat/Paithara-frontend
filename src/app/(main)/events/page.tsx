"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, ArrowRight, Star, Trophy, Heart } from "lucide-react";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const events = [
    {
      id: 1,
      title: "রোভার স্কাউটস সচেতনতামূলক অনুষ্ঠান",
      description: "বিদ্যালয়ের রোভার স্কাউটস দল শিক্ষার্থীদের চরিত্র গঠন, নেতৃত্বগুণ বৃদ্ধি এবং সামাজিক দায়িত্ববোধ তৈরির উদ্দেশ্যে এই সচেতনতামূলক অনুষ্ঠান আয়োজন করে। অনুষ্ঠানে স্বাস্থ্য সচেতনতা, পরিবেশ রক্ষা, দুর্যোগকালীন সহায়তা ও সমাজসেবা সম্পর্কিত বিভিন্ন কর্মসূচি নিয়ে আলোচনা হয়।",
      image: "/images/curiculam2.jpg",
      date: "১৫ ডিসেম্বর, ২০২৪",
      time: "সকাল ৯:০০",
      location: "বিদ্যালয় প্রাঙ্গণ",
      attendees: "১৫০+",
      category: "awareness",
      featured: true,
      status: "upcoming"
    },
    {
      id: 2,
      title: "পুরস্কার বিতরণী অনুষ্ঠান",
      description: "বিদ্যালয়ের শিক্ষার্থীদের সারাবছরের কৃতিত্ব ও সাফল্যকে সম্মান জানাতে অনুষ্ঠিত হয় পুরস্কার বিতরণী অনুষ্ঠান। এই দিনে বিদ্যালয় প্রাঙ্গণ সেজে ওঠে আনন্দ ও উচ্ছ্বাসে। বিভিন্ন শ্রেণির শিক্ষার্থীরা পড়াশোনা, খেলাধুলা, সাংস্কৃতিক কার্যক্রম ও শৃঙ্খলাবোধের জন্য পুরস্কার পায়।",
      image: "/images/curiiculam.jpg",
      date: "২০ ডিসেম্বর, ২০২৪",
      time: "বিকাল ৩:০০",
      location: "মূল হলরুম",
      attendees: "৩০০+",
      category: "ceremony",
      featured: true,
      status: "upcoming"
    },
    {
      id: 3,
      title: "আবদুল কালাম স্যারের বিদায় সংবর্ধনা",
      description: "বিদ্যালয়ের প্রাক্তন শিক্ষক ও সকলের শ্রদ্ধেয় ড. এ.পি.জে. আবদুল কালাম স্যার দীর্ঘদিনের শিক্ষকতা জীবন শেষে অবসর গ্রহণ করেন। তাঁর বিদায় উপলক্ষে বিদ্যালয় কর্তৃপক্ষ, শিক্ষক-শিক্ষার্থী এবং প্রাক্তন ছাত্রছাত্রীরা একত্রিত হয়ে এক আবেগঘন সংবর্ধনার আয়োজন করে।",
      image: "/images/curi.jpg",
      date: "১০ ডিসেম্বর, ২০২৪",
      time: "বিকাল ৪:৩০",
      location: "শিক্ষক লাউঞ্জ",
      attendees: "১০০+",
      category: "farewell",
      featured: false,
      status: "upcoming"
    },
    {
      id: 4,
      title: "বিজ্ঞান মেলা ও প্রকল্প প্রদর্শনী",
      description: "শিক্ষার্থীদের বিজ্ঞানমনস্কতা ও উদ্ভাবনী চিন্তার বিকাশ ঘটাতে আয়োজিত হয় বিজ্ঞান মেলা। বিভিন্ন শ্রেণির শিক্ষার্থীরা তাদের বিজ্ঞান প্রকল্প প্রদর্শন করে এবং জুরি বোর্ডের সামনে উপস্থাপন করে।",
      image: "/images/class2.jpg",
      date: "২৫ ডিসেম্বর, ২০২৪",
      time: "সকাল ১০:০০",
      location: "বিজ্ঞান গবেষণাগার",
      attendees: "২০০+",
      category: "science",
      featured: false,
      status: "upcoming"
    },
    {
      id: 5,
      title: "সাংস্কৃতিক অনুষ্ঠান ও নাটক",
      description: "শিক্ষার্থীদের সাংস্কৃতিক প্রতিভার বিকাশ ঘটাতে আয়োজিত হয় সাংস্কৃতিক অনুষ্ঠান। নাচ, গান, আবৃত্তি, নাটক সহ বিভিন্ন ধরনের সাংস্কৃতিক কর্মকাণ্ডে অংশগ্রহণ করে শিক্ষার্থীরা।",
      image: "/images/class3.jpg",
      date: "৩০ ডিসেম্বর, ২০২৪",
      time: "বিকাল ৫:০০",
      location: "মূল মঞ্চ",
      attendees: "২৫০+",
      category: "cultural",
      featured: false,
      status: "upcoming"
    }
  ];

  const categories = [
    { id: "all", name: "সব অনুষ্ঠান", count: events.length },
    { id: "awareness", name: "সচেতনতামূলক", count: events.filter(e => e.category === "awareness").length },
    { id: "ceremony", name: "অনুষ্ঠান", count: events.filter(e => e.category === "ceremony").length },
    { id: "science", name: "বিজ্ঞান", count: events.filter(e => e.category === "science").length },
    { id: "cultural", name: "সাংস্কৃতিক", count: events.filter(e => e.category === "cultural").length },
    { id: "farewell", name: "বিদায়", count: events.filter(e => e.category === "farewell").length }
  ];

  const filteredEvents = activeTab === "all" 
    ? events 
    : events.filter(event => event.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block p-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Calendar className="w-8 h-8 text-white mx-auto" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            বিদ্যালয়ের বিশেষ অনুষ্ঠানসমূহ
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            আমাদের বিদ্যালয়ের গুরুত্বপূর্ণ অনুষ্ঠান ও কার্যক্রমসমূহ যা শিক্ষার্থীদের জীবনে অবিস্মরণীয় স্মৃতি তৈরি করে এবং তাদের সামগ্রিক বিকাশে গুরুত্বপূর্ণ ভূমিকা পালন করে
          </motion.p>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-7xl mx-auto px-6 -mt-8 relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {category.name}
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Events Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                event.featured ? 'ring-2 ring-yellow-400 ring-offset-4' : ''
              }`}
            >
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4" />
                    <span>বৈশিষ্ট্যপূর্ণ</span>
                  </div>
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Event Number Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                    {categories.find(c => c.id === event.category)?.name}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button className="group/btn inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <span>বিস্তারিত দেখুন</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-tr-full opacity-50" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto px-6 pb-16"
      >
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
          
          <div className="relative z-10">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">আরও অনুষ্ঠান আসছে শীঘ্রই</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              আমাদের বিদ্যালয়ের সাথে থাকুন এবং সকল বিশেষ অনুষ্ঠানের খবর পেতে নিয়মিত ভিজিট করুন
            </p>
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Heart className="w-5 h-5" />
              <span>আমাদের সাথে থাকুন</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventsPage;
