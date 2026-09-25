"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const fullStars = Math.floor(product.rating);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between shadow-card hover:shadow-card_hover hover:border-indigo-200 dark:hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            {product.brand}
          </span>
          {product.discountPercent > 0 && (
            <span className="text-[11px] font-extrabold text-amber-950 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border dark:border-amber-700/50 px-2 py-0.5 rounded-full">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Product Image Box */}
        <Link
          href={`/product/${product.id}`}
          className="block relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 p-4 flex items-center justify-center group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-950/20 transition duration-300"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Title */}
        <Link
          href={`/product/${product.id}`}
          className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-2 leading-snug"
        >
          {product.title}
        </Link>

        {/* Star Rating & Review count */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < fullStars ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">({product.reviewCount})</span>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100 leading-tight">
            ${product.price.toFixed(2)}
          </div>
          {product.listPrice > product.price && (
            <div className="text-[11px] text-slate-400 line-through">
              ${product.listPrice.toFixed(2)}
            </div>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-sm ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-slate-950 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white"
          }`}
          aria-label="Add to cart"
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
