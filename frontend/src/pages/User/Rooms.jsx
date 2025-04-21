import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { toast } from "react-toastify";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/rooms");

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setRooms(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setError(err.message);
                setLoading(false);
                toast.error("Failed to load rooms. Please try again later.");
            }
        };

        // Check if we have any rooms in the database, if not initialize them
        const checkAndInitializeRooms = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/rooms");
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                // If no rooms exist, initialize them
                if (data.length === 0) {
                    await fetch("http://localhost:8080/api/rooms/initialize", {
                        method: "POST",
                    });
                    // Fetch rooms again after initialization
                    fetchRooms();
                } else {
                    setRooms(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error checking/initializing rooms:", err);
                setError(err.message);
                setLoading(false);
                toast.error("Failed to initialize rooms. Please try again later.");
            }
        };

        checkAndInitializeRooms();
    }, []);

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <div className="spinner-border text-purple-700" role="status">
                        <svg className="animate-spin h-8 w-8 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p className="mt-3 text-gray-600">Loading rooms...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="text-center text-red-600">
                    <h3 className="text-xl font-bold mb-2">Error Loading Rooms</h3>
                    <p>{error}</p>
                    <button
                        className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-purple-700">
                Available Rooms & Spaces
            </h2>
            <p className="text-center text-gray-600 mt-2">
                Browse and book your preferred space
            </p>

            {rooms.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No rooms available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {rooms.map((room) => (
                        <Card
                            key={room.id}
                            name={room.name}
                            img={room.img}
                            capacity={room.capacity}
                            type={room.type}
                            id={room.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rooms;