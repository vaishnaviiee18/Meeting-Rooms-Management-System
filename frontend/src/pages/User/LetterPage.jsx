import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LetterPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/requests/${id}`)
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching request:", err));
  }, [id]);

  const handleGenerateLetter = () => {
    fetch(`http://localhost:8080/api/requests/${id}/generate-letter`)
      .then((res) => res.text())
      .then((data) => setLetter(data))
      .catch((err) => {
        setError("Failed to generate letter.");
        console.error("Error generating letter:", err);
      });
  };

  if (!request) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Room Booking Confirmation</h2>
      <p>
        The room <span className="font-bold">{request.roomName}</span> is assigned to
        the <span className="font-bold">{request.clubName}</span> for the time slot{" "}
        <span className="font-bold">{request.timeSlot}</span> on{" "}
        <span className="font-bold">{request.date}</span>.
      </p>
      <p className="mt-4">Thank you for using our booking system.</p>

      {/* Button to generate letter */}
      {request.status === "APPROVED" && (
        <button
          className="mt-6 p-3 bg-green-500 text-white rounded-lg"
          onClick={handleGenerateLetter}
        >
          Generate Letter
        </button>
      )}

      {/* Display error or the generated letter */}
      {error && <p className="text-red-500">{error}</p>}
      {letter && (
        <div
          className="mt-6 p-4 bg-gray-100 border rounded-lg"
          dangerouslySetInnerHTML={{ __html: letter }}
        ></div>
      )}
    </div>
  );
};

export default LetterPage;
