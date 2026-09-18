"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Truck, PackageCheck, MapPin, Calendar, ArrowRight, ShoppingBag } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "114-8920194-482019";
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("apexmart_last_order");
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load order from session storage", e);
    }
  }, []);

  const tomorrowStr = new Date(Date.now() + 86400000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Confirmation Success Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">Order Placed, Thank You!</h1>
          <p className="text-xs text-gray-500">
            Confirmation email sent to <span className="font-semibold text-gray-800">alex.rivera@example.com</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 text-xs font-bold text-gray-800">
          <span>Order #:</span>
          <span className="font-mono text-amazon-orange">{orderData?.orderId || orderId}</span>
        </div>
      </div>

      {/* Delivery Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-4">
          <Truck className="w-7 h-7 text-amazon-blue" />
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              Guaranteed Delivery: <span className="text-green-700">{tomorrowStr} by 10 PM</span>
            </h2>
            <p className="text-xs text-gray-500">Shipped via ApexMart Prime Express</p>
          </div>
        </div>

        {/* Shipping Address & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-gray-900 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-500" /> Shipping To:
            </span>
            <p className="text-gray-700 pl-5">
              {orderData?.shippingAddress?.fullName || "Alex Rivera"}<br />
              {orderData?.shippingAddress?.address || "450 5th Avenue, Suite 1200"}<br />
              {orderData?.shippingAddress?.city || "New York"}, {orderData?.shippingAddress?.state || "NY"} {orderData?.shippingAddress?.zipCode || "10001"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-gray-900 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-500" /> Order Date:
            </span>
            <p className="text-gray-700 pl-5">
              {orderData?.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {/* Purchased Items Breakdown */}
      {orderData?.items && orderData.items.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-gray-900 border-b pb-3 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amazon-orange" />
            <span>Items Ordered</span>
          </h3>

          <div className="divide-y">
            {orderData.items.map((item: any) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-12 object-contain bg-gray-50 p-1 border rounded"
                  />
                  <div>
                    <div className="font-bold text-gray-900 line-clamp-1">{item.product.title}</div>
                    <div className="text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-extrabold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 flex justify-between text-sm font-extrabold text-gray-900">
            <span>Total Paid:</span>
            <span className="text-amazon-price_red">${orderData.total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href="/search"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold px-8 py-3.5 rounded-full shadow transition active:scale-95 text-xs"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-3.5 rounded-full border border-gray-300 transition text-xs"
        >
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 text-sm">Loading order details...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
