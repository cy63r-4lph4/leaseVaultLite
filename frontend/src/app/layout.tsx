import type { Metadata } from "next";
import "./globals.css";
import CustomWagmiProvider from "@/Providers/WagmiProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer position="top-right" autoClose={5000} />
        <CustomWagmiProvider>{children}</CustomWagmiProvider>
      </body>
    </html>
  );
}
