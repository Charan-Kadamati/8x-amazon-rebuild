"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import {
  ArrowRight,
  Flame,
  Award,
  Zap,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  // Instant initial load using fallback data so UI renders 0ms fast
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<string[]>(
    CATEGORIES.filter((c) => c !== "All Categories")
  );

  useEffect(() => {
    async function fetchLiveData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (Array.isArray(prodData) && prodData.length > 0) {
            setProducts(prodData);
          }
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          if (Array.isArray(catData) && catData.length > 0) {
            setCategories(catData.map((c: any) => c.name));
          }
        }
      } catch (err) {
        console.error("Live API sync notice:", err);
      }
    }
    fetchLiveData();
  }, []);

  const heroSpotlights = [
    {
      tag: "Editorial Feature",
      title: "Next-Gen ANC & Audiophile Craftsmanship",
      subtitle: "Immerse yourself in acoustic precision with active noise cancellation & 40-hour battery life.",
      bg: "from-slate-950 via-slate-900 to-indigo-950",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      link: "/search?category=Audio+%26+Wearables",
    },
    {
      tag: "Smart Living",
      title: "Intelligent Home Automation & Security",
      subtitle: "LiDAR vacuum robotics, 4K HDR smart cameras & color-calibrated ambient lighting.",
      bg: "from-slate-950 via-slate-900 to-emerald-950",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
      link: "/search?category=Smart+Home",
    },
    {
      tag: "Pro Performance",
      title: "Fitness & Athletic Precision Gear",
      subtitle: "Quick-adjust dumbell sets, wellness telemetry smartwatches & high-grip yoga mats.",
      bg: "from-slate-950 via-slate-900 to-amber-950",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
      link: "/search?category=Fitness+%26+Sports",
    },
  ];

  const todaysDeals = products.filter((p) => p.discountPercent >= 20);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const apexChoice = products.filter((p) => p.isApexChoice);

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Spotlight Carousel */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white">
        <div
          className={`bg-gradient-to-br ${heroSpotlights[activeSlide].bg} p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-700 min-h-[420px]`}
        >
          <div className="max-w-xl space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-bold text-xs uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{heroSpotlights[activeSlide].tag}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
              {heroSpotlights[activeSlide].title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {heroSpotlights[activeSlide].subtitle}
            </p>
            <div className="pt-2">
              <Link
                href={heroSpotlights[activeSlide].link}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition active:scale-95"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Image Frame */}
          <div className="w-full md:w-96 h-56 md:h-72 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-slate-900/50">
            <img
              src={heroSpotlights[activeSlide].image}
              alt="Spotlight"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroSpotlights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "bg-indigo-400 w-8" : "bg-white/30 w-2 hover:bg-white/60"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Value Proposition Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Express Free Shipping</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Complimentary delivery on all orders over $35</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Verified Quality</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Directly sourced & authentic warranty</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">30-Day Easy Returns</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">No questions asked return guarantee</p>
          </div>
        </div>
      </section>

      {/* 3. Curated Category Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Curated Departments</span>
          </h2>
          <Link
            href="/search"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
          >
            <span>All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/search?category=${encodeURIComponent(category)}`}
              className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card_hover hover:border-indigo-300 dark:hover:border-indigo-500/50 transition duration-300 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 text-slate-700 dark:text-slate-300 group-hover:text-white flex items-center justify-center transition duration-300 shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Limited-Time Deals Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Limited-Time Super Deals
            </h2>
          </div>
          <Link
            href="/search?sort=price_low"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {todaysDeals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Best Sellers & Top Rated Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Top Ranked Products
            </h2>
          </div>
          <Link
            href="/search?sort=bestseller"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Explore Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Apex Choice Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Apex Choice Collection
            </h2>
          </div>
          <Link
            href="/search?sort=rating"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Highest Rated</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {apexChoice.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
