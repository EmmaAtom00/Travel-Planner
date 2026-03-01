import type { FeatureMapProps } from "../constant/types";

export const featureMap = ({ title, icons }: FeatureMapProps) => {
  const found = icons.find((item) =>
    title.toUpperCase().includes(item.key.toUpperCase()),
  );
  return found?.icon ?? null;
};
