// components/ResultPage.tsx or app/results/page.tsx

"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  SquareTerminal,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Result {
  _id?: string;
  class: number;
  group?: string | null;
  examType: string;
  totalStudents: number;
  passed: number;
  failed: number;
  year: number;
  createdAt?: string;
}

const ResultPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // রেজাল্ট লোড করার ফাংশন
  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get("/results");
      setResults(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch results:", error);
      toast.error("রেজাল্ট লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // ইউনিক ইয়ার্স লিস্ট
  const uniqueYears = [...new Set(results.map((result) => result.year))].sort(
    (a, b) => b - a
  );

  // ফিল্টার্ড রেজাল্টস
  const filteredResults =
    selectedYear === "all"
      ? results
      : results.filter((result) => result.year === selectedYear);

  // পাস পার্সেন্টেজ ক্যালকুলেশন
  const calculatePassPercentage = (passed: number, total: number) => {
    return total > 0 ? ((passed / total) * 100).toFixed(1) : "0";
  };

  // গুরুত্বপূর্ণ লিংকস
  const importantLinks = [
    {
      name: "শিক্ষা বোর্ডের ফলাফল",
      url: "https://www.educationboardresults.gov.bd/",
      icon: Globe,
      color: "from-blue-500 to-indigo-600",
      description: "সকল শিক্ষা বোর্ডের ফলাফল",
    },
    {
      name: "কুমিল্লা বোর্ড",
      url: "https://comillaboard.portal.gov.bd/",
      icon: SquareTerminal,
      color: "from-yellow-500 to-amber-600",
      description: "কুমিল্লা শিক্ষা বোর্ড",
    },
    {
      name: "ব্যানবেইস",
      url: "https://banbeis.gov.bd/",
      icon: FileText,
      color: "from-green-500 to-emerald-600",
      description: "বাংলাদেশ শিক্ষা তথ্য",
    },
    {
      name: "EMIS (মূল)",
      url: "https://www.emis.gov.bd/emis",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      description: "শিক্ষা ম্যানেজমেন্ট তথ্য",
    },
    {
      name: "EMIS (বিকল্প)",
      url: "https://dshe.portal.gov.bd/site/notices/48ae72b9-9a8d-4d0a-9066-811efa8ad445/EMIS-%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AD%E0%A6%BE%E0%A6%B0%E0%A7%87-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%AC%E0%A7%87%E0%A6%B6%E0%A7%87%E0%A6%B0-%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%B2%E0%A7%8D%E0%A6%AA-%E0%A6%B2%E0%A6%BF%E0%A6%82%E0%A6%95",
      icon: ExternalLink,
      color: "from-red-500 to-orange-600",
      description: "EMIS বিকল্প লিংক",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      {/* হেডার সেকশন */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                রেজাল্ট বোর্ড
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                সকল রেজাল্ট দেখুন ও গুরুত্বপূর্ণ ওয়েবসাইটে যান
              </p>
            </div>
          </div>

          {/* ইয়ার ফিল্টার */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="bg-transparent border-none focus:outline-none text-gray-700 font-medium"
            >
              <option value="all">সব বছর</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year} সাল
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* গুরুত্বপূর্ণ লিংকস */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-blue-500" />
            গুরুত্বপূর্ণ ওয়েবসাইট
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {importantLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-r ${link.color} text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <link.icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-sm mb-1">{link.name}</div>
                  <div className="text-white/80 text-xs">
                    {link.description}
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* রেজাল্ট স্ট্যাটস সারাংশ */}
      {filteredResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">মোট পরীক্ষার্থী</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredResults.reduce(
                    (sum, result) => sum + result.totalStudents,
                    0
                  )}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">মোট পাস</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredResults.reduce(
                    (sum, result) => sum + result.passed,
                    0
                  )}
                </p>
              </div>
              <Award className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">সর্বমোট পাসের হার</p>
                <p className="text-2xl font-bold text-gray-900">
                  {calculatePassPercentage(
                    filteredResults.reduce(
                      (sum, result) => sum + result.passed,
                      0
                    ),
                    filteredResults.reduce(
                      (sum, result) => sum + result.totalStudents,
                      0
                    )
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </motion.div>
      )}

      {/* রেজাল্ট কার্ড সেকশন */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                আমাদের স্কুলের ফলাফল
              </h2>
              <p className="text-gray-600">
                {selectedYear === "all"
                  ? "সকল বছরের ফলাফল"
                  : `${selectedYear} সালের ফলাফল`}
              </p>
            </div>
          </div>

          {filteredResults.length > 0 && (
            <div className="text-sm text-gray-500">
              মোট {filteredResults.length} টি রেজাল্ট
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-4">রেজাল্ট লোড হচ্ছে...</p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result, index) => (
              <motion.div
                key={result._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-blue-200 relative overflow-hidden"
              >
                {/* এক্সাম টাইপ ব্যাজ */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.examType.includes("বার্ষিক")
                        ? "bg-green-100 text-green-800"
                        : result.examType.includes("অর্ধবার্ষিক")
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {result.examType}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-xl text-gray-800">
                      {result.class}ম শ্রেণি{" "}
                      {result.group && `- ${result.group}`}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{result.year} সাল</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      মোট শিক্ষার্থী:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {result.totalStudents} জন
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      পাস:
                    </span>
                    <span className="font-semibold text-green-600">
                      {result.passed} জন
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      ফেল:
                    </span>
                    <span className="font-semibold text-red-600">
                      {result.failed} জন
                    </span>
                  </div>

                  {/* পাস পার্সেন্টেজ বার */}
                  <div className="pt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">পাসের হার</span>
                      <span className="font-semibold text-blue-600">
                        {calculatePassPercentage(
                          result.passed,
                          result.totalStudents
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${calculatePassPercentage(
                            result.passed,
                            result.totalStudents
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              কোনো রেজাল্ট ডেটা পাওয়া যায়নি
            </h3>
            <p className="text-gray-400">
              {selectedYear === "all"
                ? "বর্তমানে কোনো রেজাল্ট ডেটা নেই।"
                : `${selectedYear} সালে কোনো রেজাল্ট ডেটা নেই।`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResultPage;
