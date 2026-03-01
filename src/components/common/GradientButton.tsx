import { Link } from "react-router-dom";

const GradientButton = ({ title, link }: { title: string; link?: string }) => {
  return (
    <Link
      to={link || ""}
      className="bg-gradient-to-r from-[#10d3e5] to-[#007C87] rounded-2xl text-white cursor-pointer py-2.5 px-5"
    >
      {title}
    </Link>
  );
};

export default GradientButton;
