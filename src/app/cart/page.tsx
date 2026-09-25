"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  const freeShippingThreshold = 50;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + estimatedTax;

  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Your Shopping Cart is Empty</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Looks like you haven&apos;t added any products to your cart yet. Explore our curated catalog to discover top deals!
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition active:scale-95"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review your selected items ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-slate-400 hover:text-red-600 underline self-start md:self-auto"
        >
          Clear entire cart
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-indigo-950 dark:text-indigo-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-700 dark:text-emerald-400">Congratulations! You unlocked Free Express Delivery!</span>
            ) : (
              <span>Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Express Delivery</span>
            )}
          </div>
          <span>{Math.round(shippingProgress)}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Cart Grid: Left Items List + Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:border-indigo-200 dark:hover:border-indigo-500/40"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-4 flex-1">
                <Link
                  href={`/product/${product.id}`}
                  className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {product.brand}
                  </span>
                  <Link
                    href={`/product/${product.id}`}
                    className="font-bold text-slate-900 dark:text-white text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition line-clamp-1"
                  >
                    {product.title}
                  </Link>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Unit Price: <span className="font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-3 sm:pt-0">
                {/* Quantity Pill */}
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-5 sticky top-24">
            <h3 className="font-black text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-3">
              Order Summary
            </h3>

            {/* Financial Breakdown */}
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-slate-900 dark:text-white">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Encrypted & Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
