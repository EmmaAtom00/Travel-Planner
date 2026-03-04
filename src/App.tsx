import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Explore from "./pages/Explore";
// import SignIn from "./pages/auth/SignIn";
// import SignUp from "./pages/auth/SignUp";
import LocationSearch from "./pages/locations/LocationSearch";
import LocationDetails from "./pages/locations/LocationDetails";
import LocationPhotos from "./pages/locations/LocationPhotos";
import LocationReviews from "./pages/locations/LocationReviews";
import HotelSearch from "./pages/locations/HotelSearch";
import Booking from "./pages/Booking";
import ReviewForm from "./pages/ReviewForm";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          
          {/* TripAdvisor Location Routes */}
          <Route path="/location-search" element={<LocationSearch />} />
          <Route path="/location-details/:id" element={<LocationDetails />} />
          <Route path="/location-photos/:id" element={<LocationPhotos />} />
          <Route path="/location-reviews/:id" element={<LocationReviews />} />
          <Route path="/hotel-search" element={<HotelSearch />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/review/:id" element={<ReviewForm />} />

          {/* Auth routes disabled for now */}
          {/* <Route path="/auth/sign-in" element={<SignIn />} /> */}
          {/* <Route path="/auth/sign-up" element={<SignUp />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
