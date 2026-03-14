"use client";

/*
------------------------------------------------
PROJECT PAGE
------------------------------------------------

This page shows jobs inside a specific project.

Example route:

/projects/1

Which means:
Project ID = 1
*/

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
export default function ProjectPage() {

  /*
  useParams reads the ID from the URL.

  Example URL:
  /projects/1

  projectId = 1
  */

  const params = useParams();
  const projectId = params.projectId;

  // Store jobs
  const [jobs, setJobs] = useState<any[]>([]);

  // Loading state
  const [loading, setLoading] = useState(true);


  /*
  Fetch jobs for this project
  */

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/project/${projectId}/jobs`)
      .then((res) => res.json())
      .then((data) => {

        setJobs(data);
        setLoading(false);

      });

  }, [projectId]);


  if (loading) {
    return <div className="p-10">Loading jobs...</div>;
  }


  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Project Jobs
      </h1>


      <div className="grid gap-6">

       {jobs.map((job) => (

  <div
   key={job.job_id || job.id}
    className="bg-white p-6 rounded-xl shadow hover:bg-gray-100"
  >

    {/* -------------------------------- */}
    {/* JOB TITLE → GO TO PIPELINE */}
    {/* -------------------------------- */}

    <Link href={`/projects/${projectId}/${job.job_id || job.id}`}>

      <h2 className="text-xl font-semibold cursor-pointer">
        {job.title}
      </h2>

    </Link>


    {/* Job Location */}

    <p className="text-gray-600">
      Location: {job.location}
    </p>


    {/* -------------------------------- */}
    {/* SUBMIT CANDIDATE BUTTON */}
    {/* -------------------------------- */}

    <Link
      href={`/projects/${projectId}/${job.job_id || job.id}/submit`}
      className="text-blue-600 underline mt-3 inline-block"
    >
      Submit Candidate
    </Link>

  </div>

))}
      </div>

    </div>
  );
}