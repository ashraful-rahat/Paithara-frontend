import React from "react";
import SideBarDashboard from "./SideBarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBarDashboard />
      <div className="flex-1 lg:ml-0">
        <main className="p-4 lg:p-6 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
