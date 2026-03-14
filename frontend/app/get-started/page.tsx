"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GetStartedPage() {

return (

<main className="min-h-screen bg-[#0B0B0B] text-white relative overflow-hidden flex items-center justify-center">


{/* FLOWING BACKGROUND */}

<div className="absolute w-[700px] h-[700px] bg-blue-500 opacity-20 blur-[180px] top-[-200px] left-[-200px] animate-pulse"/>

<div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-20 blur-[160px] bottom-[-200px] right-[-200px] animate-pulse"/>


<div className="max-w-6xl w-full px-8 relative z-10">


{/* HEADER */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-center mb-20"
>

<h1 className="text-5xl font-semibold">

Talent Marketplace

</h1>

<p className="text-gray-400 mt-4 text-lg">

Choose how you want to use Hireginie

</p>

</motion.div>


{/* ROLE CARDS */}

<div className="grid md:grid-cols-3 gap-8">


{/* RECRUITER */}

<Link href="/register?role=employee">

<motion.div
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 hover:border-blue-400/40 transition cursor-pointer"
>

<div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">

<div className="w-6 h-6 bg-blue-400 rounded"/>

</div>

<h3 className="text-xl font-semibold">

Recruiter

</h3>

<p className="text-gray-400 text-sm mt-3">

Source candidates, submit profiles and earn commission per hire.

</p>

<p className="text-blue-400 text-sm mt-6">

Continue →

</p>

</motion.div>

</Link>



{/* EMPLOYER */}

<Link href="/register?role=client">

<motion.div
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 hover:border-purple-400/40 transition cursor-pointer"
>

<div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">

<div className="w-6 h-6 bg-purple-400 rounded"/>

</div>

<h3 className="text-xl font-semibold">

Employer

</h3>

<p className="text-gray-400 text-sm mt-3">

Post jobs, hire talent and manage your recruitment pipeline.

</p>

<p className="text-purple-400 text-sm mt-6">

Continue →

</p>

</motion.div>

</Link>



{/* FREELANCER */}

<Link href="/register?role=freelancer">

<motion.div
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 hover:border-pink-400/40 transition cursor-pointer"
>

<div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-6">

<div className="w-6 h-6 bg-pink-400 rounded"/>

</div>

<h3 className="text-xl font-semibold">

Freelancer

</h3>

<p className="text-gray-400 text-sm mt-3">

Sell your skills, offer services and work with global clients.

</p>

<p className="text-pink-400 text-sm mt-6">

Continue →

</p>

</motion.div>

</Link>


</div>

</div>

</main>

);

}