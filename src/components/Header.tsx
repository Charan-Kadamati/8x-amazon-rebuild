"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  X,
  Sparkles,
  Flame,
  Package,
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

function HeaderBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All Categories"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "All Categories",
    "Electronics",
    "Smart Home",
    "Audio & Wearables",
    "Fitness & Sports",
    "Computers",
  ]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const catData = await res.json();
          setCategories(["All Categories", ...catData.map((c: any) => c.name)]);
        }
      } catch (err) {
        console.error("Failed to load header categories", err);
      }
    }
    loadCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (selectedCategory !== "All Categories") {
      params.set("category", selectedCategory);
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-3 md:gap-6">
        {/* Brand & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-sans">
              Apex<span className="text-indigo-400">Mart</span>
            </span>
          </Link>
        </div>

        {/* Deliver To Selector (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-300 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
          <div className="leading-tight">
            <div className="text-[10px] text-slate-400">Deliver to</div>
            <div className="font-bold text-white">New York, 10001</div>
          </div>
        </div>

        {/* Central Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center h-10 max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition"
        >
          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="hidden md:block bg-slate-800 text-slate-200 text-xs font-semibold px-3 h-full border-r border-slate-700 outline-none cursor-pointer hover:bg-slate-700/80 transition max-w-[130px] truncate"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                {cat}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands & tech..."
            className="w-full text-xs md:text-sm text-slate-100 bg-transparent px-3 outline-none placeholder:text-slate-500"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white h-full px-4 flex items-center justify-center transition font-semibold"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Action Links & Dark Mode Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-slate-900 border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
            <span className="hidden lg:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          <Link
            href="/search?sort=bestseller"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition"
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Deals</span>
          </Link>

          <Link
            href="/checkout"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition"
          >
            <Package className="w-4 h-4 text-indigo-400" />
            <span>Orders</span>
          </Link>

          {/* Cart Drawer Link */}
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-xl transition font-semibold text-xs active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-indigo-400" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-indigo-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 py-1.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <Link
            href="/search"
            className="px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-300 font-medium hover:bg-indigo-600/30 transition whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Products</span>
          </Link>
          {categories
            .filter((c) => c !== "All Categories")
            .map((cat) => (
              <Link
                key={cat}
                href={`/search?category=${encodeURIComponent(cat)}`}
                className="px-3 py-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition whitespace-nowrap shrink-0"
              >
                {cat}
              </Link>
            ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <div className="relative w-4/5 max-w-xs bg-slate-900 text-slate-100 h-full flex flex-col z-10 border-r border-slate-800 shadow-2xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-white">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span>ApexMart</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Browse Departments
              </div>
              <ul className="space-y-2 text-sm font-medium text-slate-300">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={
                        cat === "All Categories"
                          ? "/search"
                          : `/search?category=${encodeURIComponent(cat)}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 hover:text-indigo-400 transition"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-800 pt-4 text-xs font-bold uppercase tracking-wider text-indigo-400">
                Quick Links
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                    Shopping Cart ({itemCount})
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" onClick={() => setMobileMenuOpen(false)}>
                    Checkout / Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export const Header: React.FC = () => {
  return (
    <Suspense
      fallback={
        <header className="bg-slate-950 text-white p-4 flex items-center justify-between h-16 border-b border-slate-800">
          <div className="text-lg font-bold text-indigo-400">ApexMart</div>
        </header>
      }
    >
      <HeaderBar />
    </Suspense>
  );
};
