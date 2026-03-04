import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import { amadeusService, type City } from "../../services/amadeus";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";

const LocationSearch = () => {
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const cities = await amadeusService.searchCity(query);
      setResults(cities);
      if (cities.length === 0) {
        setError("No cities found. Try another search.");
      }
    } catch (err) {
      setError("Failed to fetch locations. Please check your API keys.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#007C87] mb-4">Discover Destinations</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search for cities worldwide to explore points of interest and find the perfect hotels.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Enter a city (e.g. Paris, Tokyo, New York)..." />

      <div className="mt-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#007C87] mb-4" size={48} />
            <p className="text-gray-500">Searching global destinations...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && results.map((city) => (
            <div
              key={city.id}
              onClick={() => navigate(`/location-details/${city.iataCode}`)}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#007C87] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <MapPin className="text-[#007C87]" size={24} />
                </div>
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                  {city.iataCode}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-1">{city.name}</h3>
              <p className="text-gray-500 text-sm mb-6">
                {city.address.countryCode} {city.address.stateCode ? `, ${city.address.stateCode}` : ""}
              </p>

              <div className="flex items-center text-[#007C87] font-semibold text-sm group-hover:gap-2 transition-all">
                View Details <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          ))}
        </div>

        {!loading && results.length === 0 && !error && (
          <div className="text-center py-20 text-gray-400">
            <p>Start your journey by searching for a city above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
