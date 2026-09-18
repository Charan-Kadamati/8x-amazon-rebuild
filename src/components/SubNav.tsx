"use client";

import React from "react";
import Link from "next/link";
import { Menu, MapPin } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export const SubNav: React.FC = () => {
  return (
    <div className="bg-amazon-light_dark text-white text-xs md:text-sm px-3 py-1.5 flex items-center justify-between border-t border-gray-700 overflow-x-auto no-scrollbar whitespace-nowrap shadow-inner">
      <div className="flex items-center gap-3 md:gap-5">
        <Link
          href="/search"
          className="flex items-center gap-1 font-bold px-2 py-1 rounded hover:border border-white transition"
        >
          <Menu className="w-4 h-4" />
          <span>All Departments</span>
        </Link>

        {CATEGORIES.filter((c) => c !== "All Categories").map((cat) => (
          <Link
            key={cat}
            href={`/search?category=${encodeURIComponent(cat)}`}
            className="px-2 py-1 rounded hover:border border-white transition text-gray-200 hover:text-white"
          >
            {cat}
          </Link>
        ))}

        <Link
          href="/search?sort=rating"
          className="px-2 py-1 rounded hover:border border-white transition font-medium text-amazon-yellow"
        >
          Today&apos;s Deals
        </Link>
        <Link
          href="/search?sort=price_low"
          className="px-2 py-1 rounded hover:border border-white transition text-gray-200"
        >
          Customer Service
        </Link>
      </div>

      <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-amazon-yellow pr-2">
        <MapPin className="w-3.5 h-3.5" />
        <span>Shop Great Deals with Fast Free Prime Shipping</span>
      </div>
    </div>
  );
};
