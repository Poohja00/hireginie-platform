"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SetupProfile() {

const params = useSearchParams();
const role = params.get("role");

const [step,setStep] = useState(1);

const nextStep = () => setStep(step + 1);
const prevStep = () => setStep(step - 1);

const getTitle = () => {

if(role === "employee") return "Setup Recruiter Profile";
if(role === "client") return "Setup Employer Profile";
if(role === "freelancer") return "Setup Freelancer Profile";

return "Setup Profile";

};

return (

<main className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center pt-24 px-6">


{/* HEADER */}

<h1 className="text-3xl font-semibold mb-2">
{getTitle()}
</h1>

<p className="text-gray-400 mb-10">
Step {step} of 3
</p>


{/* CARD */}

<div className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">


{/* ===================== */}
{/* STEP 1 BASIC INFO */}
{/* ===================== */}

{step === 1 && (

<div className="space-y-4">

<input
type="text"
placeholder="Phone Number"
className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
/>

<input
type="text"
placeholder="Country"
className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
/>

<input
type="text"
placeholder="LinkedIn Profile"
className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
/>

<button
onClick={nextStep}
className="w-full mt-4 bg-blue-500 py-3 rounded-lg"
>

Next

</button>

</div>

)}



{/* ===================== */}
{/* STEP 2 EXPERTISE */}
{/* ===================== */}

{step === 2 && (

<div className="space-y-4">

<select className="w-full p-3 rounded-lg bg-black/40 border border-white/10">

<option>Industry Specialization</option>
<option>Technology</option>
<option>Finance</option>
<option>Healthcare</option>
<option>Hospitality</option>
<option>Creative</option>

</select>

<select className="w-full p-3 rounded-lg bg-black/40 border border-white/10">

<option>Roles you recruit for</option>
<option>Developers</option>
<option>Designers</option>
<option>Sales</option>
<option>Operations</option>

</select>

<select className="w-full p-3 rounded-lg bg-black/40 border border-white/10">

<option>Years of Experience</option>
<option>0-1</option>
<option>2-5</option>
<option>5-10</option>
<option>10+</option>

</select>


<div className="flex gap-4">

<button
onClick={prevStep}
className="w-full border border-white/20 py-3 rounded-lg"
>

Back

</button>

<button
onClick={nextStep}
className="w-full bg-blue-500 py-3 rounded-lg"
>

Next

</button>

</div>

</div>

)}



{/* ===================== */}
{/* STEP 3 PREFERENCES */}
{/* ===================== */}

{step === 3 && (

<div className="space-y-4">

<select className="w-full p-3 rounded-lg bg-black/40 border border-white/10">

<option>Recruiting Geography</option>
<option>Global</option>
<option>India</option>
<option>Asia</option>
<option>Remote Only</option>

</select>

<select className="w-full p-3 rounded-lg bg-black/40 border border-white/10">

<option>Work Type</option>
<option>Full Time Hiring</option>
<option>Contract Hiring</option>
<option>Freelance Hiring</option>

</select>

<div className="flex gap-4">

<button
onClick={prevStep}
className="w-full border border-white/20 py-3 rounded-lg"
>

Back

</button>

<button
className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg"
>

Finish Setup

</button>

</div>

</div>

)}

</div>

</main>

);
}