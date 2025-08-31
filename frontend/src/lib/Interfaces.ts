import type { FormEvent } from "react";

export type Profile = {
  user: string;
  role: number;
  reputation: number;
  metadataCID: string;
};

export interface PropertyImage {
  id: string;
  file: File;
  url: string;
  category: string;
}

export interface Props {
  images: PropertyImage[];
  setImages: React.Dispatch<React.SetStateAction<PropertyImage[]>>;
}

export interface PropertyFormData {
  title: string;
  description: string;
  rentAmount: string;
  depositAmount: string;
  userAddress: string;
  location?: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  propertyType?: string;
}

export interface PropertyFormProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  images: PropertyImage[];
  setImages: React.Dispatch<React.SetStateAction<PropertyImage[]>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  uploading: boolean;
  address?: string;
}

export type Amenity = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
};

export type Landlord = {
  name: string;
  initials: string;
  role: string;
};

export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  description: string;
  images: Record<string, string[]>;
  amenities: Amenity[];
  landlord: Landlord;
};
