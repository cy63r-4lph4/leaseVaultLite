"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, TrendingUp, Bell, Coins } from "lucide-react";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useAccount } from "wagmi";
import { TOKEN_ADDRESS, TOKEN_DECIMALS, TOKEN_SYMBOL } from "@/lib/Constants";

const DashboardStats = () => {
  const { formattedBalance, isLoading } = useTokenBalance(
    TOKEN_ADDRESS as `0x${string}`,
    TOKEN_DECIMALS,
    TOKEN_SYMBOL
  );

  // ⬇️ mock data placeholders (replace with API/smart contract calls later)
  const activeLeases = 3;
  const monthlyRent = "8,200"; // could pull from a contract or DB
  const notifications = { total: 4, unread: 2 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Active Leases */}
      <Card className="bg-card/80 backdrop-blur-glass border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeLeases}</div>
          <p className="text-xs text-muted-foreground">+1 from last month</p>
        </CardContent>
      </Card>

      {/* CØRE Balance */}
      <Card className="bg-card/80 backdrop-blur-glass border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CØRE Balance</CardTitle>
          <Coins className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">
            {isLoading ? "Loading..." : formattedBalance || `0 ${TOKEN_SYMBOL}`}
          </div>
          <p className="text-xs text-muted-foreground">Available for payments</p>
        </CardContent>
      </Card>

      {/* Monthly Rent */}
      <Card className="bg-card/80 backdrop-blur-glass border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthlyRent} CØRE</div>
          <p className="text-xs text-muted-foreground">Due in 5 days</p>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card/80 backdrop-blur-glass border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{notifications.total}</div>
          <p className="text-xs text-muted-foreground">
            {notifications.unread} unread messages
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
