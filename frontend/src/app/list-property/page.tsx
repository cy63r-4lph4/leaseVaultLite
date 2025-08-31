"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Camera,
  Home,
  Bath,
  Bed,
  Car,
  TreePine,
  Utensils,
} from "lucide-react";
import { toast } from "react-toastify";

interface PropertyImage {
  id: string;
  file: File;
  url: string;
  category: string;
}

const imageCategories = [
  { value: "exterior", label: "Exterior", icon: Home },
  { value: "living", label: "Living Room", icon: Home },
  { value: "kitchen", label: "Kitchen", icon: Utensils },
  { value: "bedroom", label: "Bedroom", icon: Bed },
  { value: "bathroom", label: "Bathroom", icon: Bath },
  { value: "compound", label: "Compound/Garden", icon: TreePine },
  { value: "parking", label: "Parking", icon: Car },
  { value: "amenities", label: "Amenities", icon: Camera },
];

export default function ListProperty() {
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    beds: "",
    baths: "",
    sqft: "",
    propertyType: "",
    status: "available",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substr(2, 9);
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, { id, file, url, category: "exterior" }]);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const updateImageCategory = (id: string, category: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, category } : img))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    // Here you would typically upload images and submit form data
    toast.success("Property listed");

    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      beds: "",
      baths: "",
      sqft: "",
      propertyType: "",
      status: "available",
    });
    setImages([]);
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = imageCategories.find((cat) => cat.value === category);
    return categoryData?.icon || Camera;
  };

  const getImagesByCategory = (category: string) => {
    return images.filter((img) => img.category === category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="price">Monthly Rent (CØRE)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      placeholder="3000"
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
            <Card>
              <CardHeader>
                <CardTitle>Property Photos</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload high-quality photos and categorize them to showcase
                  different areas of your property
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    Upload Property Photos
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop images or click to browse
                  </p>
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      Choose Files
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="space-y-6">
                    {imageCategories.map((category) => {
                      const categoryImages = getImagesByCategory(
                        category.value
                      );
                      const IconComponent = category.icon;

                      if (categoryImages.length === 0) return null;

                      return (
                        <div key={category.value} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-5 h-5" />
                            <h3 className="font-semibold">{category.label}</h3>
                            <Badge variant="secondary">
                              {categoryImages.length}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categoryImages.map((image) => (
                              <div key={image.id} className="relative group">
                                <img
                                  src={image.url}
                                  alt="Property"
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                  <Select
                                    value={image.category}
                                    onValueChange={(value) =>
                                      updateImageCategory(image.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-32 h-8 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {imageCategories.map((cat) => (
                                        <SelectItem
                                          key={cat.value}
                                          value={cat.value}
                                        >
                                          {cat.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="w-8 h-8"
                                    onClick={() => removeImage(image.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">List Property</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
