/*
EMPLOYEE DASHBOARD

Used by recruiters / ops leads.

Shows personal pipeline stats.
*/

export default function EmployeeDashboard() {

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Recruiter Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          My Jobs
        </div>

        <div className="bg-white p-6 rounded shadow">
          My Candidates
        </div>

        <div className="bg-white p-6 rounded shadow">
          My Hires
        </div>

      </div>

    </div>

  );
}