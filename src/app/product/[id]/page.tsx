"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Star,
  ShoppingCart,
  Zap,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const res = await fetch(`/api/products/${resolvedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          const allRes = await fetch("/api/products");
          if (allRes.ok) {
            const all = await allRes.json();
            const found = all.find((p: Product) => p.id === resolvedParams.id);
            if (found) setProduct(found);
          }
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetail();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-500 dark:text-slate-400 text-sm space-y-3">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-16 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">The product you requested could not be located in our catalog.</p>
        <Link
          href="/search"
          className="inline-block bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition hover:bg-indigo-500"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const fullStars = Math.floor(product.rating);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href={`/search?category=${encodeURIComponent(product.category)}`}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Layout: 3 Columns */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[460px] no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 rounded-xl border-2 p-1 overflow-hidden shrink-0 transition bg-slate-50 dark:bg-slate-950 ${
                  selectedImage === idx
                    ? "border-indigo-600 ring-2 ring-indigo-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Large Main Display */}
          <div className="flex-1 h-[380px] md:h-[460px] rounded-2xl border border-slate-100 dark:border-slate-800 p-6 bg-slate-50/70 dark:bg-slate-950/60 flex items-center justify-center relative overflow-hidden">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Center Column: Concise Details & Specs (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
              {product.brand}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-snug mt-2">
              {product.title}
            </h1>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < fullStars ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{product.rating}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.reviewCount.toLocaleString()} verified reviews)
            </span>
          </div>

          {/* Pricing Highlight Box */}
          <div className="space-y-1 bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 rounded-2xl shadow-md">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black">${product.price.toFixed(2)}</span>
              {product.listPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.listPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <div className="text-xs text-amber-400 font-extrabold">
                Save ${(product.listPrice - product.price).toFixed(2)} ({product.discountPercent}% Off)
              </div>
            )}
          </div>

          {/* Key Bullet Features */}
          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Key Highlights</h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications Table */}
          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Specifications</h3>
            <div className="text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 p-2.5 bg-slate-50/50 dark:bg-slate-950/40">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">{key}</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Floating Buy Box (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-5 sticky top-24">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ${(product.price * quantity).toFixed(2)}
            </div>

            {/* Delivery Guarantee */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                <Truck className="w-4 h-4" />
                <span>Free Express Delivery</span>
              </div>
              <p>In stock — orders before 3 PM ship same-day.</p>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Deliver to New York, 10001</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500/20"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "unit" : "units"}
                  </option>
                ))}
              </select>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-2 border-t border-slate-200/80 dark:border-slate-800 pt-4">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Authentic product warranty</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <RotateCcw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>30-Day Hassle-free return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
          Verified Customer Ratings & Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-slate-900 dark:text-white">{product.rating}</span>
              <span className="text-sm font-bold text-slate-400">/ 5.0</span>
            </div>
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < fullStars ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Based on {product.reviewCount.toLocaleString()} verified customer purchases</p>
          </div>

          <div className="md:col-span-8 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
            {[
              {
                user: "Alex Rivera",
                date: "September 18, 2026",
                title: "Incredible craftsmanship and flawless performance",
                comment: "Arrived next day in custom packaging. Audio performance and battery endurance exceed expectations!",
                rating: 5,
              },
              {
                user: "Sarah Jenkins",
                date: "September 10, 2026",
                title: "Extremely satisfied with this purchase",
                comment: "Clean minimalist design, lightweight, and works seamlessly with all my smart devices.",
                rating: 5,
              },
            ].map((rev, idx) => (
              <div key={idx} className={`${idx > 0 ? "pt-4" : ""} space-y-2`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {rev.user[0]}
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.user}</span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    Verified Purchase
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.title}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
