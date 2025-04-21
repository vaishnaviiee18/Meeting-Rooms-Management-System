import { useEffect, useState } from "react";
import Card from "../../components/Card";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/requests/frequently-booked")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch places");
        return res.json();
      })
      .then((data) => {
        const transformedData = data.map((room) => ({
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          type: room.type,
          img: getImageForPlace(room.name),
        }));
        setPlaces(transformedData);
      })
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  const getImageForPlace = (placeName) => {
    const images = {
      "A3-010": "/assets/classroom.jpg",
      Auditorium: "/assets/auditorium.jpg",
      Backyard: "/assets/backyard.jpg",
      "Library Hall": "/assets/library.jpg",
    };
    return images[placeName] || "/assets/default.jpg";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Frequently Booked Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {places.map((place) => (
          <Card
            key={place.id}
            name={place.name}
            img={place.img}
            capacity={place.capacity}
            type={place.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
