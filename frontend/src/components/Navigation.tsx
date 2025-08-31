"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomConnectButton } from "./ConnectWallet";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LeaseVault-Lite
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`transition-colors ${
                pathname === "/explore"
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Explore Properties
            </Link>
            <Link
              href="/list-property"
              className={`transition-colors ${
                pathname === "/list-property"
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              List Property
            </Link>
            <Link
              href="/dashboard"
              className={`transition-colors ${
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Wallet & User */}
          <div className="flex items-center space-x-4">
            <CustomConnectButton />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <User className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
