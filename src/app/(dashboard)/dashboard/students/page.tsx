"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  GraduationCap,
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
  MapPin,
  User,
  Users,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import Swal from "sweetalert2"; // SweetAlert2 ইমপোর্ট করা হয়েছে

interface Student {
  _id: string;
  name: string;
  roll: number;
  class: string;
  group?: string;
  gender: string;
  fatherName: string;
  motherName: string;
  guardianNumber: string;
  address?: string;
  photo?: string;
  dateOfBirth?: string;
  isActive: boolean;
  createdAt: string;
}

const StudentListPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);

  const classes = ["৬ষ্ঠ", "৭ম", "৮ম", "৯ম", "১০ম"];
  const groups = ["সাধারণ", "বিজ্ঞান", "মানবিক", "ব্যবসায়"];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/students");
      if (response.status === 200) {
        setStudents(response.data.data || []);
      }
    } catch (error) {
      toast.error("ছাত্র-ছাত্রী তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই ছাত্র-ছাত্রীকে মুছে ফেলার পর আর ফিরিয়ে আনা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "না, বাতিল করুন",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/students/${id}`);

          if (response.status === 200) {
            Swal.fire(
              "মুছে ফেলা হয়েছে!",
              "ছাত্র-ছাত্রীর তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
              "success"
            );
            fetchStudents();
          } else {
            Swal.fire(
              "সমস্যা হয়েছে!",
              "ছাত্র-ছাত্রী মুছতে সমস্যা হয়েছে।",
              "error"
            );
          }
        } catch (error) {
          Swal.fire("ভুল হয়েছে!", "কিছু ভুল হয়েছে।", "error");
        }
      }
    });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.guardianNumber.includes(searchTerm);

    const matchesClass = !filterClass || student.class === filterClass;
    const matchesGroup = !filterGroup || student.group === filterGroup;

    return matchesSearch && matchesClass && matchesGroup;
  });

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const getClassStats = () => {
    const stats: { [key: string]: number } = {};
    classes.forEach((cls) => {
      stats[cls] = students.filter((s) => s.class === cls).length;
    });
    return stats;
  };

  const getGenderStats = () => {
    const maleCount = students.filter((s) => s.gender === "ছাত্র").length;
    const femaleCount = students.filter((s) => s.gender === "ছাত্রী").length;
    return { male: maleCount, female: femaleCount };
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
                ছাত্র-ছাত্রী তালিকা
              </h1>
              <p className="text-gray-600 text-lg">
                সকল ছাত্র-ছাত্রীর তথ্য দেখুন এবং পরিচালনা করুন
              </p>
            </div>
          </div>
          <Link href="/Dashboard/studentadd">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-5 h-5 mr-2" />
              নতুন যোগ করুন
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Class Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              শ্রেণি ভিত্তিক পরিসংখ্যান
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {classes.map((cls) => {
              const count = getClassStats()[cls];
              return (
                <div
                  key={cls}
                  className="text-center p-3 bg-blue-50 rounded-lg"
                >
                  <div className="text-xl font-bold text-blue-600">{count}</div>
                  <div className="text-sm text-blue-800">{cls} শ্রেণি</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Gender Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              লিঙ্গ ভিত্তিক পরিসংখ্যান
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800">ছাত্র</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {getGenderStats().male}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <div className="flex items-center">
                <User className="w-5 h-5 text-pink-600 mr-2" />
                <span className="text-pink-800">ছাত্রী</span>
              </div>
              <span className="text-xl font-bold text-pink-600">
                {getGenderStats().female}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Total Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <GraduationCap className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              সামগ্রিক পরিসংখ্যান
            </h3>
          </div>
          <div className="space-y-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {students.length}
              </div>
              <div className="text-purple-800">মোট ছাত্র-ছাত্রী</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {((getGenderStats().female / students.length) * 100).toFixed(1)}
                %
              </div>
              <div className="text-gray-600">নারী শিক্ষার্থী</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="নাম, পিতার নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">সব শ্রেণি</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls} শ্রেণি
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">সব গ্রুপ</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-right">
              <p className="text-sm text-gray-500">মোট ছাত্র-ছাত্রী</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredStudents.length} জন
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Student List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোন ছাত্র-ছাত্রী পাওয়া যায়নি
            </h3>
            <p className="text-gray-600 mb-6">
              নতুন ছাত্র-ছাত্রী যোগ করুন অথবা অনুসন্ধানের শর্ত পরিবর্তন করুন
            </p>
            <Link href="/Dashboard/studentadd">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                ছাত্র-ছাত্রী যোগ করুন
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
                    রোল
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    শ্রেণি
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    গ্রুপ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    লিঙ্গ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    অভিভাবক
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    কার্যক্রম
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.photo ? (
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
                          <GraduationCap className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
                        {student.roll}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {student.class} শ্রেণি
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.group ? (
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {student.group}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          student.gender === "ছাত্র"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {student.fatherName}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-1" />
                          {student.guardianNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openModal(student)}
                          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-900"
                          title="দেখুন"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <Link href={`/Dashboard/students/edit/${student._id}`}>
                          <button
                            className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50 hover:text-green-900"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-900"
                          title="মুছুন"
                        >
                          <Trash2 className="h-4 w-4" />
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
      {showModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6"
            initial={{ opacity: 0, scale: 0.9 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                ছাত্র-ছাত্রীর বিস্তারিত তথ্য
              </h2>
              <button
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                {selectedStudent.photo ? (
                  <img
                    alt={selectedStudent.name}
                    className="h-80 w-full rounded-xl object-cover shadow-lg"
                    src={selectedStudent.photo}
                  />
                ) : (
                  <div className="flex h-80 w-full items-center justify-center rounded-xl bg-gray-200 shadow-lg">
                    <GraduationCap className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    {selectedStudent.name}
                  </h3>
                  <div className="mb-3 flex items-center space-x-3">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      রোল: {selectedStudent.roll}
                    </span>
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                      {selectedStudent.class} শ্রেণি
                    </span>
                    {selectedStudent.group && (
                      <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                        {selectedStudent.group}
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      selectedStudent.gender === "ছাত্র"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {selectedStudent.gender}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">পিতার নাম</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.fatherName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">মাতার নাম</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.motherName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">অভিভাবকের ফোন</p>
                      <p className="font-medium text-gray-900">
                        {selectedStudent.guardianNumber}
                      </p>
                    </div>
                  </div>

                  {selectedStudent.dateOfBirth && (
                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">জন্ম তারিখ</p>
                        <p className="font-medium text-gray-900">
                          {new Date(
                            selectedStudent.dateOfBirth
                          ).toLocaleDateString("bn-BD")}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedStudent.address && (
                    <div className="flex items-start space-x-3 rounded-lg bg-gray-50 p-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">ঠিকানা</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;
