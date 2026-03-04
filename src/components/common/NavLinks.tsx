import { Link } from "react-router-dom";

interface NavLinksProps {
  context: "header" | "footer" | "mobile";
  onClose?: () => void;
}

const NavLinks = ({ context, onClose }: NavLinksProps) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/location-search" },
    { name: "Hotels", path: "/hotel-search" },
  ];

  // Base styles for different contexts
  const contextStyles = {
    header: "hidden md:flex md:items-center md:space-x-6",
    footer: "flex md:items-center space-x-4 text-sm",
    mobile: "flex flex-col space-y-10",
  };

  // Individual link styles
  const linkStyles = {
    header: "hover:text-gray-300 transition font-medium",
    footer: "hover:text-gray-300 transition",
    mobile: "hover:text-gray-700 text-lg font-semibold",
  };

  return (
    <nav className={contextStyles[context]}>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={onClose}
          className={linkStyles[context]}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
