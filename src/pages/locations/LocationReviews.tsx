const LocationReviews = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#007C87] mb-6">Location Reviews</h1>
      {/* Review list will go here */}
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border border-gray-100 rounded-2xl shadow-sm">
            <div className="h-4 w-32 bg-gray-100 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationReviews;
