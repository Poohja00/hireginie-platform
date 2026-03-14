"use client";

/*
====================================================
HIREGINIE LOGIN PAGE
====================================================

This page authenticates users for the platform.

Flow:

1. User selects portal
2. Portal title updates above login form
3. User enters email/password
4. Request sent to FastAPI backend
5. Backend returns role
6. User redirected to correct dashboard
*/

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  /*
  Store email input
  */
  const [email, setEmail] = useState("");

  /*
  Store password input
  */
  const [password, setPassword] = useState("");

  /*
 /*
Default portal = employee
Most users will be recruiters
*/

const [role, setRole] = useState("employee");

  /*
  Convert role to UI title
  */

  const getPortalTitle = () => {

    if (role === "admin") return "ADMIN LOGIN";
    if (role === "employee") return "EMPLOYEE LOGIN";
    if (role === "client") return "CLIENT LOGIN";
    if (role === "freelancer") return "FREELANCER LOGIN";

    return "AUTHENTICATION";

  };


  /*
  ====================================================
  LOGIN FUNCTION
  ====================================================
  */

  const handleLogin = async () => {

    if (!role) {

      alert("Please select a portal first");

      return;

    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password,
            role: role
          })

        }
      );

      const data = await response.json();

if (!response.ok) {
  alert(data.detail || "Login failed");
  return;
}

if (data.role !== role) {
  alert("Incorrect portal selected for this account");
  return;
}

      /*
      Save session
      */


localStorage.setItem("user_id", data.user_id);
localStorage.setItem("user_role", data.role);

/* store employee info safely */
localStorage.setItem("user_name", data.name || "");
localStorage.setItem("employee_code", data.employee_code || "");
      /*
      Redirect based on role
      */

     /*
Redirect based on role
All users land on their main dashboard
*/

if (role === "admin") {
  router.push("/dashboard");
}

else if (role === "employee") {
  router.push("/dashboard");
}

else if (role === "client") {
  router.push("/dashboard/client");
}

else if (role === "freelancer") {
  router.push("/dashboard/freelancer");
}

    }

    catch (error) {

      console.error("Login error:", error);

      alert("Login failed");

    }

  };


  /*
  ====================================================
  UI
  ====================================================
  */

  return (

    <div className="h-screen flex items-center justify-center bg-gray-200">

      <div className="bg-white w-96 rounded-xl shadow-lg overflow-hidden">


        {/* HEADER */}

        <div className="bg-black text-white text-center p-6">

          <h1 className="text-2xl font-bold">

            HIREGINIE

          </h1>

          <p className="text-sm text-gray-400">

            Talent Cloud OPS

          </p>

        </div>


        {/* LOGIN SECTION */}

        <div className="p-6 space-y-4">

          {/* Portal Title */}

          <h2 className="text-center text-sm font-semibold tracking-wider text-gray-700">

            {getPortalTitle()}

          </h2>


          {/* EMAIL */}

          <input
            type="email"
            placeholder="Corporate Email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
            className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
          >

            AUTHENTICATE

          </button>


          {/* QUICK ACCESS PORTALS */}

          <div className="mt-6 space-y-2 text-sm">

            <p className="text-gray-400 text-xs tracking-wider">

              QUICK ACCESS PORTALS

            </p>


            <button
              onClick={() => setRole("admin")}
              className="block w-full text-left hover:text-red-600"
            >
              Administrative →
            </button>


            <button
              onClick={() => setRole("employee")}
              className="block w-full text-left hover:text-red-600"
            >
              Employee Portal →
            </button>


            <button
              onClick={() => setRole("client")}
              className="block w-full text-left hover:text-red-600"
            >
              Client Login →
            </button>


            <button
              onClick={() => setRole("freelancer")}
              className="block w-full text-left hover:text-red-600"
            >
              Freelancer Login →
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}