"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft,
  BookOpen,
  MapPin,
  Parentheses,
  Save,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface FormData {
  studentNameBn: string;
  studentNameEn: string;
  dateOfBirth: string;
  gender: "ছেলে" | "মেয়ে" | "অন্যান্য" | "";
  birthCertificateNo: string;
  religion: "ইসলাম" | "হিন্দু" | "বৌদ্ধ" | "খ্রিস্টান" | "অন্যান্য" | "";
  bloodGroup: string;
  photo: File | null;

  applyingForClass: "৬ষ্ঠ" | "৭ম" | "৮ম" | "৯ম" | "১০ম" | "";
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
}

const ApplicationPage = () => {
  const [formData, setFormData] = useState<FormData>({
    studentNameBn: "",
    studentNameEn: "",
    dateOfBirth: "",
    gender: "",
    birthCertificateNo: "",
    religion: "",
    bloodGroup: "",
    photo: null,

    applyingForClass: "",
    previousSchoolName: "",
    lastExamResult: "",

    fatherNameBn: "",
    fatherNameEn: "",
    fatherOccupation: "",
    fatherNid: "",
    motherNameBn: "",
    motherNameEn: "",
    motherOccupation: "",
    motherNid: "",
    guardianContact: "",

    presentAddress: "",
    permanentAddress: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.photo) {
      toast.error("ছবি আপলোড করুন");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("লগইন করা নেই, আবেদন জমা দিতে পারবেন না।");
        setLoading(false);
        return;
      }
      const decoded: { id: string } = jwtDecode(token);
      const userId = decoded.id;

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photo" && formData.photo) {
          data.append(key, formData.photo);
        } else {
          const value = formData[key as keyof FormData];
          if (value) {
            data.append(key, value.toString());
          }
        }
      });
      data.append("userId", userId);

      await axiosInstance.post("/applications/create", data);

      toast.success("আবেদন সফলভাবে জমা হয়েছে!");

      setFormData({
        studentNameBn: "",
        studentNameEn: "",
        dateOfBirth: "",
        gender: "",
        birthCertificateNo: "",
        religion: "",
        bloodGroup: "",
        photo: null,

        applyingForClass: "",
        previousSchoolName: "",
        lastExamResult: "",

        fatherNameBn: "",
        fatherNameEn: "",
        fatherOccupation: "",
        fatherNid: "",
        motherNameBn: "",
        motherNameEn: "",
        motherOccupation: "",
        motherNid: "",
        guardianContact: "",

        presentAddress: "",
        permanentAddress: "",
      });
      setPhotoPreview("");
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("আবেদন জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-4"
      >
        <Link href="/">
          <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </div>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">ভর্তি আবেদন</h1>
          <p className="text-gray-600 text-lg">
            ৬ষ্ঠ থেকে ১০ম শ্রেণির জন্য ভর্তি ফর্ম
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Student Info */}
          <div>
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                শিক্ষার্থীর মৌলিক তথ্য
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="studentNameBn"
                placeholder="শিক্ষার্থীর নাম (বাংলা)"
                value={formData.studentNameBn}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="studentNameEn"
                placeholder="Student's Name (English)"
                value={formData.studentNameEn}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="জন্ম তারিখ"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input-field"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">লিঙ্গ</option>
                <option value="ছেলে">ছেলে</option>
                <option value="মেয়ে">মেয়ে</option>
              </select>
              <input
                type="text"
                name="birthCertificateNo"
                placeholder="জন্ম নিবন্ধন নম্বর"
                value={formData.birthCertificateNo}
                onChange={handleChange}
                className="input-field"
                required
              />
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">ধর্ম</option>
                <option value="ইসলাম">ইসলাম</option>
                <option value="হিন্দু">হিন্দু</option>
                <option value="বৌদ্ধ">বৌদ্ধ</option>
                <option value="খ্রিস্টান">খ্রিস্টান</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
              <input
                type="text"
                name="bloodGroup"
                placeholder="রক্তের গ্রুপ (ঐচ্ছিক)"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="input-field"
              />
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ছবি আপলোড
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="input-field"
                  required
                />
                {photoPreview && (
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="mt-2 rounded"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Admission Info */}
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                ভর্তির তথ্য
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="applyingForClass"
                value={formData.applyingForClass}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">ভর্তির জন্য শ্রেণি</option>
                <option value="৬ষ্ঠ">৬ষ্ঠ</option>
                <option value="৭ম">৭ম</option>
                <option value="৮ম">৮ম</option>
                <option value="৯ম">৯ম</option>
                <option value="১০ম">১০ম</option>
              </select>
              <input
                type="text"
                name="previousSchoolName"
                placeholder="পূর্ববর্তী স্কুলের নাম"
                value={formData.previousSchoolName}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="lastExamResult"
                placeholder="পূর্ববর্তী পরীক্ষার ফলাফল"
                value={formData.lastExamResult}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Section 3: Guardian Info */}
          <div>
            <div className="flex items-center mb-6">
              <Parentheses className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                অভিভাবকের তথ্য
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fatherNameBn"
                placeholder="পিতার নাম (বাংলা)"
                value={formData.fatherNameBn}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="fatherNameEn"
                placeholder="Father's Name (English)"
                value={formData.fatherNameEn}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="fatherOccupation"
                placeholder="পিতার পেশা"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="fatherNid"
                placeholder="পিতার জাতীয় পরিচয়পত্র নম্বর"
                value={formData.fatherNid}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="motherNameBn"
                placeholder="মাতার নাম (বাংলা)"
                value={formData.motherNameBn}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="motherNameEn"
                placeholder="Mother's Name (English)"
                value={formData.motherNameEn}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="motherOccupation"
                placeholder="মাতার পেশা"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="motherNid"
                placeholder="মাতার জাতীয় পরিচয়পত্র নম্বর"
                value={formData.motherNid}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="tel"
                name="guardianContact"
                placeholder="অভিভাবকের মোবাইল নম্বর"
                value={formData.guardianContact}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Section 4: Address */}
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                যোগাযোগের ঠিকানা
              </h2>
            </div>
            <textarea
              name="presentAddress"
              placeholder="বর্তমান ঠিকানা"
              value={formData.presentAddress}
              onChange={handleChange}
              rows={3}
              className="input-field w-full"
              required
            ></textarea>
            <textarea
              name="permanentAddress"
              placeholder="স্থায়ী ঠিকানা"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows={3}
              className="input-field w-full"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              আবেদন জমা দিন
            </button>
          </div>
        </form>
      </motion.div>
      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #2563eb;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
          transition: all 0.2s;
        }
        .submit-button:hover:not(:disabled) {
          background-color: #1d4ed8;
        }
        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ApplicationPage;
