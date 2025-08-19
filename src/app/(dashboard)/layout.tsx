"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SideBarDashboard from "./SideBarDashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "admin") {
      toast.error("আপনার এই পেজটি দেখার অনুমতি নেই।");
      router.push("/"); // normal user / guest কে redirect
    } else {
      setLoading(false); // Admin হলে dashboard দেখানো
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBarDashboard />
      <div className="flex-1 lg:ml-0">
        <main className="p-4 lg:p-6 min-h-screen">{children}</main>
      </div>
    </div>
  );
}