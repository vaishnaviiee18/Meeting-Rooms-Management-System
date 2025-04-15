import { useEffect, useState } from "react";

const AdminHome = () => {
  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [processedRequests, setProcessedRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/requests`);
        if (!response.ok) throw new Error("Failed to fetch requests");

        const data = await response.json();
        setRequests(data);

        const pending = data.filter((req) => req.status === "pending");
        const processed = data.filter((req) => req.status !== "pending");

        setPendingRequests(pending);
        setProcessedRequests(processed);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const getUrgentRequests = () => {
    const today = new Date();
    return pendingRequests
      .filter((req) => new Date(req.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {[{ title: "Total Requests", count: requests.length, color: "bg-blue-500" },
          { title: "Pending Requests", count: pendingRequests.length, color: "bg-yellow-500" },
          { title: "Processed Requests", count: processedRequests.length, color: "bg-green-500" }
        ].map((item, index) => (
          <div
            key={index}
            className={`w-32 h-32 flex flex-col justify-center items-center rounded-full text-white ${item.color} shadow-lg`}
          >
            <p className="text-xl font-bold">{item.count}</p>
            <p className="text-sm">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Urgent Requests */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-red-600 mb-4">Urgent Requests</h3>
        {getUrgentRequests().length > 0 ? (
          <div className="space-y-4">
            {getUrgentRequests().map((req) => (
              <div
                key={req.id}
                className={`bg-white shadow-md p-4 rounded-lg border-l-8 transition-all duration-200 
                  hover:shadow-xl hover:scale-105 border-yellow-500`}
              >
                <p className="font-semibold text-lg">{req.clubName}</p>
                <p className="text-gray-600">{req.roomName}</p>
                <p className="text-gray-500">{new Date(req.date).toDateString()}</p>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-200 text-yellow-800 rounded-full mt-2">
                  Urgent
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No urgent requests.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
