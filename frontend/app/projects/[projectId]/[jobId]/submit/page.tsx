"use client";

/*
------------------------------------------------
JOB CANDIDATE SUBMISSION FORM
------------------------------------------------

Recruiters fill this form to submit candidates
to a job pipeline.

Flow:

1. Create candidate
POST /candidate/create

2. Submit candidate to job
POST /submission/create
*/

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SubmitCandidatePage() {

  const params = useParams();
  const jobId = params.jobId;
  const router = useRouter();

  // ------------------------------------------------
  // FORM DATA
  // ------------------------------------------------

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",

    current_company: "",
    designation: "",
    location: "",
    experience: "",
    education: "",

    notice_period: "",
    current_ctc: "",
    expected_ctc: "",

    reason_change: "",

    resume_url: "",

    sourcing_code: "",
    calling_code: ""

  });


  // ------------------------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------------------------

  const handleChange = (e:any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ------------------------------------------------
  // SUBMIT FORM
  // ------------------------------------------------

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    try {

      // ---------------------------------------------
      // CREATE CANDIDATE
      // ---------------------------------------------

      const candidateRes = await fetch(
        "http://127.0.0.1:8000/candidate/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resume_url: formData.resume_url
          })
        }
      );

      const candidateData = await candidateRes.json();


      // ---------------------------------------------
      // CREATE SUBMISSION
      // ---------------------------------------------

      await fetch(
        "http://127.0.0.1:8000/submission/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            candidate_id: candidateData.candidate_id,
            job_id: jobId,
            sourcing_code: formData.sourcing_code,
            calling_code: formData.calling_code
          })
        }
      );
      // Redirect to pipeline page
      router.push(`/projects/${params.projectId}/${jobId}`);

    } catch (error) {

      console.error(error);
      alert("Submission failed");

    }

  };


  // ------------------------------------------------
  // UI
  // ------------------------------------------------

  return (

    <div className="p-10 max-w-2xl">

      <h1 className="text-3xl font-bold mb-8">
        Submit Candidate
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="name"
          placeholder="Applicant Full Name"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="email"
          placeholder="Applicant Email"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="phone"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="current_company"
          placeholder="Current Company"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="designation"
          placeholder="Current Designation"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="location"
          placeholder="Current Location"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="experience"
          placeholder="Total Experience (Years)"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="education"
          placeholder="Education"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="notice_period"
          placeholder="Notice Period"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="current_ctc"
          placeholder="Current CTC"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="expected_ctc"
          placeholder="Expected CTC"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="reason_change"
          placeholder="Reason for job change"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="resume_url"
          placeholder="Resume URL"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="sourcing_code"
          placeholder="Sourcing Partner Code"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="calling_code"
          placeholder="Calling Partner Code"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          className="bg-black text-white px-6 py-2 rounded"
        >
          Submit Candidate
        </button>

      </form>

    </div>

  );

}