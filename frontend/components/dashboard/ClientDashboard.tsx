/*
CLIENT DASHBOARD

Used by clients to track hiring progress.
*/

export default function ClientDashboard() {

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Client Hiring Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          Submitted Candidates
        </div>

        <div className="bg-white p-6 rounded shadow">
          Interviews
        </div>

        <div className="bg-white p-6 rounded shadow">
          Hires
        </div>

      </div>

    </div>

  );
}