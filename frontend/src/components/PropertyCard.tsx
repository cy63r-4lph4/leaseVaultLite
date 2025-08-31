"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Coins } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: "available" | "pending" | "leased";
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  image,
  status,
}: PropertyCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "leased":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/property/${id}`);
  };

  return (
    <Card className="group overflow-hidden bg-card/80 backdrop-blur-glass border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          className={`absolute top-3 right-3 ${getStatusColor(
            status
          )} capitalize`}
        >
          {status}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {beds}
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {baths}
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {sqft} sq ft
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-accent" />
            <span className="text-2xl font-bold text-foreground">{price}</span>
            <span className="text-accent font-medium">CØRE</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          onClick={handleViewDetails}
        >
          View Details & Request Lease
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
