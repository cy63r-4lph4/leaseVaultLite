"use client";

import { usePropertyForm } from "@/hooks/usePropertyForm";
import PropertyForm from "@/components/PropertyForm";

export default function ListPropertyClient() {
  const {
    formData,
    setFormData,
    images,
    setImages,
    handleSubmit,
    uploading,
    address,
  } = usePropertyForm();

  return (
    <PropertyForm
      formData={formData}
      setFormData={setFormData}
      images={images}
      setImages={setImages}
      handleSubmit={handleSubmit}
      uploading={uploading}
      address={address}
    />
  );
}
