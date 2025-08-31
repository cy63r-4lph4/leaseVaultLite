"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Clock, CheckCircle } from "lucide-react";

const TenantDashboard = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Current Leases */}
      <div className="lg:col-span-2">
        <Card className="bg-card/80 backdrop-blur-glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Current Leases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Modern Downtown Loft</h4>
                <p className="text-sm text-muted-foreground">
                  Downtown Core, Singapore
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="outline"
                    className="border-success text-success"
                  >
                    Active
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    Expires: Dec 2024
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">2,500 CØRE</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <Badge
                  variant="outline"
                  className="border-warning text-warning mt-1"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Due in 5 days
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Smart Home Condo</h4>
                <p className="text-sm text-muted-foreground">
                  Sentosa Island, Singapore
                </p>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="outline"
                    className="border-success text-success"
                  >
                    Active
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    Expires: Jun 2025
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">3,200 CØRE</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <Badge
                  variant="outline"
                  className="border-success text-success mt-1"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <Card className="bg-card/80 backdrop-blur-glass border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              Pay Rent
            </Button>
            <Button variant="outline" className="w-full">
              Request Maintenance
            </Button>
            <Button variant="outline" className="w-full">
              View Lease Agreement
            </Button>
            <Button variant="outline" className="w-full">
              Contact Landlord
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-glass border-border/50 mt-6">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Rent Payment</span>
              <span className="text-accent">-2,500 CØRE</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Security Deposit</span>
              <span className="text-accent">-5,000 CØRE</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Wallet Top-up</span>
              <span className="text-success">+10,000 CØRE</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantDashboard;
