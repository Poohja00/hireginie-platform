/*
FREELANCER DASHBOARD

Used by external talent sourcers.

Freelancers can submit candidates
and track their submissions.
*/

export default function FreelancerDashboard() {

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Freelancer Portal
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          Available Jobs
        </div>

        <div className="bg-white p-6 rounded shadow">
          My Submissions
        </div>

        <div className="bg-white p-6 rounded shadow">
          My Earnings
        </div>

      </div>

    </div>

  );
}