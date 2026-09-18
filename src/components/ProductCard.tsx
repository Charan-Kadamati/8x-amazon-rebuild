"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check, Zap } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Generate full and half stars array
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-200 group relative">
      <div>
        {/* Badges Overlay */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2 min-h-[24px]">
          {product.isBestSeller && (
            <span className="bg-[#E67A00] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
              Best Seller
            </span>
          )}
          {product.isApexChoice && (
            <span className="bg-[#002F36] text-amazon-yellow text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-amazon-yellow" /> Apex Choice
            </span>
          )}
        </div>

        {/* Product Image Link */}
        <Link
          href={`/product/${product.id}`}
          className="block relative w-full h-48 mb-3 overflow-hidden rounded bg-gray-50 flex items-center justify-center"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Category & Brand */}
        <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </div>

        {/* Title Link */}
        <Link
          href={`/product/${product.id}`}
          className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-amazon-orange transition mb-1.5 leading-snug"
        >
          {product.title}
        </Link>

        {/* Star Ratings */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < fullStars
                    ? "fill-amber-400 text-amber-400"
                    : i === fullStars && hasHalfStar
                    ? "fill-amber-400 text-amber-400 opacity-70"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-amazon-blue hover:underline cursor-pointer">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price & Discounts */}
        <div className="mb-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xs text-red-700 font-semibold uppercase">
              -{product.discountPercent}%
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {product.listPrice > product.price && (
            <div className="text-xs text-gray-500">
              List Price: <span className="line-through">${product.listPrice.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Prime Shipping Badge */}
        {product.primeEligible && (
          <div className="flex items-center gap-1 text-xs text-gray-700 font-medium mb-3">
            <span className="text-amazon-blue font-extrabold italic tracking-tighter">
              prime
            </span>
            <span>FREE One-Day Delivery</span>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product, 1)}
        className="w-full mt-2 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-bold text-xs py-2 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};
