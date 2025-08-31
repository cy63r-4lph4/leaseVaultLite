import type { Metadata } from "next";
import "./globals.css";
import CustomWagmiProvider from "@/Providers/WagmiProvider";

export const metadata: Metadata = {
  title: "LeaseVaultLite",
  description: "The Future of leasing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomWagmiProvider>{children}</CustomWagmiProvider>
      </body>
    </html>
  );
}
