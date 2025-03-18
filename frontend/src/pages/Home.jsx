import Card from "../components/Card";

const Home = () => {
  const places = [
    { id: 1, name: "A3-010", img: "/classroom.jpg" },
    { id: 2, name: "Auditorium", img: "/auditorium.jpg" },
    { id: 3, name: "Backyard", img: "/backyard.jpg" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Frequently Booked Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place) => (
          <Card key={place.id} name={place.name} img={place.img} />
        ))}
      </div>
    </div>
  );
};

export default Home;
