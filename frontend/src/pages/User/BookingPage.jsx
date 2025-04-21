import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const BookingPage = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState(location.state?.room || null);
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const timeSlots = ["9:00 - 11:00", "11:00 - 13:00", "13:00 - 15:00", "15:00 - 17:00"];

  // Fetch room if not provided in location state
  useEffect(() => {
    if (!room && roomId) {
      fetch(`http://localhost:8080/api/rooms/${roomId}`)
          .then(res => {
            if (!res.ok) throw new Error("Failed to fetch room details");
            return res.json();
          })
          .then(data => {
            setRoom(data);
          })
          .catch(error => {
            console.error("Error fetching room:", error);
            toast.error("Failed to load room details");
          });
    }
  }, [room, roomId]);

  // Fetch booked slots for the selected date
  useEffect(() => {
    if (date && room?.name) {
      setLoading(true);
      fetch(`http://localhost:8080/api/requests/room/${room.name}/date/${date}`)
          .then((res) => res.json())
          .then((data) => {
            const booked = data.map((req) => req.timeSlot);
            setBookedSlots(booked);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching booked slots:", err);
            setLoading(false);
            // Empty array for no bookings is a valid state
            setBookedSlots([]);
          });
    }
  }, [date, room]);

  const isBooked = (slot) => bookedSlots.includes(slot);

  const isPastDate = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    return selected < today;
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error("You must be logged in to book a room");
      navigate("/login");
      return;
    }

    if (!date || !purpose || !selectedTime) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isPastDate(date)) {
      toast.error("You cannot book for a past date");
      return;
    }

    try {
      setLoading(true);

      const bookingRequest = {
        room: {
          id: room.id,
          name: room.name
        },
        bookingDate: date,
        timeSlot: selectedTime,
        purpose,
        clubName: user.club || user.email,
        userEmail: user.email
      };

      const response = await fetch("http://localhost:8080/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit booking request");
      }

      const result = await response.json();

      toast.success("Booking request submitted successfully!");
      setDate("");
      setPurpose("");
      setSelectedTime("");
      setBookedSlots([]);

      // Redirect to bookings list
      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);

    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(error.message || "Failed to submit booking request");
    } finally {
      setLoading(false);
    }
  };

  if (!room) {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="spinner-border text-purple-700" role="status">
              <svg className="animate-spin h-8 w-8 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="mt-3 text-gray-600">Loading room details...</p>
          </div>
        </div>
    );
  }

  if (!user) {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Authentication Required</h2>
            <p className="text-gray-700 mb-6">Please log in to request a room booking.</p>
            <button
                onClick={() => navigate("/login")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg w-full">
          <img src={room.img} alt={room.name} className="w-full h-48 object-cover rounded-lg" />
          <h2 className="text-2xl font-bold text-center mt-4">{room.name}</h2>
          <p className="text-center text-gray-600">
            {room.type} • Capacity: {room.capacity}
          </p>

          <div className="mt-6">
            <label className="block text-gray-700">Date</label>
            <input
                type="date"
                className="w-full p-2 border rounded-lg"
                value={date}
                min={new Date().toISOString().split("T")[0]} // restrict past dates
                onChange={(e) => {
                  setDate(e.target.value);
                  setSelectedTime(""); // Reset selected time when date changes
                }}
                disabled={loading}
            />

            <label className="block text-gray-700 mt-4">Purpose</label>
            <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={purpose}
                placeholder="Enter purpose"
                onChange={(e) => setPurpose(e.target.value)}
                disabled={loading}
            />

            <label className="block text-gray-700 mt-4">Time Slots</label>
            {loading && date ? (
                <div className="text-center py-4">
                  <div className="spinner-border inline-block" role="status">
                    <svg className="animate-spin h-5 w-5 text-purple-700 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">Loading available slots...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {!date ? (
                      <p className="col-span-2 text-center text-sm text-gray-500">Please select a date to see available time slots</p>
                  ) : (
                      timeSlots.map((slot) => (
                          <button
                              key={slot}
                              disabled={isBooked(slot) || loading}
                              onClick={() => setSelectedTime(slot)}
                              className={`p-2 rounded-lg text-white transition ${
                                  isBooked(slot)
                                      ? "bg-red-400 cursor-not-allowed"
                                      : selectedTime === slot
                                          ? "bg-purple-600"
                                          : "bg-green-500 hover:bg-green-600"
                              }`}
                              title={isBooked(slot) ? "This time slot is already booked." : "Click to select"}
                          >
                            {isBooked(slot) ? `${slot} (Booked)` : slot}
                          </button>
                      ))
                  )}
                </div>
            )}

            <button
                onClick={handleBooking}
                disabled={loading || !date || !purpose || !selectedTime}
                className={`mt-6 w-full text-white p-3 rounded-lg text-lg font-semibold transition ${
                    loading || !date || !purpose || !selectedTime
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
              {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
              ) : (
                  "Request Booking"
              )}
            </button>
          </div>
        </div>
      </div>
  );
};

export default BookingPage;