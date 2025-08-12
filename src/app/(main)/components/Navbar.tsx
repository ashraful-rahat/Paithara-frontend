"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

const MENU_ITEMS = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "সকল শিক্ষার্থী", href: "/students" },
  { label: "শিক্ষক তালিকা", href: "/teachers" },
  { label: "ইভেন্টস", href: "/events" },
  { label: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-white to-gray-50 shadow-lg border-b-4 border-green-600">
      {/* Bismillah at the very top */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-2">
        <p className="text-lg font-bold tracking-wider">
          বিসমিল্লাহির রাহমানির রাহিম
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar - Contact Info */}
        <div className="hidden md:flex items-center justify-end py-3 text-sm text-gray-700 space-x-6">
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <Mail size={18} className="text-green-600" />
            <a
              href="mailto:info@paithara.edu.bd"
              className="hover:text-green-600 transition-colors font-medium"
            >
              paihsful106658@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <Phone size={18} className="text-green-600" />
            <a
              href="tel:01300-000000"
              className="hover:text-green-600 transition-colors font-medium"
            >
              01816064879
            </a>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <MapPin size={18} className="text-green-600" />
            <span className="font-medium">পৈথারা, ফুলগাজী</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and School Name */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/images/logo1.png"
                alt="পৈথারা উচ্চ বিদ্যালয় লোগো"
                width={70}
                height={70}
                className="rounded-full object-cover border-4 border-green-600 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                পৈথারা উচ্চ বিদ্যালয়
              </h1>
              <p className="text-base text-gray-600 font-medium">
                স্থাপিত: ১৯৮৫
              </p>
              <p className="text-sm text-green-600 font-semibold">
                মাধ্যমিক শিক্ষা প্রতিষ্ঠান
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-800 hover:text-green-600 font-semibold text-lg transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-green-50"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </div>

          {/* Tablet Navigation - Compact */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {MENU_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-800 hover:text-green-600 font-semibold text-base transition-all duration-300 px-3 py-2 rounded-lg hover:bg-green-50"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-800 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 rounded-lg text-gray-800 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-green-200 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-xl">
            <div className="py-3 space-y-1">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-800 hover:text-green-600 hover:bg-green-50 font-semibold text-lg transition-all duration-300 mx-2 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Contact Info */}
              <div className="border-t-2 border-green-200 mt-4 pt-4 px-4 space-y-3">
                <div className="flex items-center gap-3 text-base text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  <Mail size={20} className="text-green-600" />
                  <a
                    href="mailto:info@paithara.edu.bd"
                    className="hover:text-green-600 transition-colors font-medium"
                  >
                    info@paithara.edu.bd
                  </a>
                </div>
                <div className="flex items-center gap-3 text-base text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  <Phone size={20} className="text-green-600" />
                  <a
                    href="tel:01300-000000"
                    className="hover:text-green-600 transition-colors font-medium"
                  >
                    01300-000000
                  </a>
                </div>
                <div className="flex items-center gap-3 text-base text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  <MapPin size={20} className="text-green-600" />
                  <span className="font-medium">পৈথারা, ঢাকা</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tablet Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="hidden md:block lg:hidden border-t-2 border-green-200 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-xl">
            <div className="py-3 space-y-1">
              {MENU_ITEMS.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-800 hover:text-green-600 hover:bg-green-50 font-semibold text-lg transition-all duration-300 mx-2 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
