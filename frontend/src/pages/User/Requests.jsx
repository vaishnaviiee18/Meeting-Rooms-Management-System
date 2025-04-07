import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch requests from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/requests") // Change URL as per your backend
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Requests</h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold">{req.name}</h3>
            <p>Time Slot: {req.time}</p>
            <p>Date: {req.date}</p>
            <p className={`font-semibold ${req.status === "Granted" ? "text-green-600" : "text-yellow-500"}`}>
              {req.status}
            </p>

            {/* Show "View Letter" button only for granted requests */}
            {req.status === "Granted" && (
              <button
                onClick={() => navigate(`/view-letter/${req.id}`)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Letter
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
