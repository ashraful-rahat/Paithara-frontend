"use client";

import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Eye,
  MapPin,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2"; // sweetalert2 import

// IApplication Interface (আপনি এটি আপনার প্রজেক্টের ইন্টারফেস দিয়ে প্রতিস্থাপন করতে পারেন)
interface IApplication {
  _id: string;
  studentNameBn: string;
  studentNameEn: string;
  dateOfBirth: string;
  gender: string;
  birthCertificateNo: string;
  religion: string;
  bloodGroup: string;
  photo: string;
  applyingForClass: string;
  previousSchoolName: string;
  lastExamResult: string;
  fatherNameBn: string;
  fatherNameEn: string;
  fatherOccupation: string;
  fatherNid: string;
  motherNameBn: string;
  motherNameEn: string;
  motherOccupation: string;
  motherNid: string;
  guardianContact: string;
  presentAddress: string;
  permanentAddress: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // আপনার API এর বেজ URL
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ApplicationsDashboard = () => {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<IApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all");

  // সকল অ্যাপ্লিকেশন fetch করার জন্য ফাংশন
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Unauthorized. Please login as an admin.");
        setLoading(false);
        return;
      }
      const response = await axiosInstance.get("/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to fetch applications. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // স্ট্যাটাস পরিবর্তনের জন্য ফাংশন
  const handleStatusUpdate = async (
    id: string,
    newStatus: "accepted" | "rejected"
  ) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        toast.error("Unauthorized. Please login again.");
        return;
      }

      await axiosInstance.patch(
        `/applications/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Application has been ${newStatus}.`);
      fetchApplications(); // তালিকা রিফ্রেশ করুন
      setIsModalOpen(false); // মডাল বন্ধ করুন
    } catch (err) {
      console.error("Failed to update application status:", err);
      toast.error("Failed to update status. Please try again.");
    }
  };

  // অ্যাপ্লিকেশন ডিলিট করার জন্য ফাংশন
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          toast.error("Unauthorized. Please login again.");
          return;
        }
        await axiosInstance.delete(`/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("Deleted!", "Your application has been deleted.", "success");
        fetchApplications(); // তালিকা রিফ্রেশ করুন
      } catch (err) {
        console.error("Failed to delete application:", err);
        Swal.fire(
          "Error!",
          "Failed to delete application. Please try again.",
          "error"
        );
      }
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-700">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 text-red-800">
        <p>{error}</p>
      </div>
    );
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "accepted":
        return (
          <span className="px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">সকল আবেদন</h1>
          <p className="text-gray-600 text-lg">
            অ্যাডমিন প্যানেল থেকে আবেদনগুলো পরিচালনা করুন
          </p>
        </div>
      </motion.div>

      {/* Filter and Content */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("accepted")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === "accepted"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Accepted
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  শিক্ষার্থীর নাম
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  আবেদনের শ্রেণি
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  জন্ম তারিখ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  স্ট্যাটাস
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {app.studentNameBn}
                    </div>
                    <div className="text-sm text-gray-500">
                      {app.studentNameEn}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {app.applyingForClass}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {format(new Date(app.dateOfBirth), "dd MMMM yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(app.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "accepted")}
                        className={`text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-gray-100 transition-colors ${
                          app.status === "accepted" &&
                          "opacity-50 cursor-not-allowed"
                        }`}
                        title="Approve"
                        disabled={app.status === "accepted"}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className={`text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-gray-100 transition-colors ${
                          app.status === "rejected" &&
                          "opacity-50 cursor-not-allowed"
                        }`}
                        title="Reject"
                        disabled={app.status === "rejected"}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Application Details */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 space-y-6">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              আবেদনের বিস্তারিত
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center space-y-4">
                {selectedApplication.photo && (
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={selectedApplication.photo}
                      alt="Student Photo"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="mt-4 text-center">
                  {renderStatusBadge(selectedApplication.status)}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <User className="w-5 h-5 text-blue-500" />
                  <p>
                    <strong>শিক্ষার্থীর নাম:</strong>{" "}
                    {selectedApplication.studentNameBn} (
                    {selectedApplication.studentNameEn})
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <p>
                    <strong>শ্রেণি:</strong>{" "}
                    {selectedApplication.applyingForClass}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <p>
                    <strong>বর্তমান ঠিকানা:</strong>{" "}
                    {selectedApplication.presentAddress}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>জন্ম তারিখ:</strong>{" "}
                    {format(
                      new Date(selectedApplication.dateOfBirth),
                      "dd MMMM yyyy"
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>লিঙ্গ:</strong> {selectedApplication.gender}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>ধর্ম:</strong> {selectedApplication.religion}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>জন্ম নিবন্ধন নম্বর:</strong>{" "}
                    {selectedApplication.birthCertificateNo}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>পিতার নাম:</strong>{" "}
                    {selectedApplication.fatherNameBn} (
                    {selectedApplication.fatherNameEn})
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>মাতার নাম:</strong>{" "}
                    {selectedApplication.motherNameBn} (
                    {selectedApplication.motherNameEn})
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>পিতার এনআইডি:</strong>{" "}
                    {selectedApplication.fatherNid}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>মাতার এনআইডি:</strong>{" "}
                    {selectedApplication.motherNid}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>অভিভাবকের নম্বর:</strong>{" "}
                    {selectedApplication.guardianContact}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>পূর্ববর্তী স্কুলের নাম:</strong>{" "}
                    {selectedApplication.previousSchoolName}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <p>
                    <strong>পূর্ববর্তী পরীক্ষার ফলাফল:</strong>{" "}
                    {selectedApplication.lastExamResult}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={() =>
                  handleStatusUpdate(selectedApplication._id, "accepted")
                }
                className={`flex items-center px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                  selectedApplication.status === "accepted"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={selectedApplication.status === "accepted"}
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Approve
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedApplication._id, "rejected")
                }
                className={`flex items-center px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                  selectedApplication.status === "rejected"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={selectedApplication.status === "rejected"}
              >
                <XCircle className="w-5 h-5 mr-2" /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsDashboard;
