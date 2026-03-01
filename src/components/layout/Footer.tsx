import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import NavLinks from "../common/NavLinks";

const Footer = () => {
  return (
    <div className="pt-6 pb-2 container px-4 md:px-14">
        <div className="flex items-center justify-between">

      <Link to="/">
        <img src={Logo} alt="Travel Planner Logo" className="h-3" />
      </Link>

      <NavLinks context="footer" />
        </div>

        <p className="text-xs text-center mt-6">© 2024 Travel Planner. All rights reserved.</p>
    </div>
  );
};

export default Footer;
