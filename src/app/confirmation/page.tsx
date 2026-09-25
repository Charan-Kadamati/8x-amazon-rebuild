"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Truck, MapPin, Sparkles } from "lucide-react";

export default function ConfirmationPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const savedOrder = sessionStorage.getItem("apexmart_last_order");
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch (e) {
      console.error("Failed to load order from session storage", e);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Hero Success Banner */}
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-5 relative overflow-hidden">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full">
            Order Confirmed & Placed
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We&apos;ve received your order and are preparing it for express dispatch. A confirmation email has been sent to your address.
          </p>
        </div>

        {/* Order Meta details */}
        {order && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-left">
            <div>
              <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">Order ID</div>
              <div className="font-extrabold text-slate-900 dark:text-white">{order.orderId}</div>
            </div>
            <div>
              <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">Total Amount</div>
              <div className="font-extrabold text-slate-900 dark:text-white">${order.total.toFixed(2)}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">Est. Delivery</div>
              <div className="font-extrabold text-emerald-700 dark:text-emerald-400">Tomorrow by 8 PM</div>
            </div>
          </div>
        )}
      </div>

      {/* Ordered Items Summary */}
      {order && order.items && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
          <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Items in Shipment ({order.items.length})</span>
          </h3>

          <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map(({ product, quantity }: any, idx: number) => (
              <div key={idx} className={`${idx > 0 ? "pt-3" : ""} flex items-center justify-between text-xs`}>
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-12 h-12 object-contain rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 p-1"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400">Qty: {quantity} &bull; ${product.price.toFixed(2)} each</p>
                  </div>
                </div>
                <span className="font-black text-slate-900 dark:text-white">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Return Home Button */}
      <div className="text-center pt-2">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition active:scale-95"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
