import { useState, useEffect } from "react";

const AllClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [newClub, setNewClub] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/clubs");
        if (!response.ok) throw new Error("Failed to fetch clubs");
        const data = await response.json();
        setClubs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  const addClub = async () => {
    if (!newClub.trim()) return;

    const response = await fetch("/api/clubs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newClub, logo: "/assets/club-default.png" }), // Default logo
    });

    if (response.ok) {
      const newClubData = await response.json();
      setClubs([...clubs, newClubData]);
      setNewClub("");
    }
  };

  const deleteClub = async (clubId) => {
    await fetch(`/api/clubs/${clubId}`, { method: "DELETE" });
    setClubs(clubs.filter((club) => club.id !== clubId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">All Clubs</h2>

      {/* Add New Club Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newClub}
          onChange={(e) => setNewClub(e.target.value)}
          placeholder="Enter New Club Name"
        />
        <button
          className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={addClub}
        >
          Add Club
        </button>
      </div>

      {/* Error & Loading Handling */}
      {loading && <p className="text-center text-gray-600">Loading clubs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Club List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-lg transition"
          >
            <img src={club.logo || "/assets/club-default.png"} alt={club.name} className="w-20 h-20 object-cover rounded-full mb-3" />
            <h3 className="text-lg font-bold text-purple-800">{club.name}</h3>
            <button
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
              onClick={() => deleteClub(club.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClubs;
