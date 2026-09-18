"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Flame, Award, Zap, Tag, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function HomePage() {
  const [activeBanner, setActiveBanner] = useState(0);

  const heroBanners = [
    {
      title: "Elevate Your Audio & Tech Experience",
      subtitle: "Save up to 35% on ANC Headphones, OLED Laptops & 4K QLED TVs",
      tag: "Limited Time Tech Deals",
      bgGradient: "from-slate-900 via-sky-950 to-slate-900",
      categoryLink: "/search?category=Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Transform Your Living Space into a Smart Oasis",
      subtitle: "Discover Smart Security Cameras, LiDAR Robot Vacuums & RGB Lighting",
      tag: "Smart Home Event",
      bgGradient: "from-emerald-950 via-teal-900 to-slate-900",
      categoryLink: "/search?category=Smart+Home",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Upgrade Your Fitness & Wellness Routine",
      subtitle: "Premium Adjustable Dumbbells, Smartwatches & Eco Yoga Mats",
      tag: "New Arrivals in Fitness",
      bgGradient: "from-amber-950 via-stone-900 to-slate-900",
      categoryLink: "/search?category=Fitness+%26+Sports",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const todaysDeals = PRODUCTS.filter((p) => p.discountPercent >= 25);
  const apexChoice = PRODUCTS.filter((p) => p.isApexChoice);

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Carousel Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl text-white">
        <div
          className={`bg-gradient-to-r ${heroBanners[activeBanner].bgGradient} p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 min-h-[340px]`}
        >
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <span className="inline-block bg-amazon-orange text-amazon-dark font-extrabold text-xs uppercase px-3 py-1 rounded-full tracking-wider shadow">
              {heroBanners[activeBanner].tag}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {heroBanners[activeBanner].title}
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              {heroBanners[activeBanner].subtitle}
            </p>
            <div className="pt-2">
              <Link
                href={heroBanners[activeBanner].categoryLink}
                className="inline-flex items-center gap-2 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold px-6 py-3 rounded-full shadow-lg transition active:scale-95"
              >
                <span>Shop Deals Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 h-48 md:h-64 relative rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
            <img
              src={heroBanners[activeBanner].image}
              alt="Featured Product"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBanner(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeBanner === idx ? "bg-amazon-yellow w-8" : "bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Value Proposition Highlights Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
        <div className="flex flex-col items-center gap-2 p-2">
          <Truck className="w-7 h-7 text-amazon-orange" />
          <span className="font-bold text-xs md:text-sm text-gray-900">Fast & Free Shipping</span>
          <span className="text-xs text-gray-500">On all Prime orders over $35</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
          <ShieldCheck className="w-7 h-7 text-amazon-orange" />
          <span className="font-bold text-xs md:text-sm text-gray-900">100% Purchase Protection</span>
          <span className="text-xs text-gray-500">Genuine items & secure checkout</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
          <RefreshCw className="w-7 h-7 text-amazon-orange" />
          <span className="font-bold text-xs md:text-sm text-gray-900">30-Day Easy Returns</span>
          <span className="text-xs text-gray-500">Hassle-free return policy</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
          <Zap className="w-7 h-7 text-amazon-orange" />
          <span className="font-bold text-xs md:text-sm text-gray-900">Exclusive Prime Deals</span>
          <span className="text-xs text-gray-500">Daily price cuts across categories</span>
        </div>
      </div>

      {/* Category Quick Selector Cards Grid */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-amazon-orange" />
          <span>Shop by Category</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CATEGORIES.filter((c) => c !== "All Categories").map((category) => (
            <Link
              key={category}
              href={`/search?category=${encodeURIComponent(category)}`}
              className="bg-white p-4 rounded-xl border border-gray-200 text-center hover:border-amazon-orange hover:shadow-md transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-amazon-bg_gray flex items-center justify-center text-amazon-dark group-hover:bg-amazon-yellow transition">
                <Zap className="w-6 h-6 text-amazon-dark" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-amazon-orange transition">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Deals Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-600 fill-red-600 animate-pulse" />
            <h2 className="text-lg md:text-xl font-extrabold text-gray-900">
              Today&apos;s Super Deals
            </h2>
          </div>
          <Link
            href="/search?sort=price_low"
            className="text-xs md:text-sm font-bold text-amazon-blue hover:text-amazon-orange hover:underline flex items-center gap-1"
          >
            <span>See all deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todaysDeals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amazon-orange" />
            <h2 className="text-lg md:text-xl font-extrabold text-gray-900">
              Best Sellers in All Departments
            </h2>
          </div>
          <Link
            href="/search?sort=bestseller"
            className="text-xs md:text-sm font-bold text-amazon-blue hover:text-amazon-orange hover:underline flex items-center gap-1"
          >
            <span>View top ranking items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Apex Choice Top Rated Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amazon-yellow fill-amazon-yellow" />
            <h2 className="text-lg md:text-xl font-extrabold text-gray-900">
              Apex Choice — Highly Rated Products
            </h2>
          </div>
          <Link
            href="/search?sort=rating"
            className="text-xs md:text-sm font-bold text-amazon-blue hover:text-amazon-orange hover:underline flex items-center gap-1"
          >
            <span>Explore top rated</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {apexChoice.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
