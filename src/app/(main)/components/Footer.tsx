"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Youtube as YoutubeIcon,
  BookOpen,
  Users,
  Heart,
  ArrowUp,
  Building
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "হোম", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "শ্রেণীকক্ষ", href: "/classroom" },
    { name: "শিক্ষকমণ্ডলী", href: "/teachers" },
    { name: "শিক্ষার্থী", href: "/students" },
    { name: "অনুষ্ঠান", href: "/events" },
    { name: "যোগাযোগ", href: "/contact" }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-blue-400" />,
      label: "ঠিকানা",
      value: "পৈথারা উচ্চ বিদ্যালয়, ফুলগাজী, ফেনী, বাংলাদেশ"
    },
    {
      icon: <Phone className="w-5 h-5 text-green-400" />,
      label: "ফোন",
      value: "০১৭১১-২৩৪৫৬৭"
    },
    {
      icon: <Mail className="w-5 h-5 text-red-400" />,
      label: "ইমেইল",
      value: "info@paithara.edu.bd"
    },
    {
      icon: <Clock className="w-5 h-5 text-yellow-400" />,
      label: "কর্মসময়",
      value: "রবি-বৃহস্পতি: সকাল ৮:০০ - বিকাল ৪:০০"
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FacebookIcon className="w-5 h-5" />, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: <TwitterIcon className="w-5 h-5" />, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: <InstagramIcon className="w-5 h-5" />, href: "#", color: "hover:text-pink-600" },
    { name: "YouTube", icon: <YoutubeIcon className="w-5 h-5" />, href: "#", color: "hover:text-red-600" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">

          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">পৈথারা উচ্চ বিদ্যালয়</h3>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              শিক্ষার আলোয় আলোকিত এক উজ্জ্বল ভবিষ্যৎ। ১৯৮৫ সাল থেকে মানসম্পন্ন শিক্ষা প্রদানে নিরলসভাবে কাজ করে আসছে।
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-2 bg-gray-800 rounded-lg text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                  whileHover={{ y: -2 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>দ্রুত লিংক</span>
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <ArrowUp className="w-4 h-4 rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>যোগাযোগের তথ্য</span>
            </h4>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-gray-800 rounded text-center">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="text-gray-300 font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-gray-700 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-gray-400 text-sm">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span>© {currentYear} পৈথারা উচ্চ বিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">ব্যবহারের শর্তাবলী</Link>
            <Link href="/sitemap" className="hover:text-blue-400 transition-colors duration-300">সাইটম্যাপ</Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;