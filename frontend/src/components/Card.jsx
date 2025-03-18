const Card = ({ img, name, capacity, type }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
      <img src={img} alt={name} className="w-full h-48 object-cover rounded-lg" />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-purple-800">{name}</h3>
        <p className="text-gray-600">{type} • Capacity: {capacity}</p>
      </div>
    </div>
  );
};

export default Card;
