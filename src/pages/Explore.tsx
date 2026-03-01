import SearchBar from "../components/common/SearchBar";
import Destinations from "../components/layout/Destinations";

const Explore = () => {
  return (
    <div>
      <div className="space-y-4 text-center py-18">
        <h1 className="md:text-4xl font-bold text-center text-xl">
          Explore Destinations
        </h1>
        <SearchBar />
      </div>
      <div className="container px-14 mb-18">
        <Destinations />
      </div>
    </div>
  );
};

export default Explore;
