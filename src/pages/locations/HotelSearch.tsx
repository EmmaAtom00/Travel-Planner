import { useState, useEffect } from "react";
import { Search, Calendar, Users, Loader2 } from "lucide-react";
import { amadeusService } from "../../services/amadeus";
import type { Hotel, HotelOffer } from "../../services/amadeus";
import HotelCard from "../../components/hotels/HotelCard";

const HotelSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [offers, setOffers] = useState<HotelOffer[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Set default dates to next week
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const laterWeek = new Date(nextWeek);
    laterWeek.setDate(nextWeek.getDate() + 3);

    setCheckIn(nextWeek.toISOString().split('T')[0]);
    setCheckOut(laterWeek.toISOString().split('T')[0]);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    setError(null);
    setHotels([]);
    setOffers([]);

    console.log("Starting hotel search for:", keyword);

    try {
      let cityCode = "";
      let cityName = "";

      // 1. Determine if the keyword is an IATA code or name
      if (keyword.length === 3 && keyword === keyword.toUpperCase()) {
        cityCode = keyword;
        cityName = keyword;
        console.log("Using keyword as IATA code:", cityCode);
      } else {
        const cities = await amadeusService.searchCity(keyword);
        console.log("Found cities:", cities.length);
        if (cities.length === 0) {
          setError(`No cities found for "${keyword}". Try a major city like "Paris" or "London".`);
          setLoading(false);
          return;
        }
        cityCode = cities[0].iataCode;
        cityName = cities[0].name;
      }
      
      // 2. Get hotels in this city
      console.log("Fetching hotels for city code:", cityCode);
      const cityHotels = await amadeusService.getHotelsByCity(cityCode);
      console.log("Found hotels:", cityHotels.length);
      
      if (cityHotels.length === 0) {
        setError(`No hotels found in ${cityName} (${cityCode}). The Amadeus test API has limited coverage.`);
        setLoading(false);
        return;
      }

      setHotels(cityHotels.slice(0, 12));

      // 3. Get offers for these hotels
      const hotelIds = cityHotels.slice(0, 12).map(h => h.hotelId);
      console.log("Fetching offers for hotel IDs:", hotelIds);
      const hotelOffers = await amadeusService.getHotelOffers(hotelIds, adults, checkIn, checkOut);
      console.log("Found offers:", hotelOffers.length);
      setOffers(hotelOffers);

    } catch (err) {
      console.error("Hotel search error details:", err);
      setError("An error occurred while communicating with the travel service. Please try searching for 'PAR', 'LON', or 'NYC'.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#007C87] mb-4">Find Your Perfect Stay</h1>
        <p className="text-lg text-gray-600">Discover handpicked hotels with real-time availability and best rates.</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-12 -mt-4 border border-gray-100">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Destination</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Guests</label>
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  min="1"
                  max="9"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007C87] transition-all"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#007C87] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#00666f] transition-all flex items-center justify-center min-w-[100px]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Search"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 text-center font-medium">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#007C87] mb-4" size={48} />
          <p className="text-gray-500 font-medium">Finding the best options for you...</p>
        </div>
      )}

      {!loading && hotels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {hotels.map((hotel) => (
            <HotelCard 
              key={hotel.hotelId} 
              hotel={hotel} 
              offer={offers.find(o => o.hotel.hotelId === hotel.hotelId)}
            />
          ))}
        </div>
      )}

      {!loading && hotels.length === 0 && !error && (
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Yet</h3>
          <p className="text-gray-500">Search for a city to discover incredible hotels and great deals.</p>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;
