"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage() {

const params = useSearchParams();
const role = params.get("role") || "employee";
const router = useRouter();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const getTitle = () => {

if(role === "employee") return "Create Recruiter Account";
if(role === "client") return "Create Employer Account";
if(role === "freelancer") return "Create Freelancer Account";

return "Create Account";
};

const handleRegister = async () => {

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: role
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Registration failed");
      return;
    }

    // save user session
    localStorage.setItem("user_id", data.user_id);
localStorage.setItem("user_role", role || "employee");
    // move to profile setup
    router.push(`/setup-profile?role=${role}`);

  }

  catch (error) {

    console.error("Registration error:", error);
    alert("Server connection failed");

  }

};

return (
    

<main className="min-h-screen bg-[#0B0B0B] text-white relative overflow-hidden flex flex-col items-center pt-24 pb-16 px-6">


{/* BACKGROUND GRADIENT ORBS */}

<div className="absolute w-[600px] h-[600px] bg-blue-500 opacity-20 blur-[160px] top-[-200px] left-[-200px] animate-pulse"/>

<div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-20 blur-[160px] bottom-[-200px] right-[-200px] animate-pulse"/>



{/* PROGRESS BAR */}

<div className="flex items-center gap-6 text-sm mb-12 z-10">

<div className="flex items-center gap-3">

<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
1
</div>

<span className="text-gray-300">
Choose Role
</span>

</div>

<div className="w-16 h-[1px] bg-white/20"/>

<div className="flex items-center gap-3">

<div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-semibold">
2
</div>

<span className="text-white font-medium">
Create Account
</span>

</div>

<div className="w-16 h-[1px] bg-white/20"/>

<div className="flex items-center gap-3">

<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
3
</div>

<span className="text-gray-400">
Setup Profile
</span>

</div>

</div>



{/* FORM CARD */}

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] p-10"
>


<h1 className="text-2xl font-semibold mb-2 text-center">
{getTitle()}
</h1>

<p className="text-gray-400 text-sm mb-6 text-center">
Join Hireginie and start your journey
</p>



{/* GOOGLE */}

<button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg hover:scale-[1.02] transition">

<img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5"/>

Continue with Google

</button>



{/* LINKEDIN */}

<button className="w-full flex items-center justify-center gap-3 bg-[#0077B5] py-3 rounded-lg mt-3 hover:scale-[1.02] transition">

<img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="w-5"/>

Continue with LinkedIn

</button>



{/* DIVIDER */}

<div className="flex items-center gap-3 my-6 text-gray-500 text-sm">

<div className="flex-1 h-[1px] bg-white/10"/>

or

<div className="flex-1 h-[1px] bg-white/10"/>

</div>



{/* FORM */}

<div className="space-y-4">

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white"
/>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white"
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white"
/>

<button
onClick={handleRegister}
disabled={!name || !email || !password || !confirmPassword}
className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-medium disabled:opacity-50"
>
Create Account
</button>

</div>



<p className="text-gray-400 text-sm mt-6 text-center">

Already have an account?

<span className="text-blue-400 cursor-pointer ml-1">
Login
</span>

</p>

</motion.div>

</main>

);
}