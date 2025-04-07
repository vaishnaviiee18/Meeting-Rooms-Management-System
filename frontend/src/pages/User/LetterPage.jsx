import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LetterPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/requests/${id}`) // Fetch request details
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching request:", err));
  }, [id]);

  if (!request) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Room Booking Confirmation</h2>
      <p>
        The room <span className="font-bold">{request.name}</span> is assigned to
        the <span className="font-bold">{request.clubName}</span> for the time slot{" "}
        <span className="font-bold">{request.time}</span> on{" "}
        <span className="font-bold">{request.date}</span>.
      </p>
      <p className="mt-4">Thank you for using our booking system.</p>
    </div>
  );
};

export default LetterPage;
