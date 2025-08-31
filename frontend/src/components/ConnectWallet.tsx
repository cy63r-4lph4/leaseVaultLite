"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { TOKEN_ADDRESS, TOKEN_DECIMALS, TOKEN_SYMBOL } from "@/lib/Constants";
import { useGetProfileStatus } from "@/hooks/useProfileRegistry";

export const CustomConnectButton = () => {
  const { formattedBalance } = useTokenBalance(
    TOKEN_ADDRESS as `0x${string}`,
    TOKEN_DECIMALS,
    TOKEN_SYMBOL
  );

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        openChainModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        const { checking, exists } = useGetProfileStatus();

        if (!connected) {
          return (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                onClick={openConnectModal}
                className="flex items-center gap-2 rounded-2xl border border-accent bg-background text-accent hover:bg-accent hover:text-accent-foreground shadow-sm px-4 py-2"
              >
                <Wallet className="w-4 h-4" />
                <span className="font-medium">Connect Wallet</span>
              </Button>
            </motion.div>
          );
        }

        return (
          <div className="flex items-center gap-3">
            {/* Chain badge */}
            <Badge
              variant="outline"
              onClick={openChainModal}
              className="cursor-pointer rounded-full border-accent bg-background text-accent hover:bg-accent hover:text-accent-foreground px-3 py-1"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-2" />
              {chain.name}
            </Badge>

            {/* Account info (clickable for switching) */}
            <div
              onClick={openAccountModal}
              className="flex items-center gap-2 px-3 py-1 rounded-xl border border-primary bg-background shadow-sm cursor-pointer hover:bg-primary/10 transition"
            >
              <Wallet className="w-4 h-4 text-primary" />
              <span className="font-medium">{account.displayName}</span>

              {/* Balance */}
              {formattedBalance && (
                <span className="text-muted-foreground text-sm">
                  {formattedBalance}
                </span>
              )}

              {/* Profile status indicator */}
              {checking ? (
                <span className="text-xs text-yellow-500 ml-2">⏳ Profile...</span>
              ) : exists ? (
                <span className="text-xs text-green-600 ml-2">✅ Profile</span>
              ) : (
                <span className="text-xs text-red-500 ml-2">⚠️ No Profile</span>
              )}
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
