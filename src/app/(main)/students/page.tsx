"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  BookOpenCheck,
  Eye,
  Filter,
  GraduationCap,
  Phone,
  Search,
  TrendingUp,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Student {
  _id: string;
  name: string;
  roll: number;
  class: string;
  group?: string;
  gender: string;
  fatherName: string;
  motherName: string;
  guardianNumber: string;
  photo?: string;
  dateOfBirth?: string;
}

const StudentPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const classes = ["৬ষ্ঠ", "৭ম", "৮ম", "৯ম", "১০ম"];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/students");
      if (response.status === 200) {
        setStudents(response.data.data || []);
      }
    } catch {
      toast.error("ছাত্র-ছাত্রী তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.guardianNumber.includes(searchTerm);

    const matchesClass = !filterClass || student.class === filterClass;

    return matchesSearch && matchesClass;
  });

  const getClassColor = (cls: string) => {
    const colors: { [key: string]: string } = {
      "৬ষ্ঠ": "from-blue-500 to-blue-600",
      "৭ম": "from-green-500 to-green-600",
      "৮ম": "from-purple-500 to-purple-600",
      "৯ম": "from-orange-500 to-orange-600",
      "১০ম": "from-red-500 to-red-600",
    };
    return colors[cls] || "from-gray-500 to-gray-600";
  };

  const getClassIcon = (cls: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "৬ষ্ঠ": <BookOpen className="w-4 h-4" />,
      "৭ম": <BookOpenCheck className="w-4 h-4" />,
      "৮ম": <GraduationCap className="w-4 h-4" />,
      "৯ম": <Trophy className="w-4 h-4" />,
      "১০ম": <Award className="w-4 h-4" />,
    };
    return icons[cls] || <BookOpen className="w-4 h-4" />;
  };

  const getGenderColor = (gender: string) => {
    return gender === "পুরুষ"
      ? "from-blue-500 to-blue-600"
      : "from-pink-500 to-pink-600";
  };

  const getGenderIcon = (gender: string) => {
    return gender === "পুরুষ" ? (
      <User className="w-4 h-4" />
    ) : (
      <User className="w-4 h-4" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            ছাত্র-ছাত্রী তথ্য লোড হচ্ছে...
          </p>
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
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            আমাদের ছাত্র-ছাত্রী
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            ভবিষ্যতের নেতৃত্বদানকারী এবং দেশের সম্পদ হিসেবে গড়ে উঠছে আমাদের
            ছাত্র-ছাত্রীরা
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
                  ছাত্র-ছাত্রী তালিকা
                </h2>
                <p className="text-gray-600 text-lg">
                  সকল ছাত্র-ছাত্রীর তথ্য দেখুন
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white">
                <Users className="w-5 h-5" />
                <span className="font-bold">
                  মোট: {filteredStudents.length} জন
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="নাম, পিতার নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
              />
            </div>

            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors duration-300" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-300 hover:border-gray-400 appearance-none cursor-pointer"
              >
                <option value="">সব শ্রেণি</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls} শ্রেণি
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>সক্রিয় ছাত্র-ছাত্রী</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredStudents.length} জন
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Student Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredStudents.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 p-16 text-center bg-white rounded-3xl shadow-xl border border-gray-100">
              <GraduationCap className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                কোনো ছাত্র-ছাত্রী পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                অনুসন্ধানের শর্ত পরিবর্তন করুন।
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterClass("");
                }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>সব দেখুন</span>
              </button>
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 transform hover:shadow-2xl hover:-translate-y-3"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Photo Section */}
                <div className="relative p-8 pb-4">
                  <div className="relative w-32 h-32 mx-auto">
                    {student.photo ? (
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="rounded-full object-cover border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <GraduationCap className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Roll Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">
                      {student.roll}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-8 pb-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {student.name}
                  </h3>

                  {/* Class and Group */}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${getClassColor(
                        student.class
                      )} rounded-full text-white text-sm font-medium`}
                    >
                      {getClassIcon(student.class)}
                      <span>{student.class} শ্রেণি</span>
                    </div>
                    {student.group && (
                      <div className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-white text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        <span>{student.group}</span>
                      </div>
                    )}
                  </div>

                  {/* Gender Badge */}
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${getGenderColor(
                        student.gender
                      )} rounded-full text-white text-sm font-medium`}
                    >
                      {getGenderIcon(student.gender)}
                      <span>{student.gender}</span>
                    </div>
                  </div>

                  {/* Family Info */}
                  <div className="space-y-3 text-left mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="truncate">
                        পিতা: {student.fatherName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
                      <User className="w-4 h-4 text-green-500" />
                      <span className="truncate">
                        মাতা: {student.motherName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                      <Phone className="w-4 h-4 text-purple-500" />
                      <span>অভিভাবক: {student.guardianNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50" />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {classes.map((cls, index) => {
            const classStudents = students.filter((s) => s.class === cls);
            const maleStudents = classStudents.filter(
              (s) => s.gender === "পুরুষ"
            ).length;
            const femaleStudents = classStudents.filter(
              (s) => s.gender === "মহিলা"
            ).length;

            return (
              <motion.div
                key={cls}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`inline-flex p-3 bg-gradient-to-r ${getClassColor(
                    cls
                  )} rounded-2xl text-white mb-4`}
                >
                  {getClassIcon(cls)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {cls} শ্রেণি
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {classStudents.length} জন
                </div>
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <span>ছেলে: {maleStudents}</span>
                  <span>মেয়ে: {femaleStudents}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
      </div>
    </div>
  );
};

export default StudentPage;
