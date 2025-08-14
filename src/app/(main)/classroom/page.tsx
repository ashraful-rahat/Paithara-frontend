"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Lightbulb, 
  Star, 
  Heart,
  Clock,
  MapPin,
  Award
} from "lucide-react";

const ClassroomPage = () => {
  const classroomFeatures = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "আধুনিক শিক্ষা ব্যবস্থা",
      description: "ডিজিটাল প্রজেক্টর ও স্মার্ট ক্লাসরুমের মাধ্যমে আধুনিক শিক্ষা প্রদান",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "ছোট ক্লাস সাইজ",
      description: "প্রতিটি শিক্ষার্থীর প্রতি ব্যক্তিগত মনোযোগ নিশ্চিত করা",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "যোগ্য শিক্ষকমণ্ডলী",
      description: "অভিজ্ঞ ও প্রশিক্ষিত শিক্ষকদের তত্ত্বাবধানে পাঠদান",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "সৃজনশীল শিক্ষা",
      description: "শিক্ষার্থীদের মেধা ও সৃজনশীলতা বিকাশে সহায়তা",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const classSchedule = [
    {
      time: "সকাল ৮:০০",
      subject: "বাংলা",
      teacher: "মোঃ আব্দুল হামিদ স্যার",
      room: "রুম ১০১"
    },
    {
      time: "সকাল ৯:০০",
      subject: "ইংরেজি",
      teacher: "মোঃ রফিক আহমেদ স্যার",
      room: "রুম ১০২"
    },
    {
      time: "সকাল ১০:০০",
      subject: "গণিত",
      teacher: "মিজানুর রহমান স্যার",
      room: "রুম ১০৩"
    },
    {
      time: "সকাল ১১:০০",
      subject: "বিজ্ঞান",
      teacher: "শিউলি রাণী চক্রবর্তী ম্যাডাম",
      room: "রুম ১০৪"
    }
  ];

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
      <motion.section 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-center overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            আমাদের শ্রেণীকক্ষ
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-medium text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            শিক্ষার্থীদের মেধা বিকাশের জন্য সুন্দর ও সুবিধাজনক শ্রেণীকক্ষ
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Main Classroom Images */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">শ্রেণীকক্ষের পরিবেশ</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              আমাদের শ্রেণীকক্ষে শিক্ষার্থীরা কীভাবে পড়াশোনা করে এবং শিক্ষার পরিবেশ কেমন
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* First Image */}
            <motion.div variants={itemVariants} className="group relative">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/class.jpg"
                  alt="শ্রেণীকক্ষে শিক্ষার্থীরা পড়াশোনা করছে"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-medium">সক্রিয় শ্রেণীকক্ষ</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">গণিত ক্লাস</h3>
                  <p className="text-sm text-blue-100">শিক্ষার্থীরা মনোযোগ সহকারে পড়াশোনা করছে</p>
                </div>
              </div>
            </motion.div>

            {/* Second Image */}
            <motion.div variants={itemVariants} className="group relative">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/class2.jpg"
                  alt="বিজ্ঞান ক্লাসে শিক্ষার্থীরা পরীক্ষা করছে"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5" />
                    <span className="text-sm font-medium">বিজ্ঞান ক্লাস</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">ব্যবহারিক শিক্ষা</h3>
                  <p className="text-sm text-blue-100">হাতে-কলমে শেখার মাধ্যমে জ্ঞান অর্জন</p>
                </div>
              </div>
            </motion.div>

            {/* Third Image */}
            <motion.div variants={itemVariants} className="group relative">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/class3.jpg"
                  alt="সাংস্কৃতিক ক্লাসে শিক্ষার্থীরা অংশগ্রহণ করছে"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">সাংস্কৃতিক ক্লাস</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">সৃজনশীলতা</h3>
                  <p className="text-sm text-blue-100">শিক্ষার্থীদের প্রতিভা বিকাশের সুযোগ</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">আমাদের শ্রেণীকক্ষের বিশেষত্ব</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              প্রতিটি শ্রেণীকক্ষে আমরা যে সুবিধা ও পরিবেশ প্রদান করি
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {classroomFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Class Schedule */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">দৈনিক ক্লাস রুটিন</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              প্রতিদিনের ক্লাসের সময়সূচী ও বিষয়সমূহ
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classSchedule.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-600">{item.time}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.subject}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.teacher}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{item.room}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
          
          <div className="relative z-10">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">আমাদের শ্রেণীকক্ষে যোগ দিন</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              আপনার সন্তানকে একটি সুন্দর ও শিক্ষামূলক পরিবেশে গড়ে তুলতে আমাদের সাথে যোগাযোগ করুন
            </p>
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Heart className="w-5 h-5" />
              <span>যোগাযোগ করুন</span>
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ClassroomPage; 