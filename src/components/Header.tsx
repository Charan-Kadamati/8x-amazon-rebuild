"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  X,
  ChevronDown,
  User,
  Zap,
} from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useCart } from "@/context/CartContext";

function HeaderBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All Categories"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="bg-amazon-dark text-white sticky top-0 z-50">
      {/* Top Main Navigation Bar */}
      <div className="max-w-[1500px] mx-auto flex items-center justify-between px-3 py-2 gap-2 md:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 rounded hover:border border-white"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2 py-1 border border-transparent hover:border-white rounded transition"
          >
            <Zap className="w-6 h-6 text-amazon-yellow fill-amazon-yellow" />
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center">
              apex<span className="text-amazon-yellow">mart</span>
            </span>
          </Link>
        </div>

        {/* Deliver To Selector (Desktop) */}
        <div className="hidden lg:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer leading-tight">
          <span className="text-xs text-gray-300 pl-4">Deliver to</span>
          <div className="flex items-center gap-1 font-bold text-sm">
            <MapPin className="w-4 h-4 text-gray-200" />
            <span>New York 10001</span>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center h-10 max-w-3xl rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amazon-orange bg-white"
        >
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="hidden md:block bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2 h-full border-r border-gray-300 outline-none cursor-pointer max-w-[130px] truncate"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ApexMart items, brands, and categories..."
            className="w-full text-sm text-gray-900 px-3 outline-none h-full placeholder:text-gray-500"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark h-full px-4 flex items-center justify-center transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5 font-bold" />
          </button>
        </form>

        {/* Account & Navigation Links */}
        <div className="flex items-center gap-1 md:gap-3 text-sm">
          {/* Account Dropdown */}
          <Link
            href="/search"
            className="hidden sm:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer leading-tight"
          >
            <span className="text-xs text-gray-300">Hello, Sign in</span>
            <div className="flex items-center gap-0.5 font-bold">
              <span>Account & Lists</span>
              <ChevronDown className="w-3 h-3 text-gray-300" />
            </div>
          </Link>

          {/* Returns & Orders */}
          <Link
            href="/search"
            className="hidden md:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer leading-tight"
          >
            <span className="text-xs text-gray-300">Returns</span>
            <span className="font-bold">& Orders</span>
          </Link>

          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-transparent hover:border-white rounded relative transition"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white" />
              <span className="absolute -top-1.5 -right-1.5 bg-amazon-orange text-amazon-dark font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                {itemCount}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-sm mt-2">
              Cart
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-4/5 max-w-xs bg-white text-gray-900 h-full flex flex-col z-10 shadow-2xl">
            {/* Drawer Header */}
            <div className="bg-amazon-light_dark text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-base">
                <User className="w-6 h-6 bg-white/20 p-1 rounded-full" />
                <span>Hello, Sign in</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Category Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              <div className="font-bold text-gray-900 text-base border-b pb-2">
                Trending Categories
              </div>
              <ul className="space-y-3 font-medium text-gray-700">
                {CATEGORIES.filter((c) => c !== "All Categories").map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/search?category=${encodeURIComponent(cat)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-amazon-orange transition"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="font-bold text-gray-900 text-base border-b pt-4 pb-2">
                Help & Settings
              </div>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                    Your Shopping Cart ({itemCount} items)
                  </Link>
                </li>
                <li>Customer Service</li>
                <li>Sign In / Register</li>
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
        <header className="bg-amazon-dark text-white p-3 flex items-center justify-between h-14">
          <div className="text-xl font-bold text-amazon-yellow">apexmart</div>
        </header>
      }
    >
      <HeaderBar />
    </Suspense>
  );
};
