import {
  Calendar,
  MapPin,
  Save,
  Search,
  Star,
  WholeWordIcon,
} from "lucide-react";
import FeaturesCard from "../components/common/FeaturesCard";
import { featuresData } from "../constant/data";
import { featureMap } from "../utils/featureMap";
import HeroImg from "../assets/hero-image.png";
import GradientButton from "../components/common/GradientButton";
import Destinations from "../components/layout/Destinations";

const Home = () => {
  const icons = [
    {
      key: "search",
      icon: <Search size={20} color="#fff" />,
    },
    {
      key: "details",
      icon: <WholeWordIcon size={20} color="#fff" />,
    },
    {
      key: "photos",
      icon: <Calendar size={20} color="#fff" />,
    },
    { key: "local", icon: <MapPin size={20} color="#fff" /> },
    {
      key: "reviews",
      icon: <Star size={20} color="#fff" />,
    },
    {
      key: "save",
      icon: <Save size={20} color="#fff" />,
    },
  ];
  return (
    <div className="">
      <div
        className="relative h-screen justify-center items-center flex bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImg})` }}
      >
        <section className="container z-10 md:px-14 px-4 text-white">
          <div className="flex flex-col justify-center items-center gap-6 md:gap-12 h-[645px]">
            <div className="hero-txt text-center space-y-4">
              <h1 className="md:text-7xl font-bold text-4xl">Explore the World.</h1>
              <h1 className="md:text-7xl text-nowrap font-bold text-4xl">
                by Amadeus.
              </h1>
            </div>
            <p className="md:text-2xl text-center ">
              Search cities worldwide, find top points of interest, <br className="hidden lg:block"/>and
              get traveler insights powered by Amadeus.
            </p>
            <GradientButton title="Start Exploring" link="/location-search"/>
           
          </div>
        </section>
        <div className="absolute -z-10 inset-0 bg-black/30"></div>
      </div>

      <section className="container md:px-14 px-4 py-32">
        <div className="text-center space-y-3">
          <h1 className="md:text-4xl font-bold">Discover Your Next Adventure</h1>
          <p className="text-xl">
            Leveraging real-time travel insights to bring you the best destinations worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 mt-12">
          {featuresData.map((feature) => (
            <FeaturesCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={featureMap({ title: feature.title, icons })}
            />
          ))}
        </div>
      </section>

      <div className="bg-[#F2F5F6]">
        <section className="container md:px-14 px-4 py-32 ">
          <div className="text-center space-y-3">
            <h1 className="md:text-4xl font-bold">How It Works</h1>
            <p className="text-xl">
              Three simple steps to find your next great destination.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold text-[#007C87]">01</h1>
              <h2 className="text-xl font-bold mb-2">Search Locations</h2>
              <p>Find hotels, restaurants, and attractions with global search.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold text-[#007C87]">02</h1>
              <h2 className="text-xl font-bold mb-2">Read Reviews</h2>
              <p>Check ratings and photos shared by millions of travelers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold text-[#007C87]">03</h1>
              <h2 className="text-xl font-bold mb-2">Discover Nearby</h2>
              <p>Find the top-rated spots right in your current neighborhood.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="">
        <section className="container py-28 px-14">
            <h1 className="md:text-4xl font-bold text-center text-xl">Top-Rated Destinations</h1>
            <p className="text-center text-lg mt-4">Hand-picked locations based on traveler insights.</p>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
            </div> */}
            <Destinations />
        </section>
      </div>

      <div className="bg-gradient-to-r from-[#10d3e5] to-[#007C87]">
        <section className="container px-18 py-24">
            <h1 className="md:text-4xl text-2xl font-bold text-white text-center">Ready to Discover the Best?</h1>
            <p className="text-center md:text-lg text-white mt-4">Start using real-time travel data to find your dream destination today.</p>
            <div className="flex justify-center mt-8">
                <GradientButton title="Try Location Search" link="/location-search" />
            </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
