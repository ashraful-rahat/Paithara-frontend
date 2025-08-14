"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Filter,
  X,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
  Clock,
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

const StaffListPage = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      setStaff(response.data.data || []);
    } catch {
      toast.error("কর্মকর্তা-কর্মচারী তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই কর্মকর্তা-কর্মচারীকে মুছে ফেলার পর আর ফিরিয়ে আনা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "না, বাতিল করুন",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // এখানে axiosInstance ব্যবহার করে DELETE রিকোয়েস্ট করা হয়েছে
          const response = await axiosInstance.delete(`/staff/${id}`);

          if (response.status === 200) {
            Swal.fire(
              "মুছে ফেলা হয়েছে!",
              "কর্মকর্তা-কর্মচারীর তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
              "success"
            );
            fetchStaff();
          } else {
            Swal.fire(
              "সমস্যা হয়েছে!",
              "কর্মকর্তা-কর্মচারী মুছতে সমস্যা হয়েছে।",
              "error"
            );
          }
        } catch {
          Swal.fire("ভুল হয়েছে!", "কিছু ভুল হয়েছে।", "error");
        }
      }
    });
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

  const openModal = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setShowModal(true);
  };

  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {};
    categories.forEach((category) => {
      stats[category] = staff.filter((s) => s.category === category).length;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
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
                সকল কর্মকর্তা-কর্মচারীর তথ্য দেখুন এবং পরিচালনা করুন
              </p>
            </div>
          </div>
          <Link href="/Dashboard/Staffadd">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-5 h-5 mr-2" />
              নতুন যোগ করুন
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Category Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {categories.slice(0, 5).map((category) => {
          const count = getCategoryStats()[category];
          return (
            <div
              key={category}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center"
            >
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {count}
              </div>
              <div className="text-sm text-gray-600 leading-tight">
                {category}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Staff List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {filteredStaff.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোন কর্মকর্তা-কর্মচারী পাওয়া যায়নি
            </h3>
            <p className="text-gray-600 mb-6">
              নতুন কর্মকর্তা-কর্মচারী যোগ করুন অথবা অনুসন্ধানের শর্ত পরিবর্তন
              করুন
            </p>
            <Link href="/Dashboard/Staffadd">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                কর্মকর্তা যোগ করুন
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ছবি
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    নাম
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    পদবি
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    যোগাযোগ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    যোগদানের তারিখ
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    কার্যক্রম
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((member, index) => (
                  <motion.tr
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-12 w-12">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover border-2 border-gray-200"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      {member.qualification && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          {member.qualification}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {member.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {member.dateOfJoining
                          ? new Date(member.dateOfJoining).toLocaleDateString(
                              "bn-BD"
                            )
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openModal(member)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          title="দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link href={`/Dashboard/staff/edit/${member._id}`}>
                          <button
                            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                          title="মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                কর্মকর্তা-কর্মচারীর বিস্তারিত তথ্য
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="relative w-full h-80">
                  <Image
                    src={selectedStaff.photo}
                    alt={selectedStaff.name}
                    fill
                    className="object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedStaff.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {selectedStaff.category}
                    </span>
                    {selectedStaff.isActive ? (
                      <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                        সক্রিয়
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                        নিষ্ক্রিয়
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">ইমেইল</p>
                        <p className="font-medium text-gray-900">
                          {selectedStaff.email}
                        </p>
                      </div>
                    </div>
                    {selectedStaff.phone && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">ফোন</p>
                          <p className="font-medium text-gray-900">
                            {selectedStaff.phone}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedStaff.qualification && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">যোগ্যতা</p>
                          <p className="font-medium text-gray-900">
                            {selectedStaff.qualification}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedStaff.experience && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">অভিজ্ঞতা</p>
                          <p className="font-medium text-gray-900">
                            {selectedStaff.experience} বছর
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedStaff.dateOfJoining && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">যোগদানের তারিখ</p>
                        <p className="font-medium text-gray-900">
                          {new Date(
                            selectedStaff.dateOfJoining
                          ).toLocaleDateString("bn-BD")}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedStaff.address && (
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">ঠিকানা</p>
                        <p className="font-medium text-gray-900">
                          {selectedStaff.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedStaff.subjectPreferences &&
                  selectedStaff.subjectPreferences.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        বিষয় পছন্দ:
                      </h4>
                      <div className="space-y-3">
                        {selectedStaff.subjectPreferences.map((pref, index) => (
                          <div
                            key={index}
                            className="p-3 bg-blue-50 rounded-lg"
                          >
                            <p className="font-medium text-blue-900 mb-1">
                              {pref.class} শ্রেণি
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {pref.subjects.map((subject, subIndex) => (
                                <span
                                  key={subIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StaffListPage;
