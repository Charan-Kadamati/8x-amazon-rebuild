import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { SubNav } from "@/components/SubNav";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ApexMart — Online Shopping for Electronics, Smart Home, Fashion & More",
  description:
    "Shop online at ApexMart for millions of products across electronics, smart home appliances, apparel, books, sports equipment and more with fast free Prime shipping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-amazon-bg_gray min-h-screen flex flex-col antialiased`}>
        <CartProvider>
          <Header />
          <SubNav />
          <main className="flex-1 max-w-[1500px] w-full mx-auto p-4 md:p-6">{children}</main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
