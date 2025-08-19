// src/app/(dashboard)/dashboard/studentadd/page.tsx

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Upload, Save, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import Select from "react-select";
import axiosInstance from "@/utils/axios"; // axiosInstance ইমপোর্ট করা হয়েছে

interface StudentFormData {
  name: string;
  roll: number;
  class: string;
  group?: string;
  gender: string;
  fatherName: string;
  motherName: string;
  guardianNumber: string;
  address?: string;
  dateOfBirth?: string;
}

const StudentAddPage = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<StudentFormData>();

  const selectedClass = watch("class");

  const classes = [
    { value: "৬ষ্ঠ", label: "৬ষ্ঠ শ্রেণি" },
    { value: "৭ম", label: "৭ম শ্রেণি" },
    { value: "৮ম", label: "৮ম শ্রেণি" },
    { value: "৯ম", label: "৯ম শ্রেণি" },
    { value: "১০ম", label: "১০ম শ্রেণি" },
  ];

  const groups = [
    { value: "সাধারণ", label: "সাধারণ" },
    { value: "বিজ্ঞান", label: "বিজ্ঞান" },
    { value: "মানবিক", label: "মানবিক" },
    { value: "ব্যবসায়", label: "ব্যবসায়" },
  ];

  const genders = [
    { value: "ছাত্র", label: "ছাত্র" },
    { value: "ছাত্রী", label: "ছাত্রী" },
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const onSubmit = async (data: StudentFormData) => {
  if (!photo) {
    toast.error("ছবি আপলোড করুন");
    return;
  }

  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("roll", data.roll.toString());
    formData.append("class", data.class);
    if (data.group && data.group !== "") {
      formData.append("group", data.group);
    }
    formData.append("gender", data.gender);
    formData.append("fatherName", data.fatherName);
    formData.append("motherName", data.motherName);
    formData.append("guardianNumber", data.guardianNumber);
    formData.append("address", data.address || "");
    formData.append("dateOfBirth", data.dateOfBirth || "");
    formData.append("photo", photo);

    // ডেটা কনসোলে লগ করুন
    console.log("Submitting data:", Object.fromEntries(formData.entries()));

    // এখান থেকে headers অপশনটি সরিয়ে দেওয়া হয়েছে, কারণ FormData-র জন্য এটি স্বয়ংক্রিয়ভাবে সেট হয়ে যায়
    const response = await axiosInstance.post("/students/create", formData);

    if (response.status === 201) {
      toast.success("ছাত্র-ছাত্রী সফলভাবে যোগ হয়েছে");
      console.log("Successful response:", response.data);
      reset();
      setPhoto(null);
      setPhotoPreview("");
    }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // ত্রুটির বিস্তারিত তথ্য কনসোলে লগ করুন
    console.error("Error during form submission:", error);
    
    if (error.response) {
      // সার্ভার থেকে আসা ত্রুটি (যেমন 401, 403, 404)
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
      if (error.response.status === 401) {
        toast.error("প্রমাণীকরণ টোকেন অনুপস্থিত বা অবৈধ।");
      } else {
        toast.error(error.response.data?.message || "কিছু ভুল হয়েছে");
      }
    } else if (error.request) {
      // অনুরোধ পাঠানো হয়েছিল, কিন্তু কোনো প্রতিক্রিয়া পাওয়া যায়নি
      console.error("Error request data:", error.request);
      toast.error("সার্ভার থেকে কোনো প্রতিক্রিয়া পাওয়া যায়নি।");
    } else {
      // অন্যান্য ত্রুটি
      console.error("Error message:", error.message);
      toast.error("নেটওয়ার্ক ত্রুটি অথবা সার্ভার ডাউন।");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              ছাত্র-ছাত্রী যোগ করুন
            </h1>
            <p className="text-gray-600">
              নতুন ছাত্র-ছাত্রীর তথ্য নিবন্ধন করুন
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                নাম *
              </label>
              <input
                type="text"
                {...register("name", { required: "নাম প্রয়োজন" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ছাত্র-ছাত্রীর নাম"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                রোল নম্বর *
              </label>
              <input
                type="number"
                {...register("roll", {
                  required: "রোল নম্বর প্রয়োজন",
                  min: { value: 1, message: "রোল নম্বর ১ এর বেশি হতে হবে" },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="১"
              />
              {errors.roll && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.roll.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শ্রেণি *
              </label>
              <Controller
                name="class"
                control={control}
                rules={{ required: "শ্রেণি নির্বাচন করুন" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={classes}
                    placeholder="শ্রেণি নির্বাচন করুন"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(val) => field.onChange(val?.value)}
                    value={classes.find((c) => c.value === field.value)}
                  />
                )}
              />
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                গ্রুপ
              </label>
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={groups}
                    placeholder="গ্রুপ নির্বাচন করুন"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isDisabled={
                      !selectedClass ||
                      selectedClass === "৬ষ্ঠ" ||
                      selectedClass === "৭ম" ||
                      selectedClass === "৮ম"
                    }
                    onChange={(val) => field.onChange(val?.value)}
                    value={groups.find((g) => g.value === field.value)}
                  />
                )}
              />
              {(!selectedClass ||
                selectedClass === "৬ষ্ঠ" ||
                selectedClass === "৭ম" ||
                selectedClass === "৮ম") && (
                <p className="text-gray-500 text-sm mt-1">
                  ৯ম-১০ম শ্রেণির জন্য গ্রুপ নির্বাচন করুন
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                লিঙ্গ *
              </label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "লিঙ্গ নির্বাচন করুন" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={genders}
                    placeholder="লিঙ্গ নির্বাচন করুন"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(val) => field.onChange(val?.value)}
                    value={genders.find((g) => g.value === field.value)}
                  />
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                জন্ম তারিখ
              </label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Guardian Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পিতার নাম *
              </label>
              <input
                type="text"
                {...register("fatherName", { required: "পিতার নাম প্রয়োজন" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="পিতার নাম"
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fatherName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                মাতার নাম *
              </label>
              <input
                type="text"
                {...register("motherName", { required: "মাতার নাম প্রয়োজন" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="মাতার নাম"
              />
              {errors.motherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.motherName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অভিভাবকের ফোন নম্বর *
              </label>
              <input
                type="tel"
                {...register("guardianNumber", {
                  required: "অভিভাবকের ফোন নম্বর প্রয়োজন",
                  pattern: {
                    value: /^(\+880|880|0)?1[3-9]\d{8}$/,
                    message: "সঠিক ফোন নম্বর দিন",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="০১১১১১১১১১১"
              />
              {errors.guardianNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.guardianNumber.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ঠিকানা
            </label>
            <textarea
              {...register("address")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="বিস্তারিত ঠিকানা"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ছবি
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  ছবি আপলোড করুন
                </label>
              </div>
              {photoPreview && (
                <div className="relative">
                  <div className="relative w-20 h-20">
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPhotoPreview("");
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                বাতিল
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentAddPage;
