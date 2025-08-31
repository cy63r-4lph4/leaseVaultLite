"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { PropertyImage } from "@/lib/Interfaces";
import { buildFormPayload } from "@/lib/utils";

export function usePropertyForm() {
  const { address } = useAccount();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rentAmount: "",
    depositAmount: "",
    location: "",
    beds: "",
    baths: "",
    sqft: "",
    propertyType: "",
    userAddress: address ?? "",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!address) return toast.error("Wallet disconnected");
  if (images.length === 0) return toast.error("Please add at least one image");

  setUploading(true);
  try {
    const formPayload = buildFormPayload(formData, images, address);
    const res = await fetch("/api/uploadProperty", { method: "POST", body: formPayload });

    const result = await res.json().catch(() => ({})); // parse safely

    if (!res.ok) {
      console.error("❌ UploadProperty failed:", result);
      toast.error(
        result?.error
          ? `Error at step: ${result.step || "unknown"} → ${result.error}`
          : "Failed to list property"
      );
      return;
    }

    toast.success("Property listed successfully");

    // Reset form
    setFormData({
      title: "",
      description: "",
      rentAmount: "",
      depositAmount: "",
      location: "",
      beds: "",
      baths: "",
      sqft: "",
      propertyType: "",
      userAddress: address ?? "",
    });
    setImages([]);
  } catch (err) {
    console.error("❌ Network/Unexpected error:", err);
    toast.error((err as Error).message);
  } finally {
    setUploading(false);
  }
};

  return { formData, setFormData, images, setImages, handleSubmit, uploading, address };
}
