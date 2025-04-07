import { useEffect, useState } from "react";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/requests");
        if (!response.ok) throw new Error("Failed to fetch requests");

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const getUrgentRequests = () => {
    const today = new Date();
    return requests
      .filter((req) => new Date(req.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : filter === "urgent"
      ? getUrgentRequests()
      : requests.filter((req) => req.status.toLowerCase() === filter);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">All Requests</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["all", "granted", "denied", "urgent"].map((status) => (
          <button
            key={status}
            className={`px-5 py-2 rounded-lg text-white font-medium transition ${
              filter === status ? "bg-purple-700" : "bg-gray-400"
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`bg-white shadow-md p-4 rounded-lg border-l-8 transition-all duration-200 
                hover:shadow-xl hover:scale-105
                ${
                  req.status === "granted"
                    ? "border-green-500"
                    : req.status === "denied"
                    ? "border-red-500"
                    : "border-yellow-500"
                }`}
            >
              <p className="font-semibold text-lg">{req.clubName}</p>
              <p className="text-gray-600">{req.roomName}</p>
              <p className="text-gray-500">{new Date(req.date).toDateString()}</p>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2
                ${
                  req.status === "granted"
                    ? "bg-green-200 text-green-800"
                    : req.status === "denied"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
