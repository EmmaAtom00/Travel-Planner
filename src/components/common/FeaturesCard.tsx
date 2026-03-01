import type { FeatureCardProps } from "../../constant/types";

const FeaturesCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="shadow-md px-8 py-6 rounded">
      <div className="bg-primary-color w-fit p-2 rounded-xl">{icon}</div>
      <h4 className="text-md font-bold mt-3">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default FeaturesCard;
