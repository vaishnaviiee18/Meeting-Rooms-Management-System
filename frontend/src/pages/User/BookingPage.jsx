import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const location = useLocation();
  const room = location.state?.room;

  
  if (!room) {
    return <div className="text-center text-red-500 text-xl font-bold">Error: No room selected for booking.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-lg w-full">
        <img src={room.img} alt={room.name} className="w-full h-48 object-cover rounded-lg" />
        <h2 className="text-2xl font-bold text-center mt-4">{room.name}</h2>
        <p className="text-center text-gray-600">{room.type} • Capacity: {room.capacity}</p>

        {/* Booking Form */}
        <div className="mt-6">
          <label className="block text-gray-700">Date</label>
          <input type="date" className="w-full p-2 border rounded-lg" />

          <label className="block text-gray-700 mt-4">Purpose</label>
          <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter purpose" />

          <label className="block text-gray-700 mt-4">Time Slots</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="p-2 bg-green-500 text-white rounded-lg">9:00 - 11:00</button>
            <button className="p-2 bg-red-500 text-white rounded-lg" disabled>11:00 - 13:00 (Booked)</button>
            <button className="p-2 bg-green-500 text-white rounded-lg">13:00 - 15:00</button>
            <button className="p-2 bg-green-500 text-white rounded-lg">15:00 - 17:00</button>
          </div>

          <button className="mt-6 w-full bg-purple-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition">
             Request Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
