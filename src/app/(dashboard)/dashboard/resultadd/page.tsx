"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import Swal from "sweetalert2";

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

export default function ResultPage() {
  const [formData, setFormData] = useState({
    class: "",
    group: "",
    examType: "",
    totalStudents: "",
    passed: "",
    failed: "",
    year: "",
  });

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

  // ফর্ম সাবমিট করার ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      class: cls,
      group,
      examType,
      totalStudents,
      passed,
      failed,
      year,
    } = formData;

    // সব ফিল্ড পূরণ হয়েছে কিনা তা যাচাই করা
    if (!cls || !examType || !totalStudents || !passed || !failed || !year) {
      toast.error("সব ফিল্ড পূরণ করুন");
      return;
    }

    try {
      const newResult = {
        class: parseInt(cls),
        group: cls === "9" || cls === "10" ? group : null,
        examType,
        totalStudents: parseInt(totalStudents),
        passed: parseInt(passed),
        failed: parseInt(failed),
        year: parseInt(year),
      };

      // API-তে ডেটা পাঠানো
      const res = await axiosInstance.post("/results", newResult);
      console.log("Successful response from API:", res.data);

      Swal.fire("✅ যুক্ত হয়েছে!", "রেজাল্ট সফলভাবে সংরক্ষিত হয়েছে", "success");
      
      // ফর্ম রিসেট করা
      setFormData({
        class: "",
        group: "",
        examType: "",
        totalStudents: "",
        passed: "",
        failed: "",
        year: "",
      });

      // নতুন ডেটা লোড করা
      fetchResults();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to add result:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        Swal.fire(
          "❌ ভুল হয়েছে!",
          error.response.data?.message || "রেজাল্ট যুক্ত করা যায়নি",
          "error"
        );
      } else {
        Swal.fire("❌ ভুল হয়েছে!", "নেটওয়ার্ক ত্রুটি অথবা সার্ভার ডাউন।", "error");
      }
    }
  };

  // ডিলিট করার ফাংশন
  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই রেজাল্ট ডিলিট করলে আর ফেরত পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "বাতিল করুন",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.delete(`/results/${id}`);
        Swal.fire("✅ ডিলিট হয়েছে", "রেজাল্ট মুছে ফেলা হয়েছে", "success");
        fetchResults();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to delete result:", error);
        if (error.response) {
          Swal.fire(
            "❌ সমস্যা হয়েছে",
            error.response.data?.message || "ডিলিট করতে ব্যর্থ",
            "error"
          );
        } else {
          Swal.fire("❌ সমস্যা হয়েছে", "নেটওয়ার্ক ত্রুটি অথবা সার্ভার ডাউন।", "error");
        }
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border p-6 flex items-center space-x-4"
      >
        <Link href="/dashboard">
          <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </div>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">রেজাল্ট বোর্ড</h1>
          <p className="text-gray-600 text-lg">
            সব শ্রেণির রেজাল্ট দেখুন ও যুক্ত করুন
          </p>
        </div>
      </motion.div>

      {/* Result List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <h2 className="text-xl font-semibold mb-4">📊 সকল রেজাল্ট</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              রেজাল্ট লোড হচ্ছে...
            </div>
          ) : results.length > 0 ? (
            results.map((result) => (
              <div
                key={result._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 p-4 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {result.class}ম শ্রেণি{" "}
                    {result.group && <span>({result.group})</span>} —{" "}
                    {result.examType}
                  </p>
                  <p className="text-sm text-gray-600">
                    শিক্ষার্থী: {result.totalStudents} | পাস: {result.passed} |
                    ফেল: {result.failed} | সাল: {result.year}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(result._id)}
                  className="bg-red-500 text-white px-4 py-2 mt-2 md:mt-0 rounded hover:bg-red-600 text-sm"
                >
                  ডিলিট
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">
              কোনো রেজাল্ট পাওয়া যায়নি
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Result Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <h2 className="text-xl font-semibold mb-4">➕ নতুন রেজাল্ট যুক্ত করুন</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Class */}
          <div>
            <label>শ্রেণি</label>
            <select
              name="class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">নির্বাচন করুন</option>
              {[6, 7, 8, 9, 10].map((cls) => (
                <option key={cls} value={cls}>
                  {cls}ম শ্রেণি
                </option>
              ))}
            </select>
          </div>

          {/* Group */}
          {(formData.class === "9" || formData.class === "10") && (
            <div>
              <label>গ্রুপ</label>
              <select
                name="group"
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">গ্রুপ নির্বাচন করুন</option>
                <option value="বিজ্ঞান">বিজ্ঞান</option>
                <option value="বাণিজ্য">বাণিজ্য</option>
                <option value="মানবিক">মানবিক</option>
              </select>
            </div>
          )}

          {/* Exam Type */}
          <div>
            <label>পরীক্ষার ধরণ</label>
            <select
              name="examType"
              value={formData.examType}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">নির্বাচন করুন</option>
              <option value="অর্ধ-বার্ষিক">অর্ধ-বার্ষিক</option>
              <option value="বার্ষিক">বার্ষিক</option>
            </select>
          </div>

          <div>
            <label>মোট শিক্ষার্থী</label>
            <input
              type="number"
              value={formData.totalStudents}
              onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label>পাস করেছে</label>
            <input
              type="number"
              value={formData.passed}
              onChange={(e) => setFormData({ ...formData, passed: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label>ফেল করেছে</label>
            <input
              type="number"
              value={formData.failed}
              onChange={(e) => setFormData({ ...formData, failed: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label>সাল</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              ✅ রেজাল্ট যুক্ত করুন
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
