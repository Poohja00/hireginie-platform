"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {

  const [recruitmentOpen, setRecruitmentOpen] = useState(false);

  // employee info
  const [name, setName] = useState("Employee");
  const [code, setCode] = useState("");

  /*
  Load employee name + code from localStorage
  */

  useEffect(() => {

    const storedName = localStorage.getItem("user_name");
    const storedCode = localStorage.getItem("employee_code");

    if (storedName) setName(storedName);
    if (storedCode) setCode(storedCode);

  }, []);


  /*
  Logout function
  */

  const logout = () => {

    localStorage.clear();
    window.location.href = "/login";

  };


  return (

    <div className="w-64 h-screen bg-black text-white flex flex-col justify-between">

      {/* ================= TOP MENU ================= */}

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-10 text-white">
          Hireginie
        </h1>


        <Link
          href="/dashboard"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          Dashboard
        </Link>


        {/* Recruitment */}

        <button
          onClick={() => setRecruitmentOpen(!recruitmentOpen)}
          className="w-full text-left text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          Recruitment
        </button>


        {recruitmentOpen && (

          <div className="ml-4 flex flex-col text-sm">

            <Link
  href="/projects"
  className="text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
>
  Open Jobs
</Link>

            <Link
              href="/dashboard/recruitment/starred-jobs"
              className="text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
            >
              Starred Jobs
            </Link>

            <Link
              href="/dashboard/self-sourcing"
              className="text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
            >
              Recruitment Pipeline
            </Link>

          </div>

        )}


        <Link
          href="/dashboard/attendance"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          Attendance
        </Link>


        <Link
          href="/dashboard/leave"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          Leave
        </Link>


        <Link
          href="/dashboard/chat"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          Chat
        </Link>


        <Link
          href="/dashboard/ai"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          AI Tools
        </Link>


        <Link
          href="/dashboard/faq"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          FAQ
        </Link>


        <Link
          href="/dashboard/helpdesk"
          className="block text-white px-3 py-2 rounded hover:text-orange-400 hover:bg-gray-900 transition"
        >
          Help Desk
        </Link>

      </div>


      {/* ================= USER PROFILE ================= */}

<div className="border-t border-gray-800 p-4">

  <div className="flex items-center gap-3">

    {/* Avatar */}

    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm text-white uppercase">
      {name ? name.charAt(0).toUpperCase() : "U"}
    </div>

    <div>

      {/* Name + Code */}

      <p className="text-sm text-white">

        {name}

        {code && code !== "null" && (
          <span className="text-gray-400"> ({code})</span>
        )}

      </p>

      {/* Logout */}

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-xs text-gray-400 hover:text-orange-400"
      >
        Logout
      </button>

    </div>

  </div>

</div>
</div>

  );

}