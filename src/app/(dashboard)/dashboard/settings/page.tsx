"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";

const Settings = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">সেটিংস</h1>
          <p className="text-gray-600 text-lg">সিস্টেম সেটিংস পরিচালনা করুন</p>
        </div>
      </motion.div>

      {/* Under Development Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
      >
        <SettingsIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          এই পৃষ্ঠাটি নির্মাণাধীন
        </h2>
        <p className="text-gray-600 mb-6">
          আমরা দ্রুতই এই ফিচারটি নিয়ে কাজ করছি। শীঘ্রই ফিরে আসুন!
        </p>
        <Link href="/dashboard">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ড্যাশবোর্ডে ফিরে যান
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Settings;
