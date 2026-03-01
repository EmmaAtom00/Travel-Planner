import { MapPin } from "lucide-react";
import type { DestinationCardProps } from "../../constant/types";

export default function DestinationCard({
  image,
  city,
  country,
  description,
  id,
}: DestinationCardProps) {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      {/* Image at top */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={city}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* City */}
        <h2 className="text-xl font-bold text-gray-900">{city}</h2>

        {/* Country with map icon */}
        <div className="flex items-center text-gray-500 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{country}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mt-2 flex-1">{description}</p>

        {/* Button */}
        <button className="mt-4 bg-primary-color text-white px-4 py-2 rounded">
          View details
        </button>
      </div>
    </div>
  );
}
