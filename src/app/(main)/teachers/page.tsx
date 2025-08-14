"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  Users,
  Search,
  ArrowLeft,
  Filter,
  User,
  Phone,
  BookOpen,
  Award,
  Mail,
  FileText,
  Star,
  GraduationCap,
  Calendar,
  Eye,
  Heart,
  Trophy,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";


interface Staff {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  qualification?: string;
  experience?: number;
  address?: string;
  photo: string;
  dateOfJoining?: string;
  subjectPreferences?: Array<{
    class: string;
    subjects: string[];
  }>;
  isActive: boolean;
  createdAt: string;
}

const TeacherPage = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    "সহকারী শিক্ষক",
    "প্রধান শিক্ষক",
    "বিষয় ভিত্তিক শিক্ষক",
    "ক্লার্ক",
    "দপ্তরী",
    "অতিথি শিক্ষক",
    "লাইব্রেরিয়ান",
    "গার্ড",
    "অ্যাকাউন্টেন্ট",
    "প্রশাসক",
  ];

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axiosInstance.get("/staff");
      if (response.status === 200) {
        setStaff(response.data.data || []);
      }
    } catch {
      toast.error("কর্মকর্তা-কর্মচারী তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.phone && member.phone.includes(searchTerm));

    const matchesCategory =
      !filterCategory || member.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "প্রধান শিক্ষক": "from-red-500 to-red-600",
      "সহকারী শিক্ষক": "from-blue-500 to-blue-600",
      "বিষয় ভিত্তিক শিক্ষক": "from-green-500 to-green-600",
      "ক্লার্ক": "from-purple-500 to-purple-600",
      "দপ্তরী": "from-orange-500 to-orange-600",
      "অতিথি শিক্ষক": "from-pink-500 to-pink-600",
      "লাইব্রেরিয়ান": "from-indigo-500 to-indigo-600",
      "গার্ড": "from-yellow-500 to-yellow-600",
      "অ্যাকাউন্টেন্ট": "from-teal-500 to-teal-600",
      "প্রশাসক": "from-cyan-500 to-cyan-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "প্রধান শিক্ষক": <Trophy className="w-4 h-4" />,
      "সহকারী শিক্ষক": <GraduationCap className="w-4 h-4" />,
      "বিষয় ভিত্তিক শিক্ষক": <BookOpen className="w-4 h-4" />,
      "ক্লার্ক": <FileText className="w-4 h-4" />,
      "দপ্তরী": <Users className="w-4 h-4" />,
      "অতিথি শিক্ষক": <Star className="w-4 h-4" />,
      "লাইব্রেরিয়ান": <BookOpen className="w-4 h-4" />,
      "গার্ড": <Award className="w-4 h-4" />,
      "অ্যাকাউন্টেন্ট": <FileText className="w-4 h-4" />,
      "প্রশাসক": <Users className="w-4 h-4" />,
    };
    return icons[category] || <User className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">কর্মকর্তা-কর্মচারী তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

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
            className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            আমাদের কর্মকর্তা-কর্মচারী
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            যোগ্য ও অভিজ্ঞ শিক্ষকমণ্ডলী এবং দক্ষ কর্মকর্তা-কর্মচারীদের পরিচয়
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <Link href="/">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <ArrowLeft className="w-6 h-6" />
                </div>
              </Link>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  কর্মকর্তা-কর্মচারী তালিকা
                </h2>
                <p className="text-gray-600 text-lg">
                  সকল কর্মকর্তা-কর্মচারীর তথ্য দেখুন
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white">
                <Users className="w-5 h-5" />
                <span className="font-bold">মোট: {filteredStaff.length} জন</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
              />
            </div>

            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors duration-300" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-300 hover:border-gray-400 appearance-none cursor-pointer"
              >
                <option value="">সব পদবি</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>সক্রিয় কর্মকর্তা-কর্মচারী</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredStaff.filter(s => s.isActive).length} জন
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Staff Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredStaff.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 p-16 text-center bg-white rounded-3xl shadow-xl border border-gray-100">
              <Users className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                কোনো কর্মকর্তা-কর্মচারী পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 text-lg mb-6">অনুসন্ধানের শর্ত পরিবর্তন করুন।</p>
              <button 
                onClick={() => { setSearchTerm(""); setFilterCategory(""); }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>সব দেখুন</span>
              </button>
            </div>
          ) : (
            filteredStaff.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 transform hover:shadow-2xl hover:-translate-y-3"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    member.isActive 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}>
                    {member.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Photo Section */}
                <div className="relative p-8 pb-4">
                  <div className="relative w-32 h-32 mx-auto">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Online Status */}
                    <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${
                      member.isActive ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-8 pb-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${getCategoryColor(member.category)} rounded-full text-white text-sm font-medium`}>
                      {getCategoryIcon(member.category)}
                      <span>{member.category}</span>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.qualification && (
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        {member.qualification}
                      </span>
                    )}
                    {member.experience !== undefined && (
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                        {member.experience} বছর অভিজ্ঞতা
                      </span>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    {member.dateOfJoining && (
                      <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>যোগদান: {member.dateOfJoining}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center space-x-3 mt-6 pt-6 border-t border-gray-100">
                    <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50" />
              </motion.div>
            ))
          )}
        </motion.div>
        </div>
      
    </div>
  );
};

export default TeacherPage;
