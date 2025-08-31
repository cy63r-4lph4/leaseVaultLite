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