"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Sricharan Kadamati",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    expDate: "12/28",
    cvv: "888",
  });

  const shippingCost = subtotal >= 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);

    const orderPayload = {
      orderId: `APEX-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: formData.fullName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      paymentMethod: formData.paymentMethod,
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      items: cart,
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("apexmart_last_order", JSON.stringify(orderPayload));

      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          paymentMethod: formData.paymentMethod,
          subtotal,
          shipping: shippingCost,
          tax,
          total,
          items: cart,
        }),
      });
    } catch (err) {
      console.error("Order submission API notice:", err);
    } finally {
      clearCart();
      router.push("/confirmation");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => router.push("/search")}
            className="bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Secure Checkout</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Complete your order in 3 quick steps
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/50">
          <Lock className="w-3.5 h-3.5" />
          <span>256-bit SSL Security</span>
        </div>
      </div>

      {/* Step Stepper Navigation */}
      <div className="flex items-center justify-between max-w-xl mx-auto bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold">
        <button
          onClick={() => setActiveStep("shipping")}
          className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeStep === "shipping"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>1. Shipping</span>
        </button>
        <button
          onClick={() => setActiveStep("payment")}
          className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeStep === "payment"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>2. Payment</span>
        </button>
        <button
          onClick={() => setActiveStep("review")}
          className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeStep === "review"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>3. Review</span>
        </button>
      </div>

      {/* Main Checkout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          {/* STEP 1: Shipping Details */}
          {activeStep === "shipping" && (
            <div className="space-y-5">
              <h2 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Shipping Address</span>
              </h2>

              <div className="space-y-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep("payment")}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Details */}
          {activeStep === "payment" && (
            <div className="space-y-5">
              <h2 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Payment Method</span>
              </h2>

              <div className="space-y-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div>
                  <label className="block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={() => {}}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Expiration Date</label>
                    <input
                      type="text"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Security Code (CVV)</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep("shipping")}
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-3"
                >
                  Back to Shipping
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep("review")}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review Order */}
          {activeStep === "review" && (
            <div className="space-y-5">
              <h2 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Review & Confirm Order</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <div className="font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Shipping Address
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">{formData.fullName}</div>
                  <div className="text-slate-600 dark:text-slate-300">{formData.address}</div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {formData.city}, {formData.state} {formData.zipCode}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Payment Info
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">Credit Card</div>
                  <div className="text-slate-600 dark:text-slate-300">{formData.cardNumber}</div>
                  <div className="text-slate-600 dark:text-slate-300">Exp: {formData.expDate}</div>
                </div>
              </div>

              {/* Items Summary List */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
                  Order Items ({cart.length})
                </h3>
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-10 h-10 object-contain rounded-lg bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 p-1"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</div>
                        <div className="text-slate-500 dark:text-slate-400">Qty: {quantity}</div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setActiveStep("payment")}
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Back to Payment
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-4 px-8 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Place Order (${total.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Total Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4 sticky top-24">
            <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
              Total Order Calculation
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Final Total</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
