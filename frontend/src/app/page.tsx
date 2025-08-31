import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PropertiesSection from "@/components/PropertiesSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PropertiesSection />
    </div>
  );
};

export default Home;
