"use client";

import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { TOKEN_ADDRESS, TOKEN_DECIMALS, TOKEN_SYMBOL } from "@/lib/Constants";
import { useGetProfileStatus } from "@/hooks/useProfileRegistry";

export default function WalletManagement() {
  const { address } = useAccount();
  const { formattedBalance, isLoading } = useTokenBalance(
    TOKEN_ADDRESS as `0x${string}`,
    TOKEN_DECIMALS,
    TOKEN_SYMBOL
  );
  const { checking, exists } = useGetProfileStatus();

  return (
    <Card className="bg-card/80 backdrop-blur-glass border-border/50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5" />
          <CardTitle>Wallet Management</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-gradient-primary/10 rounded-lg p-4 border border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Current Balance
            </span>
            <Badge variant="outline" className="border-accent text-accent">
              {address ? "Active" : "Disconnected"}
            </Badge>
          </div>

          <div className="text-2xl font-bold text-accent">
            {isLoading
              ? "Loading..."
              : formattedBalance
              ? formattedBalance
              : `0 ${TOKEN_SYMBOL}`}
          </div>

          <div className="text-sm text-muted-foreground">≈ $8,490M USD</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="bg-gradient-primary hover:opacity-90">
            Top Up Wallet
          </Button>
          <Button variant="outline">Withdraw Funds</Button>
        </div>

        <div className="space-y-2">
          <Label>Wallet Address</Label>
          <div className="flex space-x-2">
            <Input
              value={address ?? ""}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => address && navigator.clipboard.writeText(address)}
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Profile Status */}
        <div className="space-y-2">
          <Label>Profile Status</Label>
          <div className="text-sm">
            {checking ? (
              <span className="text-yellow-500">⏳ Checking...</span>
            ) : exists ? (
              <span className="text-green-600">✅ Profile exists</span>
            ) : (
              <span className="text-red-500">⚠️ No Profile</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
