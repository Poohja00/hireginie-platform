"use client";

/*
----------------------------------------------------
ROLE BASED DASHBOARD ROUTER
----------------------------------------------------

This file decides which dashboard to show
based on the logged in user's role.

Roles supported:

admin
employee
client
freelancer

The role is saved in the browser
after login using localStorage.
*/

import { useEffect, useState } from "react";

/*
Import dashboard components.

We will create these files next.
*/

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import FreelancerDashboard from "@/components/dashboard/FreelancerDashboard";

export default function DashboardRouter() {

  /*
  State to store user role
  */

  const [role, setRole] = useState<string | null>(null);

  /*
  When the page loads we read the role
  from localStorage
  */

  useEffect(() => {

    const storedRole = localStorage.getItem("user_role");

    setRole(storedRole);

  }, []);

  /*
  While loading
  */

  if (!role) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  /*
  ADMIN DASHBOARD
  */

  if (role === "admin") {
    return <AdminDashboard />;
  }

  /*
  EMPLOYEE DASHBOARD
  */

  if (role === "employee") {
    return <EmployeeDashboard />;
  }

  /*
  CLIENT DASHBOARD
  */

  if (role === "client") {
    return <ClientDashboard />;
  }

  /*
  FREELANCER DASHBOARD
  */

  if (role === "freelancer") {
    return <FreelancerDashboard />;
  }

  /*
  If role is unknown
  */

  return <div className="p-10">Unknown user role</div>;
}