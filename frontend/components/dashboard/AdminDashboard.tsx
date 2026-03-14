"use client";

/*
------------------------------------------------
ADMIN DASHBOARD
------------------------------------------------

This dashboard shows platform level analytics.

Admin can see:

• Total Projects
• Total Jobs
• Total Candidates
• Total Hires

Data comes from:
GET /admin/dashboard
*/

import { useEffect, useState } from "react";

export default function AdminDashboard() {

  /*
  Store entire dashboard response
  */

  const [dashboard, setDashboard] = useState<any>(null);

  /*
  Load dashboard when page opens
  */

  useEffect(() => {

    loadDashboard();

  }, []);

  /*
  Fetch dashboard stats from backend
  */

  const loadDashboard = async () => {

    try {

      const res = await fetch("http://127.0.0.1:8000/admin/dashboard");

      const data = await res.json();

      setDashboard(data);

    } catch (error) {

      console.error("Dashboard error:", error);

    }

  };

  /*
  Show loading while data is fetching
  */

  if (!dashboard) {
    return <div className="p-10">Loading intelligence...</div>;
  }

  /*
  UI
  */

  return (

    <div className="flex h-screen">


      {/* Main Content */}

      <div className="flex-1 p-10 bg-gray-100">

        <h2 className="text-3xl font-bold mb-6">
          Command Intelligence
        </h2>


        {/* Dashboard Cards */}

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-gray-500">
              Active Projects
            </h3>

            <p className="text-3xl font-bold mt-2">
              {dashboard.projects}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-gray-500">
              Open Jobs
            </h3>

            <p className="text-3xl font-bold mt-2">
              {dashboard.jobs}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-gray-500">
              Candidates
            </h3>

            <p className="text-3xl font-bold mt-2">
              {dashboard.candidates}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-gray-500">
              Hires
            </h3>

            <p className="text-3xl font-bold mt-2">
              {dashboard.hires}
            </p>

          </div>

        </div>


        {/* ---------------------------------- */}
        {/* PIPELINE INTELLIGENCE */}
        {/* ---------------------------------- */}

        <div className="mt-10">

          <h3 className="text-xl font-bold mb-4">
            Pipeline Intelligence
          </h3>

          <div className="grid grid-cols-6 gap-4">

            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-500">Submitted</p>
              <p className="text-2xl font-bold">
                {dashboard.pipeline.submitted}
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-500">Screening</p>
              <p className="text-2xl font-bold">
                {dashboard.pipeline.screening}
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-500">Interview</p>
              <p className="text-2xl font-bold">
                {dashboard.pipeline.interview}
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-500">Offer</p>
              <p className="text-2xl font-bold">
                {dashboard.pipeline.offer}
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-500">Hired</p>
              <p className="text-2xl font-bold">
                {dashboard.pipeline.hired}
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-500">Rejected</p>
              <p className="text-2xl font-bold">
                {dashboard.pipeline.rejected}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}