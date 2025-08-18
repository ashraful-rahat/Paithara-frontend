// components/ResultPage.tsx or app/results/page.tsx

'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from "react-hot-toast";
import { BarChart3, ArrowLeft, Globe, SquareTerminal, FileText } from 'lucide-react';
import axiosInstance from "@/utils/axios";

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

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* হেডার এবং গুরুত্বপূর্ণ লিংক সেকশন */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/dashboard" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">রেজাল্ট বোর্ড</h1>
            <p className="text-gray-600 text-lg">
              সকল রেজাল্ট দেখুন ও গুরুত্বপূর্ণ ওয়েবসাইটে যান
            </p>
          </div>
        </div>

        {/* এক্সটারনাল লিংক UI */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.a
            href="https://www.educationboardresults.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md transition-transform transform"
          >
            <Globe className="w-8 h-8" />
            <div className="font-semibold text-lg">শিক্ষা বোর্ডের ফলাফল</div>
          </motion.a>

          <motion.a
            href="https://comillaboard.portal.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl shadow-md transition-transform transform"
          >
            <SquareTerminal className="w-8 h-8" />
            <div className="font-semibold text-lg">কুমিল্লা বোর্ড</div>
          </motion.a>

          <motion.a
            href="https://banbeis.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-md transition-transform transform"
          >
            <FileText className="w-8 h-8" />
            <div className="font-semibold text-lg">ব্যানবেইস</div>
          </motion.a>
        </div>
      </motion.div>

      {/* রেজাল্ট কার্ড সেকশন */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-800">আমাদের স্কুলের ফলাফল</h2>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            রেজাল্ট লোড হচ্ছে...
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <motion.div
                key={result._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="font-bold text-xl text-gray-800 mb-2">
                  {result.class}ম শ্রেণি {result.group && `(${result.group})`}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium text-gray-700">পরীক্ষা:</span> {result.examType}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">শিক্ষার্থী:</span> {result.totalStudents} জন
                  </p>
                  <p>
                    <span className="font-medium text-green-600">পাস:</span> {result.passed} জন
                  </p>
                  <p>
                    <span className="font-medium text-red-600">ফেল:</span> {result.failed} জন
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">সাল:</span> {result.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            কোনো রেজাল্ট ডেটা পাওয়া যায়নি।
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResultPage;