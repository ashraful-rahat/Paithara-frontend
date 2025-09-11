"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Settings,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  totalClasses: number;
  recentActivities: number;
}

const DashboardPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalStaff: 0,
    totalClasses: 5,
    recentActivities: 0,
  });

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
      router.push("/login"); // token নাই → login page
    } else if (role !== "admin") {
      router.push("/"); // normal user → home page
    } else {
      setLoading(false); // admin allowed
    }
  }, [router]);

  // 🟢 এখানে loading use করা হলো
  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  const statCards = [
    {
      title: "মোট ছাত্র-ছাত্রী",
      value: stats.totalStudents,
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      link: "/Dashboard/students",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "মোট কর্মকর্তা-কর্মচারী",
      value: stats.totalStaff,
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      link: "/Dashboard/staff",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "মোট শ্রেণি",
      value: stats.totalClasses,
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      link: "/Dashboard/classes",
      change: "+2",
      changeType: "positive",
    },
    {
      title: "সাম্প্রতিক কার্যক্রম",
      value: stats.recentActivities,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      link: "/Dashboard/activities",
      change: "+8%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      title: "ছাত্র-ছাত্রী যোগ করুন",
      description: "নতুন ছাত্র-ছাত্রী নিবন্ধন করুন",
      icon: UserPlus,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/Dashboard/studentadd",
    },
    {
      title: "কর্মকর্তা যোগ করুন",
      description: "নতুন কর্মকর্তা-কর্মচারী নিবন্ধন করুন",
      icon: UserPlus,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      link: "/Dashboard/Staffadd",
    },
    {
      title: "রিপোর্ট দেখুন",
      description: "বিভিন্ন রিপোর্ট এবং পরিসংখ্যান দেখুন",
      icon: FileText,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/Dashboard/reports",
    },
    {
      title: "সেটিংস",
      description: "সিস্টেম সেটিংস পরিবর্তন করুন",
      icon: Settings,
      color: "bg-gray-500",
      textColor: "text-gray-600",
      bgColor: "bg-gray-50",
      link: "/Dashboard/settings",
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
    {
      id: 4,
      type: "notice",
      message: "নতুন নোটিশ প্রকাশ",
      time: "২ দিন আগে",
      status: "completed",
      count: 3,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              পাইথারা উচ্চ বিদ্যালয় ড্যাশবোর্ড
            </h1>
            <p className="text-gray-600 text-lg">
              বিদ্যালয়ের সকল তথ্য এবং কার্যক্রম পরিচালনা করুন
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="text-sm text-gray-500">
              আজকের তারিখ: {new Date().toLocaleDateString("bn-BD")}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={card.link}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      গত মাস থেকে
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        card.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {card.change}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {card.value}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              দ্রুত কার্যক্রম
            </h2>
            <Link
              href="/Dashboard/actions"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              সব দেখুন
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={action.title} href={action.link}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div
                    className={`p-3 rounded-lg w-fit mb-3 ${action.bgColor}`}
                  >
                    <action.icon className={`w-5 h-5 ${action.textColor}`} />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
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
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${getStatusColor(
                  activity.status
                )}`}
              >
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.count} টি আইটেম • {activity.time}
                  </p>
                </div>
                <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              আগামী ইভেন্ট
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">মিড টার্ম পরীক্ষা</p>
                <p className="text-sm text-gray-600">১৫ ডিসেম্বর, ২০২৪</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600 font-medium">৩ দিন বাকি</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">বছর শেষ অনুষ্ঠান</p>
                <p className="text-sm text-gray-600">২৫ ডিসেম্বর, ২০২৪</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600 font-medium">
                  ১৩ দিন বাকি
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              দ্রুত পরিসংখ্যান
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">গড় উপস্থিতি</span>
              <span className="font-semibold text-gray-900">৯৫%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "95%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">পাসের হার</span>
              <span className="font-semibold text-gray-900">৮৮%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <Settings className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              সিস্টেম স্ট্যাটাস
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ডাটাবেস</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">অনলাইন</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API সার্ভার</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">অনলাইন</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ফাইল স্টোরেজ</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">অনলাইন</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
