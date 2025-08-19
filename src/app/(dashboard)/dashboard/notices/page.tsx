"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Bell,
  ArrowLeft,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import Swal from "sweetalert2";

interface Notice {
  _id?: string;
  title: string;
  link?: string;
  createdAt?: string;
}

const NoticePage = () => {
  const [formData, setFormData] = useState({ title: "", link: "" });
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notices from backend
  const fetchNotices = async () => {
    try {
      const res = await axiosInstance.get("/notices");
      setNotices(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      toast.error("নোটিশ লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("নোটিশের শিরোনাম দিন");
      return;
    }
    setLoading(true);

    try {
      const dataToSend = {
        title: formData.title,
        ...(formData.link && { link: formData.link }),
      };
      
      const res = await axiosInstance.post("/notices", dataToSend);
      console.log("Successful response from API:", res.data);

      Swal.fire({
        icon: "success",
        title: "নোটিশ যুক্ত হয়েছে!",
        text: "আপনার নোটিশ সফলভাবে যুক্ত করা হয়েছে।",
        confirmButtonText: "ঠিক আছে",
      });

      setFormData({ title: "", link: "" });
      fetchNotices();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to add notice:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "ভুল হয়েছে!",
          text: error.response.data?.message || "নোটিশ যুক্ত করতে সমস্যা হয়েছে।",
          confirmButtonText: "ঠিক আছে",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ভুল!",
          text: "নেটওয়ার্ক ত্রুটি অথবা সার্ভার ডাউন।",
          confirmButtonText: "ঠিক আছে",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id?: string) => {
    if (!id) return;

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই নোটিশটি মুছে ফেলার পর আর ফিরিয়ে আনা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "না, বাতিল করুন",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/notices/${id}`);
          Swal.fire(
            "মুছে ফেলা হয়েছে!",
            "নোটিশটি সফলভাবে মুছে ফেলা হয়েছে।",
            "success"
          );
          fetchNotices();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("Failed to delete notice:", error);
          if (error.response) {
            Swal.fire({
              icon: "error",
              title: "ভুল হয়েছে!",
              text: error.response.data?.message || "নোটিশ মুছতে সমস্যা হয়েছে।",
              confirmButtonText: "ঠিক আছে",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "ভুল!",
              text: "নেটওয়ার্ক ত্রুটি অথবা সার্ভার ডাউন।",
              confirmButtonText: "ঠিক আছে",
            });
          }
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
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
          <h1 className="text-3xl font-bold text-gray-900">নোটিশ</h1>
          <p className="text-gray-600 text-lg">নোটিশ যুক্ত ও পরিচালনা করুন</p>
        </div>
      </motion.div>

      {/* Add Notice Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            নতুন নোটিশ যোগ করুন
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="নোটিশের শিরোনাম"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            required
          />
          <input
            type="url"
            placeholder="ঐচ্ছিক লিঙ্ক"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            নোটিশ যুক্ত করুন
          </button>
        </form>
      </motion.div>

      {/* Notices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">সকল নোটিশ</h2>
        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <motion.div
                key={notice._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 p-4 rounded-lg bg-gray-50"
              >
                <div className="flex-1 mb-2 md:mb-0">
                  <p className="font-semibold text-gray-900">{notice.title}</p>
                  {notice.link && (
                    <a
                      href={notice.link}
                      className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      {notice.link}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm text-sm"
                >
                  মুছে ফেলুন
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 text-gray-500">
              কোনো নোটিশ পাওয়া যায়নি।
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NoticePage;
