import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (!user.clubName && !user.name)) return;

    const clubIdentifier = encodeURIComponent(user.clubName || user.name);

    fetch(`http://localhost:8080/api/requests/club/${clubIdentifier}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch club requests");
        return res.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, [user]);

  if (!user) {
    return (
      <div className="text-center text-red-600 font-semibold text-lg mt-10">
        Please log in to view your booking requests.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Room Requests</h2>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-600">No requests found.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-bold text-lg">{req.roomName}</h3>
              <p className="text-gray-600">Date: {req.bookingDate}</p>
              <p className="text-gray-600">Time Slot: {req.timeSlot}</p>
              <p className="text-gray-600">Purpose: {req.purpose || "N/A"}</p>
              <p className="text-gray-600">Club: {req.clubName}</p>
              <p
                className={`font-semibold ${
                  req.status.toLowerCase() === "granted"
                    ? "text-green-600"
                    : req.status.toLowerCase() === "rejected"
                    ? "text-red-600"
                    : "text-yellow-500"
                }`}
              >
                Status: {req.status}
              </p>

              {req.status.toLowerCase() === "granted" && (
                <button
                  onClick={() => navigate(`/view-letter/${req.id}`)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Letter
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
