import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { amadeusService, type City } from "../../services/amadeus";
import { Loader2, ChevronLeft, Star, Quote } from "lucide-react";

const LocationReviews = () => {
  const { id } = useParams<{ id: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const details = await amadeusService.getCityDetails(id);
        if (details) setCity(details);
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const mockReviews = [
    {
      author: "Sarah J.",
      rating: 5,
      date: "2 weeks ago",
      comment: `Absolutely loved my time in ${city?.name || 'this city'}! The atmosphere is incredible and there's so much to see.`,
    },
    {
      author: "Mark T.",
      rating: 4,
      date: "1 month ago",
      comment: `Great destination. The food was a highlight. Highly recommend visiting the local points of interest.`,
    },
    {
      author: "Elena R.",
      rating: 5,
      date: "3 months ago",
      comment: `A dream come true. ${city?.name || 'This place'} exceeded all my expectations. Can't wait to go back!`,
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#007C87] mb-4" size={48} />
        <p className="text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="mb-12">
        <Link 
          to={`/location-details/${id}`} 
          className="inline-flex items-center text-[#007C87] hover:underline mb-4"
        >
          <ChevronLeft size={20} className="mr-1" /> Back to {city?.name}
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Traveler Reviews</h1>
        <p className="text-gray-500">What people are saying about their visit to {city?.name}.</p>
      </div>

      <div className="space-y-8">
        {mockReviews.map((review, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-[#007C87] font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.author}</h4>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <Quote className="absolute -left-2 -top-2 text-teal-50 size-8 -z-10" />
              <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-gray-50 rounded-3xl text-center">
        <h3 className="text-xl font-bold mb-2">Have you visited {city?.name}?</h3>
        <p className="text-gray-500 mb-6">Share your experience with other travelers.</p>
        <Link 
          to={`/review/${id}`}
          className="bg-[#007C87] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#00666f] transition-all inline-block"
        >
          Write a Review
        </Link>
      </div>
    </div>
  );
};

export default LocationReviews;
