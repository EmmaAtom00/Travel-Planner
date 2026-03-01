import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/logo.png";
import NavLinks from "../common/NavLinks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-[#C7FAFF] to-[#007C87] text-white py-6 sticky top-0 w-full z-50 shadow-md">
      <div className="container flex items-center justify-between md:px-14 px-4">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img src={Logo} alt="Travel Planner Logo" className="h-5" />
        </Link>

        {/* Desktop Navigation */}
        <NavLinks context="header" />

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden focus:outline-none"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-2/3 bg-amber-50 text-black flex flex-col pt-24 px-8 
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden z-60
        `}
      >
        <NavLinks context="mobile" onClose={closeMenu} />
      </div>
    </header>
  );
};

export default Navbar;
