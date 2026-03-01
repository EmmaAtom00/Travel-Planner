import type React from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureMapProps {
  title: string;
  icons: {
    key: string;
    icon: React.ReactNode;
  }[];
}

export interface DestinationCardProps {
  image: string;
  city: string;
  country: string;
  description: string;
  id: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  icon: React.ReactNode;
  placeholder: string;
  value: any;
  setValue?: (value: any) => void;
}
