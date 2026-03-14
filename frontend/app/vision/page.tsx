"use client";

/*
=====================================================
HIREGINIE VISION PAGE
Futuristic startup landing page
=====================================================
*/

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VisionPage() {

const phrases = [
"Find a React developer in Bangalore...",
"Hire a wedding chef in Mumbai...",
"Discover freelance designers...",
"Find a recruiter for your startup..."
];

const [text,setText] = useState("");
const [index,setIndex] = useState(0);

useEffect(()=>{

let i=0;

const typing = setInterval(()=>{

setText(phrases[index].slice(0,i));

i++;

if(i>phrases[index].length){

clearInterval(typing);

setTimeout(()=>{

setIndex((prev)=> (prev+1)%phrases.length)

},1500)

}

},50)

return ()=>clearInterval(typing)

},[index])

return (

<main className="bg-[#0B0B0B] text-white min-h-screen overflow-hidden relative">


{/* ========================================= */}
{/* BACKGROUND GRADIENT ORBS */}
{/* ========================================= */}

<div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-20 blur-[160px] top-[-200px] left-[-200px] animate-pulse"/>

<div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[160px] bottom-[-200px] right-[-200px] animate-pulse"/>



{/* ========================================= */}
{/* NAVBAR */}
{/* ========================================= */}

<header className="fixed top-0 w-full backdrop-blur-lg bg-black/40 border-b border-white/10 z-50">

<div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

<h1 className="text-xl font-semibold tracking-wide">
Hireginie
</h1>

<nav className="hidden md:flex gap-8 text-sm text-gray-300">

<Link href="#">Platform</Link>
<Link href="#">Marketplace</Link>
<Link href="#">Recruiters</Link>
<Link href="#">AI</Link>

</nav>

<div className="flex gap-4">

<Link href="/login" className="text-sm text-gray-300">
Login
</Link>

<Link
href="/get-started"
className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition"
>
Get Started
</Link>

</div>

</div>

</header>

<div className="h-24"/>


{/* ========================================= */}
{/* HERO */}
{/* ========================================= */}

<section className="max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
>

<h1 className="text-6xl font-bold leading-tight">

The Future

<br/>

<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">

of Talent

</span>

</h1>

<p className="mt-6 text-gray-400 text-lg max-w-lg">

Hire employees, freelancers and recruiters in one AI powered platform.

</p>

<div className="flex gap-4 mt-8">

<button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition">
Hire Talent
</button>

<button className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition">
Explore Work
</button>

</div>

</motion.div>



{/* HERO AI SEARCH */}

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
transition={{duration:1}}
className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-xl"
>

<h3 className="text-xl mb-4 text-center">
Hireginie AI
</h3>

<div className="bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-300 text-sm">

{text}

<span className="animate-pulse">|</span>

</div>

</motion.div>

</section>



{/* ========================================= */}
{/* PLATFORM DOORS */}
{/* ========================================= */}

<section className="max-w-7xl mx-auto px-8 py-28">

<h2 className="text-4xl font-semibold text-center mb-20">

One Platform. Three Economies.

</h2>

<div className="grid md:grid-cols-3 gap-8">

{[
{
title:"Hire Employees",
desc:"ATS pipelines to manage hiring and discover candidates."
},
{
title:"Hire Freelancers",
desc:"Find creators, chefs, developers and designers."
},
{
title:"Recruit & Earn",
desc:"Independent recruiters earn commission per hire."
}
].map((item,index)=>(

<motion.div
key={index}
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/30 transition"
>

<h3 className="text-xl font-semibold">
{item.title}
</h3>

<p className="text-gray-400 mt-4 text-sm">
{item.desc}
</p>

<button className="mt-6 text-blue-400 text-sm">
Explore →
</button>

</motion.div>

))}

</div>

</section>



{/* ========================================= */}
{/* MARKETPLACE */}
{/* ========================================= */}

<section className="py-28 bg-[#080808]">

<div className="max-w-7xl mx-auto px-8">

<h2 className="text-4xl font-semibold text-center mb-20">

Talent Marketplace

</h2>

<div className="grid md:grid-cols-4 gap-6">

{[1,2,3,4].map((item)=>(
<motion.div
key={item}
whileHover={{scale:1.07}}
className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/40 transition"
>

<div className="h-40 bg-gradient-to-br from-purple-500/30 to-blue-500/30"/>

<div className="p-4">

<p className="text-sm font-medium">
Private Chef Service
</p>

<p className="text-xs text-gray-400 mt-1">
From ₹1,200
</p>

</div>

</motion.div>
))}

</div>

</div>

</section>



{/* ========================================= */}
{/* RECRUITER SECTION */}
{/* ========================================= */}

<section className="max-w-7xl mx-auto px-8 py-28 grid lg:grid-cols-2 gap-20 items-center">

<div>

<h2 className="text-4xl font-semibold">

Recruiters

<br/>

Unleashed

</h2>

<p className="text-gray-400 mt-6 max-w-md">

Access jobs, submit candidates and earn commission for successful hires.

</p>

<button className="mt-8 bg-white text-black px-6 py-3 rounded-lg hover:scale-105 transition">

Start Recruiting

</button>

</div>

<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-16 text-center">

Recruiter Dashboard

</div>

</section>



{/* ========================================= */}
{/* CTA */}
{/* ========================================= */}

<section className="py-32 text-center">

<h2 className="text-4xl font-semibold">

Join the Talent Economy

</h2>

<p className="text-gray-400 mt-6">

Companies, freelancers and recruiters in one ecosystem.

</p>

<Link
href="/get-started"
className="mt-8 inline-block bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-xl hover:scale-105 transition"
>
Get Started
</Link>

</section>



<footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">

© 2026 Hireginie

</footer>

</main>

)
}