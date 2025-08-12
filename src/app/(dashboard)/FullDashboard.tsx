import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  BarChart3,
  FileText,
  Bell,
  Settings,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const FullDashboard = () => {
  const quickStats = [
    {
      title: "মোট ছাত্র-ছাত্রী",
      value: "১,২৫০",
      change: "+১২%",
      changeType: "positive",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "মোট কর্মকর্তা-কর্মচারী",
      value: "৮৫",
      change: "+৫%",
      changeType: "positive",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "মোট শ্রেণি",
      value: "৫",
      change: "+২",
      changeType: "positive",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "সাম্প্রতিক কার্যক্রম",
      value: "২৩",
      change: "+৮%",
      changeType: "positive",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "student",
      message: "নতুন ছাত্র-ছাত্রী নিবন্ধন",
      time: "২ ঘণ্টা আগে",
      status: "completed",
      count: 5,
    },
    {
      id: 2,
      type: "staff",
      message: "কর্মকর্তা তথ্য আপডেট",
      time: "৪ ঘণ্টা আগে",
      status: "pending",
      count: 2,
    },
    {
      id: 3,
      type: "exam",
      message: "মিড টার্ম পরীক্ষার ফলাফল প্রকাশ",
      time: "১ দিন আগে",
      status: "completed",
      count: 1,
    },
  ];

  const upcomingEvents = [
    {
      title: "মিড টার্ম পরীক্ষা",
      date: "১৫ ডিসেম্বর, ২০২৪",
      daysLeft: 3,
      color: "blue",
    },
    {
      title: "বছর শেষ অনুষ্ঠান",
      date: "২৫ ডিসেম্বর, ২০২৪",
      daysLeft: 13,
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">স্বাগতম!</h1>
            <p className="text-xl text-blue-100">
              পৈথারা উচ্চ বিদ্যালয়ের ড্যাশবোর্ডে
            </p>
            <p className="text-blue-200 mt-2">
              আজ {new Date().toLocaleDateString("bn-BD")} - আপনার দিনটি শুভ হোক
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {new Date().getHours()}:
                  {new Date().getMinutes().toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-blue-200">বর্তমান সময়</div>
              </div>
              <div className="w-px h-12 bg-blue-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{new Date().getDate()}</div>
                <div className="text-sm text-blue-200">তারিখ</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">গত মাস থেকে</div>
                  <div
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              সাম্প্রতিক কার্যক্রম
            </h2>
            <Link
              href="/Dashboard/activities"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              সব দেখুন
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    activity.status === "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.count} টি আইটেম • {activity.time}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status === "completed" ? "সম্পন্ন" : "অপেক্ষমান"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              আগামী ইভেন্ট
            </h3>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  event.color === "blue"
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <div
                    className={`text-right ${
                      event.color === "blue"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    <p className="text-xs font-medium">
                      {event.daysLeft} দিন বাকি
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          দ্রুত কার্যক্রম
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/studentadd">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="p-3 rounded-lg w-fit mb-3 bg-blue-50">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                ছাত্র-ছাত্রী যোগ করুন
              </h3>
              <p className="text-sm text-gray-600">
                নতুন ছাত্র-ছাত্রী নিবন্ধন করুন
              </p>
            </div>
          </Link>

          <Link href="/dashboard/Staffadd">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="p-3 rounded-lg w-fit mb-3 bg-green-50">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                কর্মকর্তা যোগ করুন
              </h3>
              <p className="text-sm text-gray-600">
                নতুন কর্মকর্তা-কর্মচারী নিবন্ধন করুন
              </p>
            </div>
          </Link>

          <Link href="/dashboard/reports">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="p-3 rounded-lg w-fit mb-3 bg-purple-50">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                রিপোর্ট দেখুন
              </h3>
              <p className="text-sm text-gray-600">
                বিভিন্ন রিপোর্ট এবং পরিসংখ্যান দেখুন
              </p>
            </div>
          </Link>

          <Link href="/dashboard/settings">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all cursor-pointer group">
              <div className="p-3 rounded-lg w-fit mb-3 bg-gray-50">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                সেটিংস
              </h3>
              <p className="text-sm text-gray-600">
                সিস্টেম সেটিংস পরিবর্তন করুন
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FullDashboard;
