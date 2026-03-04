import { destinations } from "../../constant/data";
import DestinationCard from "../common/DestinationCard";

const Destinations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          image={destination.image}
          city={destination.city}
          country={destination.country}
          description={destination.description}
          id={destination.id}
        />
      ))}
    </div>
  );
};

export default Destinations;
