import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const BookingPage = () => {
  const location = useLocation();
  const room = location.state?.room;
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const timeSlots = ["9:00 - 11:00", "11:00 - 13:00", "13:00 - 15:00", "15:00 - 17:00"];

  useEffect(() => {
    if (date && room?.name) {
      fetch(`http://localhost:8080/api/requests/room/${room.name}/date/${date}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch bookings");
          return res.json();
        })
        .then((data) => {
          const booked = data.map((req) => req.timeSlot);
          setBookedSlots(booked);
        })
        .catch((err) => console.error(err));
    }
  }, [date, room]);

  const isBooked = (slot) => bookedSlots.includes(slot);

  const isPastDate = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    return selected < today.setHours(0, 0, 0, 0);
  };

  const handleBooking = () => {
    if (!date || !purpose || !selectedTime) {
      alert("Please fill in all fields.");
      return;
    }

    if (isPastDate(date)) {
      alert("You cannot book for a past date.");
      return;
    }

    const bookingRequest = {
      room: {
        name: room.name
      },
      bookingDate: date,
      timeSlot: selectedTime,
      purpose,
      status: "PENDING",
      clubName: user.clubName || user.name,
    };

    fetch("http://localhost:8080/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingRequest),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send request");
        return res.json();
      })
      .then(() => {
        alert("Booking request submitted!");
        setDate("");
        setPurpose("");
        setSelectedTime("");
        setBookedSlots([]);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit booking request.");
      });
  };

  if (!user) {
    return <div className="text-center text-red-500 text-xl font-semibold mt-10">Please log in to request a room.</div>;
  }

  if (!room) {
    return <div className="text-center text-red-500 text-xl font-bold">Error: No room selected for booking.</div>;
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
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block text-gray-700 mt-4">Purpose</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={purpose}
            placeholder="Enter purpose"
            onChange={(e) => setPurpose(e.target.value)}
          />

          <label className="block text-gray-700 mt-4">Time Slots</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                disabled={isBooked(slot)}
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
            ))}
          </div>

          <button
            onClick={handleBooking}
            className="mt-6 w-full bg-purple-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            Request Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
