"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Users,
  GraduationCap,
  BarChart2,
  List,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  User as UserIcon,
  ArrowRight,
  Bell,
  FileText,
} from "lucide-react";
import Link from "next/link";

const ReportPage = () => {
  const studentStats = {
    total: 1250,
    male: 650,
    female: 600,
    newThisMonth: 50,
  };

  const staffStats = {
    total: 85,
    teachers: 70,
    admin: 10,
    newThisMonth: 2,
  };

  const classPerformance = [
    { class: "১০ম", passingRate: 98, averageGrade: 85 },
    { class: "৯ম", passingRate: 95, averageGrade: 82 },
    { class: "৮ম", passingRate: 92, averageGrade: 78 },
    { class: "৭ম", passingRate: 90, averageGrade: 75 },
    { class: "৬ষ্ঠ", passingRate: 88, averageGrade: 72 },
  ];

  const recentReports = [
    {
      id: 1,
      title: "ছাত্র-ছাত্রীর উপস্থিতি রিপোর্ট (নভেম্বর)",
      date: "১২ নভেম্বর, ২০২৪",
      link: "#",
    },
    {
      id: 2,
      title: "শিক্ষক ও শিক্ষার্থীর অনুপাত বিশ্লেষণ",
      date: "১০ নভেম্বর, ২০২৪",
      link: "#",
    },
    {
      id: 3,
      title: "৬ষ্ঠ শ্রেণির ফলাফল বিশ্লেষণ",
      date: "০৫ নভেম্বর, ২০২৪",
      link: "#",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-4"
      >
        <Link href="/Dashboard">
          <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </div>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">রিপোর্ট</h1>
          <p className="text-gray-600 text-lg">
            বিভিন্ন পরিসংখ্যান এবং রিপোর্ট দেখুন
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                ছাত্র-ছাত্রীর পরিসংখ্যান
              </h3>
              <p className="text-sm text-gray-600">
                এই মাসে নতুন: {studentStats.newThisMonth}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-blue-600">
                {studentStats.total}
              </p>
              <p className="text-sm text-blue-800">মোট</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-pink-600">
                {studentStats.female}
              </p>
              <p className="text-sm text-pink-800">ছাত্রী</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                কর্মকর্তা-কর্মচারী পরিসংখ্যান
              </h3>
              <p className="text-sm text-gray-600">
                এই মাসে নতুন: {staffStats.newThisMonth}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-green-600">
                {staffStats.total}
              </p>
              <p className="text-sm text-green-800">মোট</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-orange-600">
                {staffStats.teachers}
              </p>
              <p className="text-sm text-orange-800">শিক্ষক</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <BarChart2 className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                শ্রেণি ভিত্তিক ফলাফল
              </h3>
              <p className="text-sm text-gray-600">সর্বশেষ পরীক্ষার ফলাফল</p>
            </div>
          </div>
          <div className="space-y-2">
            {classPerformance.map((cls, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <p className="text-sm text-gray-700">{cls.class} শ্রেণি</p>
                <p className="text-sm font-semibold text-gray-900">
                  {cls.passingRate}% পাশ
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              সাম্প্রতিক রিপোর্টসমূহ
            </h2>
            <Link
              href="/Dashboard/reports/all"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              সব দেখুন
            </Link>
          </div>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <a
                href={report.link}
                key={report.id}
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {report.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        প্রকাশিত: {report.date}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">দ্রুত লিঙ্ক</h2>
          </div>
          <div className="space-y-4">
            <Link
              href="/Dashboard/students"
              className="block p-4 bg-blue-50 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5" />
                  <p className="font-medium">ছাত্র-ছাত্রীর তালিকা</p>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            <Link
              href="/Dashboard/staff"
              className="block p-4 bg-green-50 rounded-lg text-green-800 hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <p className="font-medium">কর্মকর্তা-কর্মচারীর তালিকা</p>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            <Link
              href="/Dashboard/notices"
              className="block p-4 bg-purple-50 rounded-lg text-purple-800 hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5" />
                  <p className="font-medium">নোটিশ বোর্ড</p>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;
