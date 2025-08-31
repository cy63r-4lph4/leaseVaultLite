"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Coins,
  ArrowLeft,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Wifi,
  Car,
  TreePine,
  Utensils,
  Dumbbell,
  Shield,
} from "lucide-react";
import { Property } from "@/lib/Interfaces";

// Mock property data
const mockProperties: Record<string, Property> = {
  "1": {
    id: "1",
    title: "Modern Downtown Loft",
    location: "Downtown Core, Singapore",
    price: 200,
    beds: 2,
    baths: 2,
    sqft: 1200,
    status: "Available",
    description:
      "Experience modern city living in this stunning downtown loft. Features floor-to-ceiling windows, premium finishes, and smart home integration. Located in the heart of Singapore's business district with easy access to MRT stations and premium dining.",
    images: {
      living: [
        "/images/property6.jpeg",
        "/images/property0.jpeg",
        "/placeholder.svg",
      ],
      bedroom: [
        "/images/property12.jpeg",
        "/images/property13.jpeg",
        "/images/property14.jpeg",
      ],
      bathroom: ["/images/property15.jpeg", "/images/property16.jpeg"],
      kitchen: ["/images/kitchen1.jpeg", "/images/kitchen2.jpeg"],
      compound: [
        "/images/compound1.jpeg",
        "/images/compound2.jpeg",
        "/images/compound3.jpeg",
      ],
      exterior: [
        "/images/property1.jpeg",
        "/images/property3.jpeg",
        "/images/property4.jpeg",
      ],
    },
    amenities: [
      { icon: Wifi, text: "High-speed fiber internet" },
      { icon: Shield, text: "24/7 security & concierge" },
      { icon: Dumbbell, text: "Premium gym & pool" },
      { icon: Car, text: "Covered parking" },
      { icon: TreePine, text: "Rooftop garden access" },
      { icon: Utensils, text: "Premium kitchen appliances" },
      { icon: Shield, text: "Smart home automation" },
      { icon: Shield, text: "Pet-friendly building" },
    ],
    landlord: {
      name: "Jane Doe",
      initials: "JD",
      role: "Property Owner",
    },
  },
  "2": {
    id: "2",
    title: "Luxury Penthouse Suite",
    location: "Marina Bay, Singapore",
    price: 4800,
    beds: 3,
    baths: 3,
    sqft: 2100,
    status: "Available",
    description:
      "Spectacular penthouse with panoramic city views. Premium finishes throughout, private elevator access, and exclusive rooftop terrace. Perfect for executive living in Singapore's premier district.",
    images: {
      living: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      bedroom: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      bathroom: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      kitchen: ["/placeholder.svg", "/placeholder.svg"],
      compound: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      exterior: ["/placeholder.svg", "/placeholder.svg"],
    },
    amenities: [
      { icon: Wifi, text: "Gigabit internet" },
      { icon: Shield, text: "Private security" },
      { icon: Dumbbell, text: "Private gym access" },
      { icon: Car, text: "Reserved parking" },
      { icon: TreePine, text: "Private rooftop terrace" },
      { icon: Utensils, text: "Chef-grade kitchen" },
      { icon: Shield, text: "Smart building integration" },
      { icon: Shield, text: "Concierge services" },
    ],
    landlord: {
      name: "Michael Chen",
      initials: "MC",
      role: "Property Manager",
    },
  },
};

const PropertyDetails = () => {
  const params = useParams();
  const router = useRouter();

  const [selectedImageCategory, setSelectedImageCategory] =
    useState<string>("living");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const id = params?.id as string | undefined;
  const property = id ? mockProperties[id] : undefined;

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button onClick={() => router.push("/explore")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const currentImages = property.images[selectedImageCategory] ?? [];

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length
    );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-500 text-white";
      case "rented":
        return "bg-gray-500 text-white";
      case "pending":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/explore")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>

          {/* Property Header */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Image Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-4 group">
                <img
                  src={currentImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`${property.title} - ${selectedImageCategory}`}
                  className="w-full h-96 object-cover cursor-pointer transition-transform group-hover:scale-105"
                  onClick={() => setIsImageModalOpen(true)}
                />
                <Badge
                  className={`absolute top-4 left-4 ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </Badge>

                {currentImages.length > 1 && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-glass"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-glass"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Tabs for Image Categories */}
              <Tabs
                value={selectedImageCategory}
                onValueChange={(val: string) => {
                  setSelectedImageCategory(val);
                  setCurrentImageIndex(0);
                }}
              >
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4">
                  <TabsTrigger value="living">Living</TabsTrigger>
                  <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
                  <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
                  <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                  <TabsTrigger value="compound">Compound</TabsTrigger>
                  <TabsTrigger value="exterior">Exterior</TabsTrigger>
                </TabsList>
                <div className="grid grid-cols-4 gap-2">
                  {currentImages.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${selectedImageCategory} ${idx + 1}`}
                      className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </Tabs>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      {property.beds} Bedroom
                      {property.beds > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      {property.baths} Bathroom
                      {property.baths > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      {property.sqft.toLocaleString()} sq ft
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <Coins className="w-6 h-6 text-accent" />
                  <span className="text-3xl font-bold">
                    {property.price.toLocaleString()}
                  </span>
                  <span className="text-accent font-medium text-lg">CØRE</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <p className="text-muted-foreground mb-6">
                  {property.description}
                </p>

                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-gradient-primary">
                    Request Lease Agreement
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    Schedule Virtual Tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImages[currentImageIndex]}
              alt={`${property.title} - ${selectedImageCategory}`}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 bg-card/80 backdrop-blur-glass"
              onClick={() => setIsImageModalOpen(false)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
