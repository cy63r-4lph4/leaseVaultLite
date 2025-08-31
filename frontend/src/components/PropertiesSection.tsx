"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "./PropertyCard";
import { Filter, Grid, List } from "lucide-react";

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "Downtown Core, Singapore",
    price: 2500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/placeholder.svg",
    status: "available" as const,
  },
  {
    id: 2,
    title: "Luxury Marina Apartment",
    location: "Marina Bay, Singapore",
    price: 4200,
    beds: 3,
    baths: 3,
    sqft: 1800,
    image: "/placeholder.svg",
    status: "available" as const,
  },
  {
    id: 3,
    title: "Penthouse with City Views",
    location: "Orchard Road, Singapore",
    price: 8500,
    beds: 4,
    baths: 4,
    sqft: 2800,
    image: "/placeholder.svg",
    status: "pending" as const,
  },
  {
    id: 4,
    title: "Smart Home Condo",
    location: "Sentosa Island, Singapore",
    price: 3200,
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: "/placeholder.svg",
    status: "available" as const,
  },
  {
    id: 5,
    title: "Garden Villa Estate",
    location: "Bukit Timah, Singapore",
    price: 6500,
    beds: 5,
    baths: 4,
    sqft: 3200,
    image: "/placeholder.svg",
    status: "leased" as const,
  },
  {
    id: 6,
    title: "Tech-Enabled Studio",
    location: "Clarke Quay, Singapore",
    price: 1800,
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/placeholder.svg",
    status: "available" as const,
  },
];

const PropertiesSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-accent text-accent mb-4">
            Premium Properties
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-foreground">Perfect Space</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our curated collection of premium properties, all verified
            on-chain and ready for seamless CØRE token transactions.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="bg-card/80 backdrop-blur-glass border border-border/50">
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="luxury">Luxury</TabsTrigger>
              <TabsTrigger value="budget">Budget Friendly</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className="flex bg-card/80 backdrop-blur-glass border border-border/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <Tabs defaultValue="all">
          <TabsContent value="all" className="mt-0">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {mockProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id.toString()}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  image={property.image}
                  status={property.status}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {mockProperties
                .filter((p) => p.status === "available")
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id.toString()}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    image={property.image}
                    status={property.status}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="luxury">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {mockProperties
                .filter((p) => p.price > 5000)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id.toString()}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    image={property.image}
                    status={property.status}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {mockProperties
                .filter((p) => p.price < 3000)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id.toString()}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    image={property.image}
                    status={property.status}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-border/50 bg-card/80 backdrop-blur-glass"
          >
            Load More Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
