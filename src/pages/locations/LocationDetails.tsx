import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { amadeusService, type City, type Hotel, type POI } from "../../services/amadeus";
import { 
  MapPin, 
  Hotel as HotelIcon, 
  Image as ImageIcon, 
  Info, 
  Loader2, 
  ChevronLeft,
  Star,
  Globe,
  Compass
} from "lucide-react";

const LocationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [pois, setPois] = useState<POI[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [poisLoading, setPoisLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "hotels" | "pois">("info");

  useEffect(() => {
    const fetchCityData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const details = await amadeusService.getCityDetails(id);
        if (details) {
          setCity(details);
          const cityPhotos = await amadeusService.getCityPhotos(details.name);
          setPhotos(cityPhotos);
        }
      } catch (error) {
        console.error("Error fetching city details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [id]);

  useEffect(() => {
    const fetchHotels = async () => {
      if (activeTab === "hotels" && city && hotels.length === 0) {
        setHotelsLoading(true);
        try {
          const cityHotels = await amadeusService.getHotelsByCity(city.iataCode);
          setHotels(cityHotels);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        } finally {
          setHotelsLoading(false);
        }
      }
    };

    fetchHotels();
  }, [activeTab, city, hotels.length]);

  useEffect(() => {
    const fetchPois = async () => {
      if (activeTab === "pois" && city && pois.length === 0) {
        setPoisLoading(true);
        try {
          const cityPois = await amadeusService.getPointsOfInterest(
            city.geoCode.latitude, 
            city.geoCode.longitude
          );
          setPois(cityPois);
        } catch (error) {
          console.error("Error fetching POIs:", error);
        } finally {
          setPoisLoading(false);
        }
      }
    };

    fetchPois();
  }, [activeTab, city, pois.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#007C87] mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading destination magic...</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h2>
        <Link to="/location-search" className="text-[#007C87] hover:underline">
          Return to search
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={photos[0]} 
          alt={city.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <div className="container mx-auto">
            <Link 
              to="/location-search" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all"
            >
              <ChevronLeft size={20} className="mr-1" /> Back to Search
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-[#007C87] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {city.iataCode}
              </span>
              <span className="text-white/80 font-medium">{city.address.countryCode}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white">{city.name}</h1>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-2 py-4 px-2 font-bold transition-all border-b-2 ${
                activeTab === "info" 
                  ? "border-[#007C87] text-[#007C87]" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Info size={20} /> Info & Photos
            </button>
            <button
              onClick={() => setActiveTab("hotels")}
              className={`flex items-center gap-2 py-4 px-2 font-bold transition-all border-b-2 ${
                activeTab === "hotels" 
                  ? "border-[#007C87] text-[#007C87]" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <HotelIcon size={20} /> Hotels
            </button>
            <button
              onClick={() => setActiveTab("pois")}
              className={`flex items-center gap-2 py-4 px-2 font-bold transition-all border-b-2 ${
                activeTab === "pois" 
                  ? "border-[#007C87] text-[#007C87]" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Compass size={20} /> Points of Interest
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="container mx-auto px-4 mt-8">
        {activeTab === "info" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-[#007C87]" size={20} /> Location Information
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium">Country</span>
                    <span>{city.address.countryCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium">Time Zone</span>
                    <span>GMT +1</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium">Coordinates</span>
                    <span className="text-xs">
                      {city.geoCode.latitude.toFixed(4)}, {city.geoCode.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#007C87] to-teal-600 p-8 rounded-2xl text-white shadow-lg">
                <h4 className="text-xl font-bold mb-2">Traveler Tip</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Best visited during the shoulder seasons for the most authentic experience and fewer crowds.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ImageIcon className="text-[#007C87]" size={24} /> Photo Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.slice(1).map((url, idx) => (
                  <div key={idx} className="h-64 rounded-2xl overflow-hidden shadow-sm group">
                    <img 
                      src={url} 
                      alt={`${city.name} view ${idx + 2}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === "hotels" ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <HotelIcon className="text-[#007C87]" size={24} /> Stay Options in {city.name}
              </h3>
              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-bold">
                {hotels.length} results
              </span>
            </div>

            {hotelsLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#007C87] mb-4" size={40} />
                <p className="text-gray-400">Finding the best rooms for you...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.hotelId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="h-48 bg-gray-100 relative">
                       <img 
                        src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80`} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                       />
                       <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                         <Star size={14} className="fill-yellow-400 text-yellow-400" />
                         <span className="text-xs font-bold text-gray-800">4.5</span>
                       </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800 line-clamp-1">{hotel.name}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mb-4 tracking-wider">{hotel.hotelId}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={16} className="text-gray-300" />
                          <span>Within city center</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Globe size={16} className="text-gray-300" />
                          <span>Amadeus verified</span>
                        </div>
                      </div>

                      <Link 
                        to={`/booking/${hotel.hotelId}`}
                        className="w-full block text-center py-3 bg-[#007C87]/10 text-[#007C87] font-bold rounded-xl hover:bg-[#007C87] hover:text-white transition-all"
                      >
                        Check Availability
                      </Link>
                    </div>
                  </div>
                ))}

                {hotels.length === 0 && !hotelsLoading && (
                  <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
                    <HotelIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No hotels found for this city via the current API tier.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : activeTab === "pois" ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Compass className="text-[#007C87]" size={24} /> Top Sights in {city.name}
              </h3>
              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-bold">
                {pois.length} results
              </span>
            </div>

            {poisLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#007C87] mb-4" size={40} />
                <p className="text-gray-400">Loading top sights...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pois.map((poi) => (
                  <div key={poi.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 text-[#007C87] text-xs font-bold uppercase tracking-wider mb-2">
                      <Star size={14} className="fill-[#007C87]" /> {poi.category}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{poi.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {poi.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-gray-50 text-gray-500 text-[10px] px-2 py-1 rounded-full border border-gray-100 italic">
                          #{tag.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default LocationDetails;
