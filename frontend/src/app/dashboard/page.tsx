"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import DashboardStats from "@/components/DashboardStats";
import TenantDashboard from "@/components/TenantDashboard";
import LandlordDashboard from "@/components/LandlordDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">
              Manage your properties and track your CØRE transactions
            </p>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Main Content */}
          <Tabs defaultValue="tenant" className="space-y-6">
            <TabsList className="bg-card/80 backdrop-blur-glass border border-border/50">
              <TabsTrigger value="tenant">Tenant View</TabsTrigger>
              <TabsTrigger value="landlord">Landlord View</TabsTrigger>
            </TabsList>

            <TabsContent value="tenant" className="space-y-6">
              <TenantDashboard />
            </TabsContent>

            <TabsContent value="landlord" className="space-y-6">
              <LandlordDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
