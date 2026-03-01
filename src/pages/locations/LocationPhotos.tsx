const LocationPhotos = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#007C87] mb-6">Location Photos</h1>
      {/* Photo gallery will go here */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

export default LocationPhotos;
