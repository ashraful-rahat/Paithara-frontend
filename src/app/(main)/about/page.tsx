"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  MapPin,
  Calendar,
  GraduationCap,
  School,
  HeartHandshake,
  Globe,
  Target,
  Lightbulb,
  Star,
  Trophy,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "আধুনিক শিক্ষা ব্যবস্থা",
      description: "৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত মানসম্পন্ন শিক্ষা প্রদান",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
      description: "যোগ্য ও অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে পাঠদান",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "সহশিক্ষা কার্যক্রম",
      description: "খেলাধুলা, সাংস্কৃতিক কার্যক্রম ও বিভিন্ন প্রতিযোগিতা",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "উচ্চ সাফল্যের হার",
      description: "এসএসসি পরীক্ষায় ধারাবাহিক সাফল্য ও ভাল ফলাফল",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const facilities = [
    { name: "সুবিশাল গ্রন্থাগার", icon: <BookOpen className="w-5 h-5" /> },
    { name: "বিজ্ঞান গবেষণাগার", icon: <School className="w-5 h-5" /> },
    { name: "কম্পিউটার ল্যাব", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "খেলার মাঠ", icon: <Award className="w-5 h-5" /> },
    { name: "মসজিদ", icon: <HeartHandshake className="w-5 h-5" /> },
    { name: "নিরাপদ পানীয় জলের ব্যবস্থা", icon: <CheckCircle className="w-5 h-5" /> },
    { name: "স্বাস্থ্যকর পরিবেশ", icon: <Star className="w-5 h-5" /> },
    { name: "পরিচ্ছন্ন শ্রেণীকক্ষ", icon: <Trophy className="w-5 h-5" /> }
  ];

  const achievements = [
    {
      title: "প্রতিষ্ঠার বছর",
      value: "১৯৮৫",
      icon: <Calendar className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "শিক্ষার্থী সংখ্যা",
      value: "৫০০+",
      icon: <Users className="h-6 w-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "শিক্ষক সংখ্যা",
      value: "১০+",
      icon: <School className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "সাফল্যের হার",
      value: "৭০%+",
      icon: <Award className="h-6 w-6" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const timeline = [
    {
      year: "১৯৮৫",
      title: "প্রতিষ্ঠা",
      description: "পৈথারা উচ্চ বিদ্যালয় প্রতিষ্ঠিত হয়"
    },
    {
      year: "১৯৯০",
      title: "প্রথম ব্যাচ",
      description: "প্রথম এসএসসি পরীক্ষার্থীদের সাফল্য"
    },
    {
      year: "২০০০",
      title: "বিস্তার",
      description: "নতুন ভবন ও সুবিধা যোগ হয়"
    },
    {
      year: "২০১০",
      title: "ডিজিটালাইজেশন",
      description: "কম্পিউটার ল্যাব ও আধুনিক শিক্ষা ব্যবস্থা"
    },
    {
      year: "২০২০",
      title: "উন্নয়ন",
      description: "নতুন প্রজেক্টর ও স্মার্ট ক্লাসরুম"
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
            <School className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            পৈথারা উচ্চ বিদ্যালয়
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-6 text-blue-100"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">ফুলগাজী, ফেনী</span>
            </div>
            <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">স্থাপিত: ১৯৮৫</span>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl font-medium text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            শিক্ষার আলোয় আলোকিত এক উজ্জ্বল ভবিষ্যৎ
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* About School */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/banner2.jpg"
                alt="বিদ্যালয়ের শ্রেণীকক্ষ"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">৩৫+</div>
                  <div className="text-sm text-gray-600">বছরের অভিজ্ঞতা</div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full opacity-60" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full">
                আমাদের সম্পর্কে
              </span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              ফেনী জেলার শিক্ষা প্রতিষ্ঠানের তালিকায় একটি গুরুত্বপূর্ণ নাম
            </h2>
            
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                ফেনী জেলার শিক্ষা প্রতিষ্ঠানের তালিকায় পৈথারা উচ্চ বিদ্যালয় একটি গুরুত্বপূর্ণ নাম। 
                ফুলগাজী উপজেলার এই উল্লেখযোগ্য শিক্ষা প্রতিষ্ঠানটি ১৯৮৫ সাল থেকে মানসম্পন্ন শিক্ষা প্রদানে 
                নিরলসভাবে কাজ করে আসছে।
              </p>
              <p>
                আমাদের বিদ্যালয়ে ৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত শিক্ষার্থীরা অধ্যয়ন করে থাকে। 
                প্রায় চার দশক ধরে আমরা এই অঞ্চলের শিশু-কিশোরদের শিক্ষিত করে তুলেছি এবং 
                তাদের একটি উজ্জ্বল ভবিষ্যতের জন্য প্রস্তুত করেছি।
              </p>
              <p>
                আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীর মধ্যে লুকিয়ে থাকা প্রতিভাকে বিকশিত করা এবং 
                তাদের নৈতিক, আধ্যাত্মিক ও বুদ্ধিবৃত্তিক উন্নতি সাধন করা।
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span>আরও জানুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">আমাদের বিশেষত্ব</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              আমরা আমাদের শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষা প্রদানের জন্য নিবেদিত
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
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

        {/* Mission & Vision */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">আমাদের লক্ষ্য</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                আমাদের প্রধান লক্ষ্য হলো শিক্ষার্থীদের একটি সুশিক্ষিত, নৈতিকতাসম্পন্ন এবং দেশপ্রেমিক নাগরিক হিসেবে গড়ে তোলা। 
                আমরা চাই প্রতিটি শিক্ষার্থী জ্ঞান, বিজ্ঞান ও প্রযুক্তিতে দক্ষ হয়ে সমাজের কল্যাণে নিজেদের নিয়োজিত করুক।
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">আমাদের দৃষ্টিভঙ্গি</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                আমাদের স্বপ্ন হলো পৈথারা উচ্চ বিদ্যালয়কে এই অঞ্চলের সেরা শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত করা। 
                আমরা চাই আমাদের প্রাক্তন শিক্ষার্থীরা দেশ ও বিদেশে নিজেদের মেধা ও যোগ্যতার পরিচয় দিক।
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bannnnnnnner.jpg"
                alt="বিদ্যালয়ের অনুষ্ঠান"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Floating Quote */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
                <div className="text-center">
                  <div className="text-3xl text-blue-600 mb-2">&ldquo;</div>
                  <div className="text-sm text-gray-700 font-medium">শিক্ষাই জাতির মেরুদণ্ড</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">আমাদের যাত্রা</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              তিন দশকেরও বেশি সময় ধরে শিক্ষার আলো ছড়িয়ে চলেছি
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Facilities Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">আমাদের সুবিধাসমূহ</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              শিক্ষার্থীদের সর্বোচ্চ সুবিধা প্রদানের জন্য আমরা সর্বদা সচেষ্ট
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {facility.icon}
                </div>
                <div className="text-gray-900 font-medium">{facility.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
          
          <motion.div variants={itemVariants} className="relative z-10 text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">আমাদের অর্জন</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              তিন দশকেরও বেশি সময় ধরে আমরা যে সাফল্য অর্জন করেছি
            </p>
          </motion.div>
          
          <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${item.color} rounded-2xl text-white mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">{item.value}</h3>
                <p className="text-blue-100">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
