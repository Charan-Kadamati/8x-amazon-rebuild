"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
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
  Share2,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === resolvedParams.id) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-amazon-orange">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href={`/search?category=${encodeURIComponent(product.category)}`} className="hover:text-amazon-orange">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-800 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Layout: 3 Columns (Gallery | Info | Buy Box) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnail List */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[450px]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 rounded border-2 p-1 overflow-hidden shrink-0 transition bg-gray-50 ${
                  selectedImage === idx ? "border-amazon-orange ring-2 ring-amazon-orange/30" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="flex-1 h-[380px] md:h-[450px] relative rounded-lg border border-gray-100 p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Middle Column: Details & Specs (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <span className="text-xs font-bold text-amazon-blue uppercase tracking-wider">
              Brand: {product.brand}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mt-1">
              {product.title}
            </h1>
          </div>

          {/* Star Ratings */}
          <div className="flex items-center gap-2 border-b pb-3">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < fullStars ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{product.rating}</span>
            <span className="text-xs text-amazon-blue hover:underline cursor-pointer">
              ({product.reviewCount.toLocaleString()} ratings)
            </span>
          </div>

          {/* Pricing & Discounts */}
          <div className="space-y-1 bg-amber-50/60 p-3.5 rounded-lg border border-amber-100">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-red-700 font-extrabold uppercase">
                -{product.discountPercent}%
              </span>
              <span className="text-3xl font-extrabold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
            {product.listPrice > product.price && (
              <div className="text-xs text-gray-500">
                List Price: <span className="line-through">${product.listPrice.toFixed(2)}</span>
                <span className="ml-2 text-green-700 font-medium">
                  Save ${(product.listPrice - product.price).toFixed(2)}
                </span>
              </div>
            )}
            <div className="text-[11px] text-gray-500 pt-1">Inclusive of all taxes</div>
          </div>

          {/* Key Product Bullet Points */}
          <div className="space-y-2 border-t pt-4">
            <h3 className="font-bold text-sm text-gray-900">About this item</h3>
            <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-inside leading-relaxed">
              {product.features.map((feature, idx) => (
                <li key={idx} className="pl-1">
                  <span className="text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs Table */}
          <div className="space-y-2 border-t pt-4">
            <h3 className="font-bold text-sm text-gray-900">Product Specifications</h3>
            <div className="text-xs border rounded-lg overflow-hidden divide-y">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 p-2 bg-gray-50/50">
                  <span className="font-semibold text-gray-600">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Buy Box (3 cols on lg) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="text-2xl font-extrabold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </div>

            {/* Delivery Info */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amazon-blue font-bold">
                <Truck className="w-4 h-4 text-amazon-blue" />
                <span>FREE Prime Delivery</span>
              </div>
              <p className="text-gray-600">
                Order within <span className="font-bold text-green-700">3 hrs 45 mins</span> for FREE Tomorrow Delivery.
              </p>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Deliver to New York 10001</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-sm font-bold">
              {product.inStock ? (
                <span className="text-green-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> In Stock ({product.stockCount} available)
                </span>
              ) : (
                <span className="text-red-600">Currently Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-md p-2 text-xs font-bold text-gray-800 outline-none cursor-pointer shadow-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow transition active:scale-95 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-amazon-orange hover:bg-amber-600 text-white font-extrabold text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow transition active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Merchant Details & Guarantees */}
            <div className="text-[11px] text-gray-500 space-y-1.5 border-t pt-3">
              <div className="flex justify-between">
                <span>Ships from</span>
                <span className="font-semibold text-gray-800">ApexMart.com</span>
              </div>
              <div className="flex justify-between">
                <span>Sold by</span>
                <span className="font-semibold text-gray-800">{product.brand} Official</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700 pt-2">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Secure transaction guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>30-Day Return / Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Rating Breakdown Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Customer Reviews & Ratings</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-gray-900">{product.rating}</span>
              <span className="text-sm font-semibold text-gray-500">out of 5</span>
            </div>
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < fullStars ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">{product.reviewCount.toLocaleString()} global ratings</p>

            {/* Rating Bars */}
            <div className="space-y-2 text-xs">
              {[
                { stars: "5 star", pct: 78 },
                { stars: "4 star", pct: 15 },
                { stars: "3 star", pct: 4 },
                { stars: "2 star", pct: 2 },
                { stars: "1 star", pct: 1 },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-12 font-medium text-amazon-blue hover:underline cursor-pointer">
                    {row.stars}
                  </span>
                  <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-amazon-yellow h-full rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-500">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Verified Reviews */}
          <div className="md:col-span-8 space-y-4 divide-y">
            {[
              {
                user: "Alex Rivera",
                date: "September 12, 2026",
                title: "Exceptional quality and incredible value!",
                comment:
                  "I was amazed by how fast it arrived. The build quality exceeds expectations and works seamlessly out of the box. Highly recommended!",
                rating: 5,
              },
              {
                user: "Sarah Jenkins",
                date: "August 28, 2026",
                title: "Great product, exceeded my expectations",
                comment:
                  "Purchased this for everyday use. Battery life is fantastic and the finish feels super premium.",
                rating: 5,
              },
            ].map((rev, idx) => (
              <div key={idx} className={`${idx > 0 ? "pt-4" : ""} space-y-1.5`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amazon-light_dark text-white text-xs font-bold flex items-center justify-center">
                    {rev.user[0]}
                  </div>
                  <span className="text-xs font-bold text-gray-800">{rev.user}</span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold">
                    Verified Purchase
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">{rev.title}</h4>
                </div>
                <div className="text-[11px] text-gray-500">Reviewed in the United States on {rev.date}</div>
                <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
