import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Shield, Zap, Users } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Futuristic cityscape"
          fill
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-card/80 backdrop-blur-glass border border-border/50 rounded-full mb-8">
            <Shield className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-medium">Powered by CØRE</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block bg-gradient-primary bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            <span className="text-foreground">Real Estate</span>
            <br />
            <span className="inline-block bg-gradient-accent bg-clip-text text-transparent">
              On-Chain
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, lease, and manage premium properties with the security of
            blockchain technology. Pay with CØRE tokens for seamless,
            transparent transactions.
          </p>

          {/* Search Bar */}
          <div className="flex max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by location, property type, or price range..."
                className="pl-12 pr-4 py-6 text-lg bg-card/80 backdrop-blur-glass border border-border/50 focus:border-primary"
              />
            </div>
            <Button className="ml-4 px-8 py-6 bg-gradient-primary hover:opacity-90 transition-opacity">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-opacity group"
            >
              Explore Properties
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-border/50 bg-card/80 backdrop-blur-glass"
            >
              Learn How It Works
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-primary-foreground" />}
              title="Secure & Transparent"
              bg="bg-gradient-primary"
              text="Smart contracts ensure secure, transparent lease agreements with no hidden fees."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-accent-foreground" />}
              title="Instant Transactions"
              bg="bg-gradient-accent"
              text="Pay rent instantly with CØRE tokens. No waiting periods or bank delays."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-secondary-foreground" />}
              title="Community Driven"
              bg="bg-gradient-secondary"
              text="Join a community of forward-thinking tenants and landlords."
            />
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-700" />
      </div>
    </section>
  );
};

// FeatureCard component for cleaner layout
const FeatureCard = ({
  icon,
  title,
  text,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  bg: string;
}) => (
  <div className="text-center">
    <div
      className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{text}</p>
  </div>
);

export default HeroSection;
