"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageCircle,
  Building,
  User,
  Calendar
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "ঠিকানা",
      details: "পৈথারা উচ্চ বিদ্যালয়, ফুলগাজী, ফেনী, বাংলাদেশ",
      color: "text-blue-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "ফোন নম্বর",
      details: "+০১৮১৬০৬৪৮৭৯",
      color: "text-green-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "ইমেইল",
      details: "paisfull106658@gmail.com",
      color: "text-purple-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "কর্মসময়",
      details: "রবি-বৃহস্পতি: সকাল ৮:০০ - বিকাল ৪:০০",
      color: "text-orange-600"
    }
  ];

  const quickLinks = [
    { title: "প্রধান ভারপ্রাপ্ত প্রধান শিক্ষক", contact: "মোঃ নূরন নবী ভূঁইয়া", phone: "০১৮১৬০৬৪৮৭৯" },
    // { title: "সহকারী প্রধান শিক্ষক", contact: "মোঃ রফিক আহমেদ স্যার", phone: "+৮৮০ ১৭১১-২৩৪৫৬৯" },
    // { title: "অফিস সহকারী", contact: "মোঃ সেলিম মিয়া", phone: "+৮৮০ ১৭১১-২৩৪৫৭০" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            আমাদের সাথে যোগাযোগ করুন
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            আপনার যেকোনো প্রশ্ন, পরামর্শ বা মতামত জানাতে আমাদের সাথে যোগাযোগ করুন। আমরা আপনার বার্তার প্রতিক্রিয়া দিতে সর্বদা প্রস্তুত
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">বার্তা পাঠান</h2>
              <p className="text-gray-600">আপনার বার্তা আমাদের কাছে পৌঁছান</p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-gray-600">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="আপনার নাম লিখুন"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ইমেইল <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="আপনার ইমেইল লিখুন"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ফোন নম্বর
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="আপনার ফোন নম্বর লিখুন"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      বিষয় <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      <option value="admission">ভর্তি সম্পর্কিত</option>
                      <option value="academic">শিক্ষা সম্পর্কিত</option>
                      <option value="administration">প্রশাসনিক</option>
                      <option value="general">সাধারণ</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="আপনার বার্তা লিখুন..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>পাঠানো হচ্ছে...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>বার্তা পাঠান</span>
                    </div>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`p-3 bg-gray-50 rounded-xl ${info.color}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">দ্রুত যোগাযোগ</h3>
              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                    <div>
                      <p className="font-medium">{link.title}</p>
                      <p className="text-blue-100 text-sm">{link.contact}</p>
                    </div>
                    <a 
                      href={`tel:${link.phone}`}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* School Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
            >
              <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">পৈথারা উচ্চ বিদ্যালয়</h3>
              <p className="text-gray-600 mb-4">শিক্ষার আলোয় আলোকিত এক উজ্জ্বল ভবিষ্যৎ</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>স্থাপিত: ১৯৮৫</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

  
    </div>
  );
};

export default ContactPage;
