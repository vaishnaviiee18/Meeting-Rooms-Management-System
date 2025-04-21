import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/requests`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const requestToUpdate = requests.find(req => req.id === requestId);
      if (!requestToUpdate) return;

      const updatedRequest = { ...requestToUpdate, status: newStatus };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRequest)
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      // Update local state
      setRequests(requests.map(req =>
          req.id === requestId ? { ...req, status: newStatus } : req
      ));

      toast.success(`Request ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request status");
    }
  };

  const getUrgentRequests = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    return requests
        .filter(req => {
          const bookingDate = new Date(req.bookingDate);
          return bookingDate >= today && bookingDate <= threeDaysFromNow && req.status === "PENDING";
        })
        .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
  };

  const filteredRequests = filter === "all"
      ? requests
      : filter === "urgent"
          ? getUrgentRequests()
          : requests.filter(req => req.status === filter);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED": return "bg-green-200 text-green-800";
      case "DENIED": return "bg-red-200 text-red-800";
      case "PENDING": return "bg-yellow-200 text-yellow-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  const getBorderClass = (status) => {
    switch (status) {
      case "APPROVED": return "border-green-500";
      case "DENIED": return "border-red-500";
      case "PENDING": return "border-yellow-500";
      default: return "border-gray-300";
    }
  };

  if (loading) {
    return (
        <div className="p-6 max-w-4xl mx-auto flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="spinner-border text-purple-700" role="status">
              <svg className="animate-spin h-8 w-8 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="mt-3 text-gray-600">Loading requests...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">All Room Requests</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
              className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                  filter === "all" ? "bg-purple-700" : "bg-gray-400"
              }`}
              onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
              className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                  filter === "APPROVED" ? "bg-purple-700" : "bg-gray-400"
              }`}
              onClick={() => setFilter("APPROVED")}
          >
            Approved
          </button>
          <button
              className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                  filter === "DENIED" ? "bg-purple-700" : "bg-gray-400"
              }`}
              onClick={() => setFilter("DENIED")}
          >
            Denied
          </button>
          <button
              className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                  filter === "PENDING" ? "bg-purple-700" : "bg-gray-400"
              }`}
              onClick={() => setFilter("PENDING")}
          >
            Pending
          </button>
          <button
              className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                  filter === "urgent" ? "bg-purple-700" : "bg-gray-400"
              }`}
              onClick={() => setFilter("urgent")}
          >
            Urgent
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                  <div
                      key={req.id}
                      className={`bg-white shadow-md p-4 rounded-lg border-l-8 transition-all duration-200 
                hover:shadow-lg ${getBorderClass(req.status)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">{req.clubName}</p>
                        <p className="text-gray-600">Room: {req.room?.name || "Unknown Room"}</p>
                        <p className="text-gray-600">Time Slot: {req.timeSlot}</p>
                        <p className="text-gray-500">Date: {new Date(req.bookingDate).toLocaleDateString()}</p>
                        <p className="text-gray-500">Purpose: {req.purpose}</p>
                        <p className="text-gray-500">Requester: {req.userEmail}</p>
                        <span
                            className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${getStatusBadgeClass(req.status)}`}
                        >
                    {req.status}
                  </span>
                      </div>

                      {req.status === "PENDING" && (
                          <div className="flex flex-col gap-2">
                            <button
                                onClick={() => handleStatusChange(req.id, "APPROVED")}
                                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                              Approve
                            </button>
                            <button
                                onClick={() => handleStatusChange(req.id, "DENIED")}
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                              Deny
                            </button>
                          </div>
                      )}

                      {req.status === "APPROVED" && (
                          <a
                              href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/requests/${req.id}/generate-letter`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                          >
                            View Letter
                          </a>
                      )}
                    </div>
                  </div>
              ))
          ) : (
              <div className="bg-white shadow-md p-8 rounded-lg text-center">
                <p className="text-gray-500">No requests found matching your filter.</p>
                {filter !== "all" && (
                    <button
                        className="mt-4 text-purple-600 hover:text-purple-800 underline"
                        onClick={() => setFilter("all")}
                    >
                      View all requests
                    </button>
                )}
              </div>
          )}
        </div>
      </div>
  );
};

export default AllRequests;