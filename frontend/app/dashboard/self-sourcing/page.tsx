"use client";

/*
=========================================================
SELF SOURCING TRACKER
=========================================================

Recruiters can:

• Upload candidates
• Select client → role dynamically
• Upload resume
• Track candidates in sheet-style pipeline

Features added:

✔ Resume clickable → opens in new tab
✔ Upload resume button UI
✔ All fields required
✔ Upload button centered
✔ Fix for jobs.map error
✔ Clean symmetric layout
*/

import { useState, useEffect } from "react";

export default function SelfSourcingPage() {

  /*
  =========================================================
  FORM STATE
  =========================================================
  */

  const [formData, setFormData] = useState({
    name: "",
    client_name: "",
    position: "",
    source: "",
    resume: null as File | null
  });

  /*
  =========================================================
  PIPELINE DATA
  =========================================================
  */

  const [tracker, setTracker] = useState<any[]>([]);

  /*
  =========================================================
  CLIENT LIST
  =========================================================
  */

  const [clients, setClients] = useState<any[]>([]);

  /*
  =========================================================
  JOBS FOR SELECTED CLIENT
  =========================================================
  */

  const [jobs, setJobs] = useState<any[]>([]);

  /*
  =========================================================
  SEARCH
  =========================================================
  */

  const [search, setSearch] = useState("");
/*
------------------------------------------------
LOAD CANDIDATES FROM DATABASE
------------------------------------------------
This fetches candidates stored in PostgreSQL
*/

const loadCandidates = async () => {

  try {

    const res = await fetch("http://127.0.0.1:8000/candidates");

    const data = await res.json();

    setTracker(data);

  } catch (error) {

    console.error("Error loading candidates", error);

  }

};
  /*
  =========================================================
  LOAD CLIENTS
  =========================================================
  */

useEffect(() => {

  /*
  Load clients
  */

  fetch("http://127.0.0.1:8000/projects")
    .then((res) => res.json())
    .then((data) => {

      setClients(data);

    });

  /*
  Load candidates from database
  */

  loadCandidates();

}, []);

  /*
  =========================================================
  INPUT CHANGE
  =========================================================
  */

  const handleChange = (e:any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /*
  =========================================================
  FILE UPLOAD
  =========================================================
  */

  const handleFile = (e:any) => {

    setFormData({
      ...formData,
      resume: e.target.files[0]
    });

  };

  /*
  =========================================================
  FORM SUBMIT
  =========================================================
  */

/*
------------------------------------------------
SUBMIT CANDIDATE TO BACKEND
------------------------------------------------
This sends the form data + resume file to FastAPI
*/

const handleSubmit = async (e: any) => {

  e.preventDefault();

  const form = new FormData();

  form.append("name", formData.name);
  form.append("client_name", formData.client_name);
  form.append("position", formData.position);
  form.append("source", formData.source);

  if (formData.resume) {
    form.append("resume", formData.resume);
  }

  try {

    const res = await fetch("http://127.0.0.1:8000/candidate/create", {

      method: "POST",
      body: form

    });

    const data = await res.json();

    console.log("Candidate created:", data);

    /*
    After upload reload candidates
    */

    loadCandidates();

    /*
    Reset form
    */

    setFormData({
      name: "",
      client_name: "",
      position: "",
      source: "",
      resume: null
    });

  } catch (error) {

    console.error("Upload failed", error);

  }

};

  /*
  =========================================================
  EDIT TABLE CELL
  =========================================================
  */

  const updateCell = (index:number, field:string, value:string) => {

    const updated = [...tracker];

    updated[index][field] = value;

    setTracker(updated);

  };

  /*
  =========================================================
  SEARCH FILTER
  =========================================================
  */

  const filteredTracker = tracker.filter((row) => {

    const query = search.toLowerCase();

    return (

      row.name.toLowerCase().includes(query) ||
      row.client_name.toLowerCase().includes(query) ||
      row.position.toLowerCase().includes(query)

    );

  });

  /*
  =========================================================
  UI
  =========================================================
  */

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Self Sourcing Tracker
      </h1>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow grid grid-cols-2 gap-6 mb-10"
      >

        {/* Candidate Name */}

        <input
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        />

        {/* Client Dropdown */}

        <select
          name="client_name"
          value={formData.client_name}
          required
          className="border p-3 rounded"

          onChange={(e)=>{

            handleChange(e);

            const projectId = e.target.value;

            fetch(`http://127.0.0.1:8000/project/${projectId}/jobs`)
              .then(res => res.json())
              .then(data => {

                if(Array.isArray(data)){

                  setJobs(data);

                }else{

                  setJobs([]);

                }

              });

          }}

        >

          <option value="">Select Client</option>

          {clients.map((client:any)=>(
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}

        </select>

        {/* Position Dropdown */}

        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >

          <option value="">Select Position</option>

          {Array.isArray(jobs) && jobs.map((job:any)=>(
            <option key={job.id} value={job.title}>
              {job.title}
            </option>
          ))}

        </select>

        {/* Source Dropdown */}

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >

          <option value="">Select Source</option>

          <option>Naukri</option>
          <option>LinkedIn</option>
          <option>Foundit</option>
          <option>Apna</option>
          <option>LinkedIn Job Posting</option>
          <option>Apna Job Posting</option>
          <option>Naukri Job Posting</option>
          <option>IIM Jobs</option>
          <option>Other Job Portals</option>
          <option>Other Job Posting</option>
          <option>Hirist.tech</option>

        </select>

        {/* Resume Upload */}

        <label className="col-span-2 border rounded p-3 cursor-pointer bg-gray-50 hover:bg-gray-100">

          Upload Resume

          <input
            type="file"
            required
            onChange={handleFile}
            className="hidden"
          />

        </label>

        {/* Submit Button */}

        <div className="col-span-2 flex justify-center">

          <button className="bg-black text-white px-10 py-3 rounded">

            Upload Candidate

          </button>

        </div>

      </form>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <input
        placeholder="Search candidate..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border p-3 rounded w-full mb-6"
      />

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div className="overflow-x-auto">

        <table className="w-full bg-white border">

          <thead className="bg-gray-200">

            <tr>

              <th className="border p-2">Timestamp</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">Source</th>
              <th className="border p-2">Resume</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Current CTC</th>
              <th className="border p-2">Expected CTC</th>
              <th className="border p-2">Caller Remark</th>

            </tr>

          </thead>

          <tbody>

            {filteredTracker.map((row,index)=>(

              <tr key={index}>

                <td className="border p-2">{row.timestamp}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.client_name}</td>
                <td className="border p-2">{row.position}</td>
                <td className="border p-2">{row.source}</td>

                {/* Resume clickable */}

                <td className="border p-2">

  <a
    href={`http://127.0.0.1:8000/${row.resume_path}`}
    target="_blank"
    className="text-blue-600 underline"
  >
    View Resume
  </a>

</td>

                {/* Editable columns */}

                <td className="border p-2">

                  <input
                    value={row.contact}
                    onChange={(e)=>updateCell(index,"contact",e.target.value)}
                    className="border p-1 w-full"
                  />

                </td>

                <td className="border p-2">

                  <input
                    value={row.location}
                    onChange={(e)=>updateCell(index,"location",e.target.value)}
                    className="border p-1 w-full"
                  />

                </td>

                <td className="border p-2">

                  <select
                    value={row.status}
                    onChange={(e)=>updateCell(index,"status",e.target.value)}
                    className="border p-1 w-full"
                  >

                    <option>Future Reference</option>
                    <option>Multiple Followups / Not Interested</option>
                    <option>Unreachable / Call Back</option>
                    <option>Uploaded via dashboard</option>
                    <option>Interested WIP</option>
                    <option>Not Interested</option>
                    <option>Screening Reject</option>
                    <option>Duplicate Profile</option>
                    <option>Position went on hold / Closed</option>

                  </select>

                </td>

                <td className="border p-2">

                  <input
                    value={row.current_ctc}
                    onChange={(e)=>updateCell(index,"current_ctc",e.target.value)}
                    className="border p-1 w-full"
                  />

                </td>

                <td className="border p-2">

                  <input
                    value={row.expected_ctc}
                    onChange={(e)=>updateCell(index,"expected_ctc",e.target.value)}
                    className="border p-1 w-full"
                  />

                </td>

                <td className="border p-2">

                  <input
                    value={row.remark}
                    onChange={(e)=>updateCell(index,"remark",e.target.value)}
                    className="border p-1 w-full"
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}