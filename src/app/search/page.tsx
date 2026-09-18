"use client";

import React, { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Star, Filter, SlidersHorizontal, X, ArrowUpDown, Zap } from "lucide-react";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All Categories";
  const sortParam = searchParams.get("sort") || "featured";
  const minRatingParam = parseFloat(searchParams.get("minRating") || "0");
  const minPriceParam = parseFloat(searchParams.get("minPrice") || "0");
  const maxPriceParam = parseFloat(searchParams.get("maxPrice") || "999999");
  const primeOnlyParam = searchParams.get("prime") === "true";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query filter
      if (query) {
        const qLower = query.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(qLower);
        const matchesBrand = product.brand.toLowerCase().includes(qLower);
        const matchesDesc = product.description.toLowerCase().includes(qLower);
        const matchesCat = product.category.toLowerCase().includes(qLower);
        if (!matchesTitle && !matchesBrand && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      // Category filter
      if (categoryParam !== "All Categories" && product.category !== categoryParam) {
        return false;
      }

      // Rating filter
      if (product.rating < minRatingParam) {
        return false;
      }

      // Price filter
      if (product.price < minPriceParam || product.price > maxPriceParam) {
        return false;
      }

      // Prime filter
      if (primeOnlyParam && !product.primeEligible) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortParam === "price_low") return a.price - b.price;
      if (sortParam === "price_high") return b.price - a.price;
      if (sortParam === "rating") return b.rating - a.rating;
      if (sortParam === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured default
    });
  }, [query, categoryParam, sortParam, minRatingParam, minPriceParam, maxPriceParam, primeOnlyParam]);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "" || value === "All Categories" || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/search");
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>Results</span>
            {query && <span className="text-amazon-orange">&ldquo;{query}&rdquo;</span>}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {filteredProducts.length} of {PRODUCTS.length} products
            {categoryParam !== "All Categories" && ` in "${categoryParam}"`}
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">Sort by:</span>
          <select
            value={sortParam}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-1.5 text-xs font-medium text-gray-800 outline-none cursor-pointer"
          >
            <option value="featured">Featured Deals</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
            <option value="bestseller">Best Sellers First</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(query || categoryParam !== "All Categories" || minRatingParam > 0 || minPriceParam > 0 || maxPriceParam < 999999 || primeOnlyParam) && (
        <div className="flex flex-wrap items-center gap-2 bg-amber-50/70 p-3 rounded-lg border border-amber-200">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Active Filters:
          </span>

          {categoryParam !== "All Categories" && (
            <span className="inline-flex items-center gap-1 bg-white text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-300 shadow-sm">
              Category: {categoryParam}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => updateParam("category", null)} />
            </span>
          )}

          {minRatingParam > 0 && (
            <span className="inline-flex items-center gap-1 bg-white text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-300 shadow-sm">
              {minRatingParam}+ Stars
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => updateParam("minRating", null)} />
            </span>
          )}

          {primeOnlyParam && (
            <span className="inline-flex items-center gap-1 bg-white text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-300 shadow-sm">
              Prime Eligible Only
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => updateParam("prime", null)} />
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-amazon-blue hover:text-red-600 underline ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column Sidebar Filters */}
        <div className="space-y-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-base border-b pb-3">
            <Filter className="w-5 h-5 text-amazon-orange" />
            <span>Filters</span>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-2">Department</h3>
            <ul className="space-y-1.5 text-xs font-medium">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => updateParam("category", cat)}
                    className={`w-full text-left px-2 py-1 rounded transition ${
                      categoryParam === cat
                        ? "bg-amazon-yellow/20 font-bold text-amazon-orange border-l-4 border-amazon-orange"
                        : "text-gray-700 hover:text-amazon-orange hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Prime Eligible Toggle */}
          <div className="border-t pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={primeOnlyParam}
                onChange={(e) => updateParam("prime", e.target.checked ? "true" : null)}
                className="w-4 h-4 text-amazon-orange rounded border-gray-300 focus:ring-amazon-orange"
              />
              <span className="text-xs font-bold text-amazon-blue italic">prime</span>
              <span className="text-xs text-gray-700 font-medium">Eligible for Free Shipping</span>
            </label>
          </div>

          {/* Customer Reviews Rating Filter */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-2">Customer Reviews</h3>
            <div className="space-y-1">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => updateParam("minRating", minRatingParam === stars ? null : stars.toString())}
                  className={`w-full flex items-center gap-1 px-2 py-1 rounded text-xs transition ${
                    minRatingParam === stars ? "bg-amber-100 font-bold" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < stars ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Presets */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-2">Price</h3>
            <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
              <li>
                <button
                  onClick={() => {
                    updateParam("minPrice", null);
                    updateParam("maxPrice", "50");
                  }}
                  className="hover:text-amazon-orange"
                >
                  Under $50
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateParam("minPrice", "50");
                    updateParam("maxPrice", "150");
                  }}
                  className="hover:text-amazon-orange"
                >
                  $50 to $150
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateParam("minPrice", "150");
                    updateParam("maxPrice", "500");
                  }}
                  className="hover:text-amazon-orange"
                >
                  $150 to $500
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateParam("minPrice", "500");
                    updateParam("maxPrice", null);
                  }}
                  className="hover:text-amazon-orange"
                >
                  $500 & Above
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center space-y-4 shadow-sm">
              <Zap className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No products match your search criteria</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Try checking for spelling errors, clearing your active filters, or searching for a broader term.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-bold text-xs px-6 py-2.5 rounded-full shadow transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 text-sm">Loading products...</div>}>
      <SearchContent />
    </Suspense>
  );
}
