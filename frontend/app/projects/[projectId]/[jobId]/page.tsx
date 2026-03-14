"use client";

/*
------------------------------------------------
JOB PIPELINE + TRACKER PAGE
------------------------------------------------

This page shows:

1️⃣ Pipeline Stats (tiles)
2️⃣ Candidate Tracker (Google Sheets style table)

Example URL:

/projects/1/1

projectId = 1
jobId = 1

APIs used:

GET /tracker/job/{jobId}
GET /job/{jobId}/stats
*/

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobPipelinePage() {

  // --------------------------------------------
  // READ JOB ID FROM URL
  // --------------------------------------------

  const params = useParams();

  const jobId = Array.isArray(params.jobId)
    ? params.jobId[0]
    : params.jobId;

  // --------------------------------------------
  // STORE PIPELINE DATA
  // --------------------------------------------

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------
  // FETCH DATA FROM BACKEND
  // --------------------------------------------

  useEffect(() => {

    if (!jobId) return;

    // Fetch candidate tracker
    fetch(`http://127.0.0.1:8000/tracker/job/${jobId}`)
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setSubmissions(data);
        } else {
          setSubmissions([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading tracker:", error);
        setSubmissions([]);
        setLoading(false);
      });

    // Fetch pipeline statistics
    fetch(`http://127.0.0.1:8000/job/${jobId}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error("Error loading stats:", error);
      });

  }, [jobId]);


  // --------------------------------------------
  // LOADING SCREEN
  // --------------------------------------------

  if (loading) {
    return (
      <div className="p-10 text-lg text-white">
        Loading pipeline...
      </div>
    );
  }

  // --------------------------------------------
  // UI
  // --------------------------------------------

  return (
    <div className="p-10 text-white">

      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold mb-8">
        Candidate Pipeline
      </h1>


      {/* ------------------------------------------------ */}
      {/* PIPELINE STAT TILES */}
      {/* ------------------------------------------------ */}

      {stats && (

        <div className="grid grid-cols-6 gap-4 mb-10">

          <div className="bg-gray-900 p-4 rounded shadow">
            <p className="text-gray-400 text-sm">Total</p>
            <h2 className="text-2xl font-bold">{stats.total_candidates}</h2>
          </div>

          <div className="bg-gray-900 p-4 rounded shadow">
            <p className="text-gray-400 text-sm">Submitted</p>
            <h2 className="text-2xl font-bold">{stats.submitted}</h2>
          </div>

          <div className="bg-gray-900 p-4 rounded shadow">
            <p className="text-gray-400 text-sm">Screening</p>
            <h2 className="text-2xl font-bold">{stats.screening}</h2>
          </div>

          <div className="bg-gray-900 p-4 rounded shadow">
            <p className="text-gray-400 text-sm">Interview</p>
            <h2 className="text-2xl font-bold">{stats.interview}</h2>
          </div>

          <div className="bg-gray-900 p-4 rounded shadow">
            <p className="text-gray-400 text-sm">Offer</p>
            <h2 className="text-2xl font-bold">{stats.offer}</h2>
          </div>

          <div className="bg-gray-900 p-4 rounded shadow">
            <p className="text-gray-400 text-sm">Rejected</p>
            <h2 className="text-2xl font-bold">{stats.rejected}</h2>
          </div>

        </div>

      )}


      {/* ------------------------------------------------ */}
      {/* CANDIDATE TRACKER TABLE */}
      {/* ------------------------------------------------ */}

      <div className="overflow-x-auto">

        <table className="min-w-full bg-gray-900 rounded shadow">

          {/* TABLE HEADER */}

          <thead className="bg-gray-800 text-gray-200">

            <tr className="text-left text-sm font-semibold">

              <th className="p-3">Timestamp</th>
              <th className="p-3">Applicant Name</th>
              <th className="p-3">Sourcing Code</th>
              <th className="p-3">Calling Code</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Status</th>
              <th className="p-3">Domain Expert Comment</th>
              <th className="p-3">Client Remarks</th>
              <th className="p-3">Rejection Date</th>

            </tr>

          </thead>


          {/* TABLE BODY */}

          <tbody>

            {Array.isArray(submissions) && submissions.length > 0 ? (

              submissions.map((sub) => (

                <tr
                  key={sub.submission_id || sub.id}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >

                  {/* Timestamp */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.created_at
                      ? new Date(sub.created_at).toLocaleString()
                      : "-"}
                  </td>


                  {/* Candidate Name */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.candidate_name}
                  </td>


                  {/* Sourcing Code */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.sourcing_code}
                  </td>


                  {/* Calling Code */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.calling_code}
                  </td>


                  {/* Profile */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.profile || "-"}
                  </td>


                  {/* Status */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.status}
                  </td>


                  {/* Domain Comment */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.domain_comment || "-"}
                  </td>


                  {/* Client Remarks */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.client_remarks || "-"}
                  </td>


                  {/* Rejection Date */}

                  <td className="p-3 text-sm text-gray-200">
                    {sub.rejection_date || "-"}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan={9} className="p-6 text-center text-gray-400">
                  No candidates submitted yet.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}