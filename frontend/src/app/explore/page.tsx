"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import {
  Search,
  Filter,
  MapPin,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "Downtown Core, Singapore",
    price: 600,
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/images/property6.jpeg",
    status: "available" as const,
  },
  {
    id: 2,
    title: "Luxury Marina Apartment",
    location: "Marina Bay, Singapore",
    price: 200,
    beds: 3,
    baths: 3,
    sqft: 1800,
    image: "/images/property5.jpeg",
    status: "available" as const,
  },
  {
    id: 3,
    title: "Penthouse with City Views",
    location: "Orchard Road, Singapore",
    price: 300,
    beds: 4,
    baths: 4,
    sqft: 2800,
    image: "/images/property15.jpeg",
    status: "pending" as const,
  },
  {
    id: 4,
    title: "Smart Home Condo",
    location: "Sentosa Island, Singapore",
    price: 400,
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: "/images/kitchen1.jpeg",
    status: "available" as const,
  },
  {
    id: 5,
    title: "Garden Villa Estate",
    location: "Bukit Timah, Singapore",
    price: 600,
    beds: 5,
    baths: 4,
    sqft: 3200,
    image: "/images/property3.jpeg",
    status: "leased" as const,
  },
  {
    id: 6,
    title: "Tech-Enabled Studio",
    location: "Clarke Quay, Singapore",
    price: 800,
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/images/compound2.jpeg",
    status: "available" as const,
  },
  {
    id: 7,
    title: "Waterfront Condominium",
    location: "East Coast, Singapore",
    price: 300,
    beds: 3,
    baths: 2,
    sqft: 1600,
    image: "/images/property1.jpeg",
    status: "available" as const,
  },
  {
    id: 8,
    title: "Executive Suite",
    location: "Raffles Place, Singapore",
    price: 5200,
    beds: 2,
    baths: 2,
    sqft: 1500,
    image: "/images/compound3.jpeg",
    status: "available" as const,
  },
];

const Explore = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([10, 10000]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedBeds, setSelectedBeds] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesLocation =
      selectedLocation === "all" ||
      property.location.includes(selectedLocation);
    const matchesBeds =
      selectedBeds === "all" || property.beds.toString() === selectedBeds;
    const matchesStatus =
      selectedStatus === "all" || property.status === selectedStatus;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesLocation &&
      matchesBeds &&
      matchesStatus
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="border-accent text-accent mb-4">
              Property Explorer
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Explore Premium
              </span>
              <br />
              <span className="text-foreground">Properties</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your perfect space from our verified on-chain property
              listings
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card/80 backdrop-blur-glass border-border/50 sticky top-28">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Search Properties
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Price Range (CØRE/month)
                    </label>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10000}
                        min={10}
                        step={100}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]} CØRE</span>
                        <span>{priceRange[1]} CØRE</span>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Location
                    </label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any location</SelectItem>
                        <SelectItem value="Downtown">Downtown Core</SelectItem>
                        <SelectItem value="Marina">Marina Bay</SelectItem>
                        <SelectItem value="Orchard">Orchard Road</SelectItem>
                        <SelectItem value="Sentosa">Sentosa Island</SelectItem>
                        <SelectItem value="Bukit">Bukit Timah</SelectItem>
                        <SelectItem value="Clarke">Clarke Quay</SelectItem>
                        <SelectItem value="East">East Coast</SelectItem>
                        <SelectItem value="Raffles">Raffles Place</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Bedrooms
                    </label>
                    <Select
                      value={selectedBeds}
                      onValueChange={setSelectedBeds}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Availability
                    </label>
                    <Tabs
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="available">Available</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Reset Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setPriceRange([10, 10000]);
                      setSelectedLocation("all");
                      setSelectedBeds("all");
                      setSelectedStatus("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {filteredProperties.length} Properties Found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showing results for your search criteria
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="beds">Most Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>

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

              {/* Properties List */}
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProperties.map((property) => (
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

              {/* No Results */}
              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setPriceRange([1000, 10000]);
                      setSelectedLocation("all");
                      setSelectedBeds("all");
                      setSelectedStatus("all");
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {filteredProperties.length > 0 && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/50 bg-card/80 backdrop-blur-glass"
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
