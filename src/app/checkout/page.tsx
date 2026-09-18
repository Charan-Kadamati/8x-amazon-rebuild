"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, Lock, CreditCard, Truck, CheckCircle2, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, itemCount, subtotal, tax, shipping, total } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Alex Rivera",
    address: "450 5th Avenue, Suite 1200",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4829",
    expDate: "12/28",
    cvv: "892",
    deliveryOption: "standard",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `114-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const orderData = {
      orderId,
      items: cart,
      shippingAddress: formData,
      total,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    try {
      sessionStorage.setItem("apexmart_last_order", JSON.stringify(orderData));
    } catch (err) {
      console.error("Failed to save order to session storage", err);
    }

    clearCart();
    router.push(`/confirmation?orderId=${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center space-y-4 max-w-lg mx-auto my-8">
        <Lock className="w-12 h-12 text-gray-400 mx-auto" />
        <h1 className="text-xl font-bold text-gray-900">Your cart is currently empty</h1>
        <p className="text-xs text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => router.push("/search")}
          className="bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold text-xs px-6 py-2.5 rounded-full shadow transition"
        >
          Return to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Checkout Security Header */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" />
          <h1 className="text-lg font-extrabold text-gray-900">ApexMart Checkout</h1>
        </div>
        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-600" /> 256-Bit SSL Encrypted
        </span>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multi-Step Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-amazon-dark text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-extrabold text-gray-900">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2.5 outline-none focus:border-amazon-orange text-gray-900 font-medium"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-gray-700">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2.5 outline-none focus:border-amazon-orange text-gray-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2.5 outline-none focus:border-amazon-orange text-gray-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded p-2.5 outline-none focus:border-amazon-orange text-gray-900 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded p-2.5 outline-none focus:border-amazon-orange text-gray-900 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-amazon-dark text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-extrabold text-gray-900">Payment Method</h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition border-amazon-orange bg-amber-50/40">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="text-amazon-orange focus:ring-amazon-orange"
                />
                <CreditCard className="w-5 h-5 text-gray-700" />
                <div className="text-xs">
                  <span className="font-bold text-gray-900">Credit or Debit Card</span>
                  <p className="text-gray-500">Visa, Mastercard, Discover, Amex</p>
                </div>
              </label>

              {formData.paymentMethod === "card" && (
                <div className="pl-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="md:col-span-2 space-y-1">
                    <label className="font-semibold text-gray-700">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 outline-none focus:border-amazon-orange font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-700">Expires</label>
                      <input
                        type="text"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2 outline-none focus:border-amazon-orange"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-700">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2 outline-none focus:border-amazon-orange"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Review Items in Order */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-amazon-dark text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-extrabold text-gray-900">Review Items & Delivery</h2>
            </div>

            <div className="divide-y">
              {cart.map((item) => (
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
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5 sticky top-20">
            <button
              type="submit"
              className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold text-sm py-3.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <span>Place Your Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-gray-500 text-center">
              By placing your order, you agree to ApexMart&apos;s privacy notice and conditions of use.
            </div>

            <div className="border-t pt-4 space-y-2.5 text-xs text-gray-700">
              <h3 className="font-bold text-sm text-gray-900 mb-2">Order Summary</h3>
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling:</span>
                <span className="font-semibold text-gray-900">
                  {shipping === 0 ? <span className="text-green-700 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%):</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-base font-extrabold text-gray-900">
                <span>Order Total:</span>
                <span className="text-amazon-price_red">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
