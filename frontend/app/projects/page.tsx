"use client";

/*
This page shows all hiring projects.

It connects to the FastAPI backend and fetches projects
from this endpoint:

http://127.0.0.1:8000/projects
*/

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {

  // Store projects fetched from backend
  const [projects, setProjects] = useState<any[]>([]);

  /*
  useEffect runs automatically when the page loads.
  We use it to call the backend API.
  */
  useEffect(() => {

    // Call FastAPI backend
    fetch("http://127.0.0.1:8000/projects")
      // Convert response to JSON
      .then((res) => res.json())

      // Save data inside React state
      .then((data) => {
        setProjects(data);
      });

  }, []); // [] means run only once when page loads


  return (
    <div className="p-10">

      {/* Page title */}
<h1 className="text-3xl font-bold mb-6">
Open Jobs
</h1>
      {/* Grid layout for project cards */}
      <div className="grid gap-6">

        {/* Loop through projects and display each one */}
        {projects.map((project) => (

          <Link key={project.id} href={`/projects/${project.id}`}>

           <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:bg-gray-50">

            <h2 className="text-xl font-semibold">
              {project.name}
            </h2>

           <p className="text-gray-600 mt-2">
             Company: {project.company}
           </p>

           <p className="text-gray-600">
             Client Manager ID: {project.client_manager_id}
           </p>

        </div>

    </Link>

 ))}

      </div>

    </div>
  );
}