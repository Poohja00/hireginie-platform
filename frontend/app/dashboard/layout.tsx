/*
=====================================
DASHBOARD LAYOUT
=====================================

This layout wraps all dashboard pages.

Sidebar remains fixed.
Content changes depending on page.
*/

import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* PAGE CONTENT */}

      <div className="flex-1 p-10 bg-gray-100 min-h-screen">

        {children}

      </div>

    </div>

  );

}