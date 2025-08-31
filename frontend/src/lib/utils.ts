import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import { PropertyImage } from "@/lib/Interfaces";

export function buildFormPayload(formData: any, images: PropertyImage[], address?: string) {
  const formPayload = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    formPayload.append(key, value as string);
  });
  formPayload.set("userAddress", address || "");

  images.forEach((img, i) => {
    formPayload.append("images", img.file);
    formPayload.append(`imageCategories[${i}]`, img.category);
  });

  return formPayload;
}
