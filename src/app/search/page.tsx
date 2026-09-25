"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Star, Filter, SlidersHorizontal, X, ArrowUpDown, RefreshCcw, Search } from "lucide-react";

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

  // Filter initial static products synchronously so UI loads 0ms instantly
  const initialFiltered = PRODUCTS.filter((product) => {
    if (query) {
      const qLower = query.toLowerCase();
      const matches =
        product.title.toLowerCase().includes(qLower) ||
        product.brand.toLowerCase().includes(qLower) ||
        product.description.toLowerCase().includes(qLower) ||
        product.category.toLowerCase().includes(qLower);
      if (!matches) return false;
    }
    if (categoryParam !== "All Categories" && product.category !== categoryParam) return false;
    if (product.rating < minRatingParam) return false;
    if (product.price < minPriceParam || product.price > maxPriceParam) return false;
    if (primeOnlyParam && !product.primeEligible) return false;
    return true;
  }).sort((a, b) => {
    if (sortParam === "price_low") return a.price - b.price;
    if (sortParam === "price_high") return b.price - a.price;
    if (sortParam === "rating") return b.rating - a.rating;
    if (sortParam === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    return 0;
  });

  const [products, setProducts] = useState<Product[]>(initialFiltered);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Re-filter initial items whenever search parameters change
    const updatedFiltered = PRODUCTS.filter((product) => {
      if (query) {
        const qLower = query.toLowerCase();
        const matches =
          product.title.toLowerCase().includes(qLower) ||
          product.brand.toLowerCase().includes(qLower) ||
          product.description.toLowerCase().includes(qLower) ||
          product.category.toLowerCase().includes(qLower);
        if (!matches) return false;
      }
      if (categoryParam !== "All Categories" && product.category !== categoryParam) return false;
      if (product.rating < minRatingParam) return false;
      if (product.price < minPriceParam || product.price > maxPriceParam) return false;
      if (primeOnlyParam && !product.primeEligible) return false;
      return true;
    }).sort((a, b) => {
      if (sortParam === "price_low") return a.price - b.price;
      if (sortParam === "price_high") return b.price - a.price;
      if (sortParam === "rating") return b.rating - a.rating;
      if (sortParam === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0;
    });
    setProducts(updatedFiltered);

    async function fetchSearchData() {
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (categoryParam !== "All Categories") params.set("category", categoryParam);
        if (sortParam) params.set("sort", sortParam);
        if (minRatingParam > 0) params.set("minRating", minRatingParam.toString());
        if (minPriceParam > 0) params.set("minPrice", minPriceParam.toString());
        if (maxPriceParam < 999999) params.set("maxPrice", maxPriceParam.toString());

        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/products?${params.toString()}`),
          fetch("/api/categories"),
        ]);

        if (prodRes.ok) {
          let data = await prodRes.json();
          if (Array.isArray(data) && data.length > 0) {
            if (primeOnlyParam) {
              data = data.filter((p: Product) => p.primeEligible);
            }
            setProducts(data);
          }
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          if (Array.isArray(catData) && catData.length > 0) {
            setCategories(["All Categories", ...catData.map((c: any) => c.name)]);
          }
        }
      } catch (err) {
        console.error("Error fetching search API:", err);
      }
    }
    fetchSearchData();
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

  const hasActiveFilters =
    query ||
    categoryParam !== "All Categories" ||
    minRatingParam > 0 ||
    minPriceParam > 0 ||
    maxPriceParam < 999999 ||
    primeOnlyParam;

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Explore Products</span>
            {query && <span className="text-indigo-600 dark:text-indigo-400">&ldquo;{query}&rdquo;</span>}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showing <span className="font-bold text-slate-900 dark:text-white">{products.length}</span> results
            {categoryParam !== "All Categories" && ` in department "${categoryParam}"`}
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2.5 self-end md:self-auto bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <ArrowUpDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Sort by:</span>
          <select
            value={sortParam}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="featured">Featured Deals</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Avg. Rating</option>
            <option value="bestseller">Best Sellers</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 bg-indigo-50/60 dark:bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
          <span className="text-xs font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Active Filters:</span>
          </span>

          {categoryParam !== "All Categories" && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <span>Department: {categoryParam}</span>
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => updateParam("category", null)} />
            </span>
          )}

          {minRatingParam > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <span>{minRatingParam}+ Stars</span>
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => updateParam("minRating", null)} />
            </span>
          )}

          {primeOnlyParam && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <span>Express Delivery</span>
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" onClick={() => updateParam("prime", null)} />
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-red-600 underline ml-auto flex items-center gap-1"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column Sidebar Filters */}
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card h-fit">
          <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
            <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Refine Search</span>
          </div>

          {/* Department Filter */}
          <div>
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">
              Department
            </h3>
            <ul className="space-y-1">
              {(categories.length > 0
                ? categories
                : ["All Categories", "Electronics", "Smart Home", "Audio & Wearables", "Fitness & Sports", "Computers"]
              ).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => updateParam("category", cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      categoryParam === cat
                        ? "bg-indigo-600 text-white font-bold shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Express Shipping Toggle */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={primeOnlyParam}
                onChange={(e) => updateParam("prime", e.target.checked ? "true" : null)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 dark:border-slate-700 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Free Express Delivery Only</span>
            </label>
          </div>

          {/* Rating Filter */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">
              Minimum Rating
            </h3>
            <div className="space-y-1">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => updateParam("minRating", minRatingParam === stars ? null : stars.toString())}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition ${
                    minRatingParam === stars
                      ? "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < stars ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-600 dark:text-slate-400">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Presets */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">
              Price Range
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  updateParam("minPrice", null);
                  updateParam("maxPrice", "50");
                }}
                className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 text-slate-800 dark:text-slate-200 transition"
              >
                Under $50
              </button>
              <button
                onClick={() => {
                  updateParam("minPrice", "50");
                  updateParam("maxPrice", "150");
                }}
                className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 text-slate-800 dark:text-slate-200 transition"
              >
                $50 - $150
              </button>
              <button
                onClick={() => {
                  updateParam("minPrice", "150");
                  updateParam("maxPrice", "500");
                }}
                className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 text-slate-800 dark:text-slate-200 transition"
              >
                $150 - $500
              </button>
              <button
                onClick={() => {
                  updateParam("minPrice", "500");
                  updateParam("maxPrice", null);
                }}
                className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 text-slate-800 dark:text-slate-200 transition"
              >
                $500+
              </button>
            </div>
          </div>
        </div>

        {/* Right Column Product Grid */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-card">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No products match your search</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try clearing your active filters or searching for a broader term.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition active:scale-95"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
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
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-sm">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
