"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    setToken(storedToken);
    setUserRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setToken(null);
    setUserRole(null);
    router.push("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const MENU_ITEMS = [
    { label: "হোম", href: "/" },
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "শ্রেণীকক্ষ", href: "/classroom" },
    { label: "সকল শিক্ষার্থী", href: "/students" },
    { label: "শিক্ষক তালিকা", href: "/teachers" },
    { label: "ফলাফল", href: "/results" },
    { label: "ইভেন্টস", href: "/events" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  // Role-based links
  if (userRole === "admin") {
    MENU_ITEMS.push({ label: "ড্যাশবোর্ড", href: "/dashboard" });
  } else if (userRole === "student") {
    MENU_ITEMS.push({ label: "আবেদন", href: "/application" });
  }

  return (
    <nav className="w-full bg-gradient-to-r from-white to-gray-50 shadow-lg border-b-2 border-green-600">
      {/* Bismillah at the top */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-1">
        <p className="text-sm font-bold tracking-wider">বিসমিল্লাহির রাহমানির রাহিম</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-end py-2 text-xs text-gray-700 space-x-4">
          <div className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
            <Mail size={16} className="text-green-600" />
            <a href="mailto:info@paithara.edu.bd" className="hover:text-green-600 font-medium">
              info@paithara.edu.bd
            </a>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
            <Phone size={16} className="text-green-600" />
            <a href="tel:01300-000000" className="hover:text-green-600 font-medium">
              01816064879
            </a>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
            <MapPin size={16} className="text-green-600" />
            <span className="font-medium">পৈথারা, ফুলগাজী</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo1.png"
              alt="পৈথারা উচ্চ বিদ্যালয় লোগো"
              width={60}
              height={60}
              className="rounded-full border-2 border-green-600 object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">পৈথারা উচ্চ বিদ্যালয়</h1>
              <p className="text-xs text-gray-600 font-medium">মাধ্যমিক শিক্ষা প্রতিষ্ঠান</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1 hover:text-green-600 hover:bg-green-50 rounded transition-all font-medium"
              >
                {item.label}
              </Link>
            ))}
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-all font-medium"
              >
                লগআউট <LogOut size={16} />
              </button>
            ) : (
              <Link
                href="/register"
                className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-all font-medium"
              >
                লগইন
              </Link>
            )}
          </div>

          {/* Mobile Nav Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded text-gray-800 hover:text-green-600 hover:bg-green-50 transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-green-200 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-xl">
            <div className="py-2 flex flex-col space-y-1 text-sm">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                >
                  {item.label}
                </Link>
              ))}
              {token ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-all font-medium"
                >
                  লগআউট <LogOut size={16} />
                </button>
              ) : (
                <Link
                  href="/register"
                  className="block px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-all font-medium"
                >
                  লগইন
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}