import type { FormEvent } from 'react';

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

export interface PropertyFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  images: PropertyImage[];
  setImages: React.Dispatch<React.SetStateAction<PropertyImage[]>>;
  handleSubmit: (e: FormEvent) => void;
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
