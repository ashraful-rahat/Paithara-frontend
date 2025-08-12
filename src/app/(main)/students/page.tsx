"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  GraduationCap,
  Search,
  ArrowLeft,
  Filter,
  User,
  Phone,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";

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
    } catch (error) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/Dashboard">
                <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </div>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  ছাত্র-ছাত্রী তালিকা
                </h1>
                <p className="text-gray-600 text-lg">
                  সকল ছাত্র-ছাত্রীর তথ্য দেখুন
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="নাম, পিতার নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">সব শ্রেণি</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls} শ্রেণি
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">মোট ছাত্র-ছাত্রী</p>
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
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredStudents.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-white rounded-xl shadow-sm border border-gray-200">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো ছাত্র-ছাত্রী পাওয়া যায়নি
              </h3>
              <p className="text-gray-600">অনুসন্ধানের শর্ত পরিবর্তন করুন।</p>
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="relative w-28 h-28 mb-4">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="h-full w-full rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                      <GraduationCap className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {student.name}
                </h3>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {student.class} শ্রেণি
                </p>

                <div className="flex items-center space-x-2 text-sm mb-4">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    রোল: {student.roll}
                  </span>
                  {student.group && (
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {student.group}
                    </span>
                  )}
                </div>

                <div className="space-y-1 w-full text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>পিতা: {student.fatherName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>অভিভাবক: {student.guardianNumber}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentPage;
