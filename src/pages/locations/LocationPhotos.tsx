import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { amadeusService, type City } from "../../services/amadeus";
import { Loader2, ChevronLeft, Image as ImageIcon } from "lucide-react";

const LocationPhotos = () => {
  const { id } = useParams<{ id: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#007C87] mb-4" size={48} />
        <p className="text-gray-500">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <Link 
          to={`/location-details/${id}`} 
          className="inline-flex items-center text-[#007C87] hover:underline mb-4"
        >
          <ChevronLeft size={20} className="mr-1" /> Back to {city?.name}
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <ImageIcon className="text-[#007C87]" /> {city?.name} Photo Gallery
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((url, idx) => (
          <div key={idx} className="group relative h-72 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img 
              src={url} 
              alt={`${city?.name} view ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-medium">Capture the beauty of {city?.name}</span>
            </div>
          </div>
        ))}
        {/* Mock additional photos to make it look full */}
        {[1, 2, 3].map((i) => (
          <div key={`extra-${i}`} className="group relative h-72 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img 
              src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=800&q=80`} 
              alt={`${city?.name} extra ${i}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationPhotos;
