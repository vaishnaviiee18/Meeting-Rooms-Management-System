import roomsData from "../../data/RoomsData";
import Card from "../../components/Card";

const Rooms = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-purple-700">
        Available Rooms & Spaces
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Browse and book your preferred space
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {roomsData.map((room) => (
          <Card
            key={room.id}
            name={room.name}
            img={room.img}
            capacity={room.capacity}
            type={room.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
