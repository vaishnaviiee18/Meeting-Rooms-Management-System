import { useEffect, useState } from "react";
import Card from "../../components/Card";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/requests/latest") // Fetch latest 8 bookings
      .then((res) => res.json())
      .then((data) => {
        // Transform data into required format (adding image URLs based on room names)
        const transformedData = data.map((place) => ({
          id: place.id,
          name: place.name,
          img: getImageForPlace(place.name),
        }));
        setPlaces(transformedData);
      })
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  // Function to assign images dynamically (modify as needed)
  const getImageForPlace = (placeName) => {
    const images = {
      "A3-010": "/assets/classroom.jpg",
      Auditorium: "/assets/auditorium.jpg",
      Backyard: "/assets/backyard.jpg",
      "Library Hall": "/assets/library.jpg",
    };
    return images[placeName] || "/assets/default.jpg"; // Default if no image found
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Frequently Booked Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {places.map((place) => (
          <Card key={place.id} name={place.name} img={place.img} />
        ))}
      </div>
    </div>
  );
};

export default Home;
