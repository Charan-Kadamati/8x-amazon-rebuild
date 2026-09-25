import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ApexMart — Modern E-Commerce Tech & Lifestyle Store",
  description:
    "Discover next-gen electronics, smart home automation, audio & fitness gear with free express delivery at ApexMart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased transition-colors duration-200`}>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
              {children}
            </main>
            <Footer />
            <Toast />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
