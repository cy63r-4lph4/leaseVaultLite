"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploader from "./ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyImage } from "@/lib/Interfaces";

export interface FormDataType {
  title: string;
  description: string;
  rentAmount: string;
  depositAmount: string;
  location: string;
  beds: string;
  baths: string;
  sqft: string;
  propertyType: string;
  userAddress: string;
}
interface PropertyFormProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  images: PropertyImage[];
  setImages: React.Dispatch<React.SetStateAction<PropertyImage[]>>;
  handleSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
  address?: string;
}

export default function PropertyForm({
  formData,
  setFormData,
  images,
  setImages,
  handleSubmit,
  uploading,
  address,
}: PropertyFormProps) {
  return (
    <div className="space-y-4">
      {/* Title + Property Type */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
        <p className="text-muted-foreground">
          Add your property details and upload photos to attract potential
          tenants
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="e.g., Luxury Marina Apartment"
                  required
                />
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      propertyType: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your property..."
                rows={4}
                required
              />
            </div>

            {/* Rent, Deposit, Beds, Baths */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="rentAmount">Monthly Rent (CØRE)</Label>
                <Input
                  id="rentAmount"
                  type="number"
                  value={formData.rentAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rentAmount: e.target.value,
                    }))
                  }
                  placeholder="3000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="depositAmount">Deposit (CØRE)</Label>
                <Input
                  id="depositAmount"
                  type="number"
                  value={formData.depositAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      depositAmount: e.target.value,
                    }))
                  }
                  placeholder="6000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="beds">Bedrooms</Label>
                <Select
                  value={formData.beds}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, beds: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="baths">Bathrooms</Label>
                <Select
                  value={formData.baths}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, baths: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Baths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sqft + Location */}
            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                value={formData.sqft}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sqft: e.target.value,
                  }))
                }
                placeholder="1200"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="e.g., Downtown Core, Marina Bay"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <ImageUploader images={images} setImages={setImages} />

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={!address || uploading}>
            {uploading ? "Listing..." : "List Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
