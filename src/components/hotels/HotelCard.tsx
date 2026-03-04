import { MapPin, Star, Bed, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Hotel, HotelOffer } from "../../services/amadeus";

interface HotelCardProps {
  hotel: Hotel;
  offer?: HotelOffer;
}

const HotelCard = ({ hotel, offer }: HotelCardProps) => {
  const hasOffer = !!offer && offer.offers && offer.offers.length > 0;
  const bestOffer = hasOffer ? offer.offers[0] : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gray-200 relative">
        <img
          src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80`}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#007C87]">
          {hasOffer ? `${bestOffer?.price.total} ${bestOffer?.price.currency}` : "Check Rates"}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm font-bold">4.5</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span>{hotel.address.countryCode} • {hotel.iataCode}</span>
        </div>

        {hasOffer ? (
          <div className="space-y-3">
            <div className="flex items-center text-green-600 text-sm font-medium">
              <CheckCircle size={14} className="mr-1" />
              <span>Available for your dates</span>
            </div>
            {bestOffer?.room && (
              <div className="flex items-start text-gray-600 text-sm">
                <Bed size={14} className="mr-1 mt-1 shrink-0" />
                <span className="line-clamp-2">{bestOffer.room.description.text}</span>
              </div>
            )}
            <Link 
              to={`/booking/${hotel.hotelId}`}
              className="w-full mt-4 bg-[#007C87] text-white py-2 rounded-xl font-bold hover:bg-[#00666f] transition-colors text-center block"
            >
              Book Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <XCircle size={14} className="mr-1" />
              <span>Rates unavailable</span>
            </div>
            <p className="text-gray-500 text-xs italic">
              Try different dates or search by city code to see latest availability.
            </p>
            <Link 
              to={`/booking/${hotel.hotelId}`}
              className="w-full mt-4 border-2 border-[#007C87] text-[#007C87] py-2 rounded-xl font-bold hover:bg-[#f0f9fa] transition-colors text-center block"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
