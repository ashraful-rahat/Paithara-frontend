"use client";
import Link from "next/link";
import Image from "next/image";

const MENU_ITEMS = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "সকল শিক্ষার্থী", href: "/students" },
  { label: "শিক্ষক তালিকা", href: "/teachers" },
  { label: "ব্লগ", href: "/blog" },
  { label: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-gray-100/90 backdrop-blur-md border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Bismillah */}
        <div className="text-center text-green-700 text-xl font-semibold tracking-wide mb-4">
          বিসমিল্লাহির রাহমানির রাহিম
        </div>

        {/* Logo + Info Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left">
          {/* Left: Logo */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Image
              src="/images/logo1.png"
              alt="লোগো"
              width={90}
              height={90}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                পৈথারা উচ্চ বিদ্যালয়
              </h1>
              <p className="text-xl text-gray-900 font-medium">স্থাপিত: ১৯৮৫</p>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="text-lg text-gray-700 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">📧</span>
              <a
                href="mailto:info@paithara.edu.bd"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                info@paithara.edu.bd
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">📞</span>
              <a
                href="tel:01300-000000"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                01300-000000
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Navigation */}
        <div className="flex items-center justify-center h-16">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 text-lg lg:text-xl font-medium text-gray-800">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-green-600 hover:underline transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden relative">
            <button
              className="flex flex-col items-end justify-center w-12 h-12 space-y-2"
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                if (menu) {
                  menu.classList.toggle("hidden");
                }
              }}
            >
              <span className="w-10 h-1 bg-gray-800 rounded-full transition-all"></span>
              <span className="w-8 h-1 bg-gray-800 rounded-full transition-all"></span>
              <span className="w-6 h-1 bg-gray-800 rounded-full transition-all"></span>
            </button>

            {/* Mobile Dropdown */}
            <div
              id="mobile-menu"
              className="absolute top-16 right-4 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg py-2 z-50 hidden"
            >
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-lg text-gray-800 hover:bg-gray-100 hover:text-green-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
