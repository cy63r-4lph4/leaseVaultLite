"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, CheckCircle } from "lucide-react";

const LandlordDashboard = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Properties Management */}
      <div className="lg:col-span-2">
        <Card className="bg-card/80 backdrop-blur-glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Your Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Luxury Marina Apartment</h4>
                <p className="text-sm text-muted-foreground">
                  Marina Bay, Singapore
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="outline"
                    className="border-success text-success"
                  >
                    Occupied
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    Tenant: John Smith
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">4,200 CØRE</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <Badge
                  variant="outline"
                  className="border-success text-success mt-1"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Rent Paid
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Garden Villa Estate</h4>
                <p className="text-sm text-muted-foreground">
                  Bukit Timah, Singapore
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="outline"
                    className="border-warning text-warning"
                  >
                    Available
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    3 inquiries
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">6,500 CØRE</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <Button size="sm" className="mt-1">
                  View Inquiries
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Landlord Actions */}
      <div>
        <Card className="bg-card/80 backdrop-blur-glass border-border/50">
          <CardHeader>
            <CardTitle>Property Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              List New Property
            </Button>
            <Button variant="outline" className="w-full">
              Review Applications
            </Button>
            <Button variant="outline" className="w-full">
              Generate Reports
            </Button>
            <Button variant="outline" className="w-full">
              Maintenance Requests
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-glass border-border/50 mt-6">
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>This Month</span>
              <span className="text-success">+10,700 CØRE</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Last Month</span>
              <span className="text-success">+10,700 CØRE</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Total Earned</span>
              <span className="text-success">+128,400 CØRE</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandlordDashboard;
