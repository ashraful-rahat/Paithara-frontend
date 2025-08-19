"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  Upload,
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  User,
  BookOpen,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Select from "react-select";
import axiosInstance from "@/utils/axios";

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  qualification: string;
  experience: number;
  address: string;
  dateOfJoining: string;
  subjectPreferences: Array<{
    class: string;
    subjects: string[];
  }>;
}

interface ClassSubjectPreference {
  class: string;
  subjects: string[];
}

const StaffAddPage = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [subjectPreferences, setSubjectPreferences] = useState<
    ClassSubjectPreference[]
  >([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StaffFormData>();

  const staffCategories = [
    { value: "সহকারী শিক্ষক", label: "সহকারী শিক্ষক" },
    { value: "প্রধান শিক্ষক", label: "প্রধান শিক্ষক" },
    { value: "বিষয় ভিত্তিক শিক্ষক", label: "বিষয় ভিত্তিক শিক্ষক" },
    { value: "ক্লার্ক", label: "ক্লার্ক" },
    { value: "দপ্তরী", label: "দপ্তরী" },
    { value: "অতিথি শিক্ষক", label: "অতিথি শিক্ষক" },
    { value: "লাইব্রেরিয়ান", label: "লাইব্রেরিয়ান" },
    { value: "গার্ড", label: "গার্ড" },
    { value: "অ্যাকাউন্টেন্ট", label: "অ্যাকাউন্টেন্ট" },
    { value: "প্রশাসক", label: "প্রশাসক" },
  ];

  const classes = [
    { value: "৬ষ্ঠ", label: "৬ষ্ঠ শ্রেণি" },
    { value: "৭ম", label: "৭ম শ্রেণি" },
    { value: "৮ম", label: "৮ম শ্রেণি" },
    { value: "৯ম", label: "৯ম শ্রেণি" },
    { value: "১০ম", label: "১০ম শ্রেণি" },
  ];

  const subjects = [
    { value: "বাংলা", label: "বাংলা" },
    { value: "ইংরেজি", label: "ইংরেজি" },
    { value: "গণিত", label: "গণিত" },
    { value: "সাধারণ বিজ্ঞান", label: "সাধারণ বিজ্ঞান" },
    { value: "বাংলাদেশ ও বিশ্বপরিচয়", label: "বাংলাদেশ ও বিশ্বপরিচয়" },
    { value: "হিন্দুধর্ম শিক্ষা", label: "হিন্দুধর্ম শিক্ষা" },
    { value: "ইসলাম ধর্ম শিক্ষা", label: "ইসলাম ধর্ম শিক্ষা" },
    { value: "বিজ্ঞান", label: "বিজ্ঞান" },
    {
      value: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
      label: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
    },
    { value: "পদার্থবিজ্ঞান", label: "পদার্থবিজ্ঞান" },
    { value: "রসায়ন", label: "রসায়ন" },
    { value: "জীববিজ্ঞান", label: "জীববিজ্ঞান" },
    { value: "হিসাববিজ্ঞান", label: "হিসাববিজ্ঞান" },
    { value: "ব্যবসায় উদ্যোগ", label: "ব্যবসায় উদ্যোগ" },
    { value: "অর্থনীতি", label: "অর্থনীতি" },
    {
      value: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা",
      label: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা",
    },
    { value: "বাণিজ্য আইন ও গণিত", label: "বাণিজ্য আইন ও গণিত" },
    { value: "ব্যাংকিং ও বিমা", label: "ব্যাংকিং ও বিমা" },
    { value: "ইতিহাস", label: "ইতিহাস" },
    { value: "ভূগোল", label: "ভূগোল" },
    { value: "সমাজবিজ্ঞান", label: "সমাজবিজ্ঞান" },
    { value: "নাগরিকতা শিক্ষা", label: "নাগরিকতা শিক্ষা" },
    { value: "মনোবিজ্ঞান", label: "মনোবিজ্ঞান" },
    { value: "গার্হস্থ্য বিজ্ঞান", label: "গার্হস্থ্য বিজ্ঞান" },
    { value: "ইসলাম ধর্ম", label: "ইসলাম ধর্ম" },
    { value: "হিন্দু ধর্ম", label: "হিন্দু ধর্ম" },
    { value: "বৌদ্ধ ধর্ম", label: "বৌদ্ধ ধর্ম" },
    { value: "খ্রিস্টান ধর্ম", label: "খ্রিস্টান ধর্ম" },
    {
      value: "শারীরিক শিক্ষা ও স্বাস্থ্য",
      label: "শারীরিক শিক্ষা ও স্বাস্থ্য",
    },
    { value: "শিল্প ও কারুশিল্প", label: "শিল্প ও কারুশিল্প" },
    { value: "সাংস্কৃতিক শিক্ষা", label: "সাংস্কৃতিক শিক্ষা" },
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

  const addSubjectPreference = () => {
    setSubjectPreferences([...subjectPreferences, { class: "", subjects: [] }]);
  };

  const removeSubjectPreference = (index: number) => {
    setSubjectPreferences(subjectPreferences.filter((_, i) => i !== index));
  };

  const updateSubjectPreference = (
    index: number,
    field: "class" | "subjects",
    value: string | string[]
  ) => {
    const updated = [...subjectPreferences];
    updated[index] = { ...updated[index], [field]: value };
    setSubjectPreferences(updated);
  };

  const onSubmit = async (data: StaffFormData) => {
    if (!photo) {
      toast.error("ছবি আপলোড করুন");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("qualification", data.qualification);
      formData.append("experience", data.experience.toString());
      formData.append("address", data.address);
      formData.append("dateOfJoining", data.dateOfJoining);
      formData.append("category", data.category);
      formData.append("photo", photo);
      formData.append("subjectPreferences", JSON.stringify(subjectPreferences));

      // ডেটা কনসোলে লগ করুন
      console.log("Submitting data:", Object.fromEntries(formData.entries()));

      const response = await axiosInstance.post("/staff/create", formData);

      if (response.status === 201) {
        toast.success("কর্মকর্তা সফলভাবে যোগ হয়েছে");
        console.log("Successful response:", response.data);
        reset();
        setPhoto(null);
        setPhotoPreview("");
        setSubjectPreferences([]);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error during form submission:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error("প্রমাণীকরণ টোকেন অনুপস্থিত বা অবৈধ।");
        } else {
          toast.error(error.response.data?.message || "কিছু ভুল হয়েছে");
        }
      } else if (error.request) {
        console.error("Error request data:", error.request);
        toast.error("সার্ভার থেকে কোনো প্রতিক্রিয়া পাওয়া যায়নি।");
      } else {
        console.error("Error message:", error.message);
        toast.error("নেটওয়ার্ক ত্রুটি অথবা সার্ভার ডাউন।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/dashboard">
            <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </div>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              কর্মকর্তা-কর্মচারী যোগ করুন
            </h1>
            <p className="text-gray-600 text-lg">
              নতুন কর্মকর্তা-কর্মচারীর তথ্য নিবন্ধন করুন
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div>
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                মৌলিক তথ্য
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  নাম *
                </label>
                <input
                  type="text"
                  {...register("name", { required: "নাম প্রয়োজন" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="কর্মকর্তার নাম"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ইমেইল *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "ইমেইল প্রয়োজন",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "সঠিক ইমেইল দিন",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ফোন নম্বর
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="০১১১১১১১১১১"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পদবি *
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "পদবি নির্বাচন করুন" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={staffCategories}
                      placeholder="পদবি নির্বাচন করুন"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={(val) => field.onChange(val?.value)}
                      value={staffCategories.find(
                        (c) => c.value === field.value
                      )}
                    />
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  যোগ্যতা
                </label>
                <input
                  type="text"
                  {...register("qualification")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="এম.এ, বি.এড ইত্যাদি"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  অভিজ্ঞতা (বছর)
                </label>
                <input
                  type="number"
                  {...register("experience", { min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="০"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  যোগদানের তারিখ
                </label>
                <input
                  type="date"
                  {...register("dateOfJoining")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-green-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">ঠিকানা</h3>
            </div>
            <textarea
              {...register("address")}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="বিস্তারিত ঠিকানা"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <div className="flex items-center mb-4">
              <Upload className="w-5 h-5 text-purple-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">ছবি আপলোড</h3>
            </div>
            <div className="flex items-center space-x-6">
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
                  className="flex items-center justify-center px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-600 font-medium">
                    ছবি আপলোড করুন
                  </span>
                </label>
              </div>
              {photoPreview && (
                <div className="relative">
                  <div className="relative w-24 h-24">
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPhotoPreview("");
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subject Preferences */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">
                  বিষয় পছন্দ (শিক্ষকদের জন্য)
                </h3>
              </div>
              <button
                type="button"
                onClick={addSubjectPreference}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                যোগ করুন
              </button>
            </div>

            {subjectPreferences.map((pref, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    শ্রেণি
                  </label>
                  <Select
                    value={classes.find((c) => c.value === pref.class)}
                    onChange={(option) =>
                      updateSubjectPreference(
                        index,
                        "class",
                        option?.value || ""
                      )
                    }
                    options={classes}
                    placeholder="শ্রেণি নির্বাচন করুন"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বিষয়সমূহ
                  </label>
                  <Select
                    isMulti
                    value={subjects.filter((s) =>
                      pref.subjects.includes(s.value)
                    )}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(options: any) =>
                      updateSubjectPreference(
                        index,
                        "subjects",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        options ? options.map((o: any) => o.value) : []
                      )
                    }
                    options={subjects}
                    placeholder="বিষয় নির্বাচন করুন"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSubjectPreference(index)}
                  className="mt-8 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link href="/dashboard">
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                বাতিল
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
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

export default StaffAddPage;