import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchMyBookings = async () => {
            if (!user || !user.email) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/requests/user-email/${encodeURIComponent(user.email)}`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching your bookings:", error);
                toast.error("Failed to load your bookings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyBookings();
    }, [user]);

    const cancelBooking = async (id) => {
        if (!confirm("Are you sure you want to cancel this booking request?")) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/requests/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            // Remove the cancelled booking from state
            setBookings(bookings.filter(booking => booking.id !== id));
            toast.success("Booking cancelled successfully");
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast.error("Failed to cancel booking");
        }
    };

    const filteredBookings =
        filter === "all"
            ? bookings
            : bookings.filter(booking => booking.status === filter);

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

    // Sort bookings by date (newest first)
    const sortedBookings = [...filteredBookings].sort((a, b) =>
        new Date(b.bookingDate) - new Date(a.bookingDate)
    );

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
                    <p className="mt-3 text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Not Logged In</h2>
                    <p className="text-gray-700 mb-6">Please log in to view your bookings.</p>
                    <a
                        href="/login"
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
                    My Bookings
                </h2>

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
                </div>

                {sortedBookings.length > 0 ? (
                    <div className="space-y-4">
                        {sortedBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className={`bg-white shadow-md p-4 rounded-lg border-l-8 transition-all duration-200 
                  hover:shadow-lg ${getBorderClass(booking.status)}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-700">
                                            {booking.room?.name || "Unknown Room"}
                                        </h3>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Time:</span> {booking.timeSlot}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Purpose:</span> {booking.purpose}
                                        </p>
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${getStatusBadgeClass(booking.status)}`}
                                        >
                      {booking.status}
                    </span>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        {booking.status === "PENDING" && (
                                            <button
                                                onClick={() => cancelBooking(booking.id)}
                                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        {booking.status === "APPROVED" && (
                                            <a
                                                href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/requests/${booking.id}/generate-letter`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center"
                                            >
                                                View Letter
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white shadow-md p-8 rounded-lg text-center">
                        <p className="text-xl font-medium text-gray-700">You don't have any bookings yet.</p>
                        <p className="text-gray-500 mt-2">
                            {filter !== "all"
                                ? "Try changing your filter or make a new booking."
                                : "Start by booking a room."}
                        </p>
                        <a
                            href="/rooms"
                            className="mt-6 inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            Browse Rooms
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;