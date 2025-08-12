"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
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
  Clock,
  MapPin,
  FileText,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import Swal from "sweetalert2";

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
    } catch (error) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
                  কর্মকর্তা-কর্মচারী তালিকা
                </h1>
                <p className="text-gray-600 text-lg">
                  সকল কর্মকর্তা-কর্মচারীর তথ্য দেখুন
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">সব পদবি</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">মোট কর্মকর্তা-কর্মচারী</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredStaff.length} জন
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Staff Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredStaff.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-white rounded-xl shadow-sm border border-gray-200">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                কোনো কর্মকর্তা-কর্মচারী পাওয়া যায়নি
              </h3>
              <p className="text-gray-600">অনুসন্ধানের শর্ত পরিবর্তন করুন।</p>
            </div>
          ) : (
            filteredStaff.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="relative w-28 h-28 mb-4">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {member.category}
                </p>

                <div className="flex items-center space-x-2 text-sm mb-4">
                  {member.qualification && (
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {member.qualification}
                    </span>
                  )}
                  {member.experience !== undefined && (
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {member.experience} বছর অভিজ্ঞতা
                    </span>
                  )}
                </div>

                <div className="space-y-1 w-full text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherPage;
