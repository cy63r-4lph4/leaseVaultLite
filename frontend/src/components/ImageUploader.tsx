"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Camera,
  Home,
  Bed,
  Utensils,
  Bath,
  TreePine,
  Car,
} from "lucide-react";
import { Props } from "@/lib/Interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

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

export default function ImageUploader({ images, setImages }: Props) {
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
  const getImagesByCategory = (category: string) => {
    return images.filter((img) => img.category === category);
  };
//   const getCategoryIcon = (category: string) => {
//     const categoryData = imageCategories.find((cat) => cat.value === category);
//     return categoryData?.icon || Camera;
//   };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Photos</CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload high-quality photos and categorize them to showcase different
          areas of your property
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Upload Property Photos</p>
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
              const categoryImages = getImagesByCategory(category.value);
              const IconComponent = category.icon;

              if (categoryImages.length === 0) return null;

              return (
                <div key={category.value} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    <h3 className="font-semibold">{category.label}</h3>
                    <Badge variant="secondary">{categoryImages.length}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <Image
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
                                <SelectItem key={cat.value} value={cat.value}>
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
  );
}
