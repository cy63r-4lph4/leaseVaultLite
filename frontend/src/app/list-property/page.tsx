import Navigation from "@/components/Navigation";
import ListPropertyClient from "./ListPropertyClient";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <ListPropertyClient />
        </div>
      </main>
    </div>
  );
}
