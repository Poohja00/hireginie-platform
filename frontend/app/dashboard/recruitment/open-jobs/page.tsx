"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OpenJobsPage() {

  const [jobs,setJobs] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    fetch("http://127.0.0.1:8000/jobs")
    .then(res=>res.json())
    .then(data=>{
      setJobs(data);
      setLoading(false);
    })

  },[])

  if(loading){
    return <div className="p-10">Loading jobs...</div>
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Open Jobs
      </h1>

      <div className="grid gap-6">

        {jobs.map((job)=>(

          <div
          key={job.id}
          className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="text-gray-600">
              Location: {job.location}
            </p>

            <div className="flex gap-4 mt-4">

              <Link
              href={`/projects/${job.project_id}/${job.id}`}
              className="text-blue-600 underline"
              >
              View Pipeline
              </Link>

              <Link
              href={`/projects/${job.project_id}/${job.id}/submit`}
              className="text-green-600 underline"
              >
              Submit Candidate
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}