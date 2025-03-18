const Requests = () => {
  const requests = [
    { id: 1, name: "A3-010", status: "Granted", time: "10:00 am - 12:00 pm", date: "08/02/2025" },
    { id: 2, name: "CE-Seminar Hall", status: "Pending", time: "10:00 am - 12:00 pm", date: "05/02/2025" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Requests</h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold">{req.name}</h3>
            <p>{req.time}</p>
            <p className={`font-semibold ${req.status === "Granted" ? "text-green-600" : "text-yellow-500"}`}>
              {req.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
