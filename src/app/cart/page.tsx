"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, itemCount, subtotal, tax, shipping, total } =
    useCart();

  const freeShippingThreshold = 35;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;

  if (cart.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center space-y-6 max-w-2xl mx-auto my-8">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amazon-orange">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-900">Your ApexMart Cart is empty</h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Your shopping cart is waiting for great finds. Explore our latest deals and top-rated electronics!
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold px-8 py-3 rounded-full shadow transition active:scale-95 text-sm"
          >
            <span>Start Shopping Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Free Shipping Progress Alert */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
        <div className="flex-1 text-xs">
          {isFreeShipping ? (
            <p className="font-bold text-green-800">
              Your order qualifies for <span className="underline">FREE Prime Shipping</span>!
            </p>
          ) : (
            <p className="font-medium text-gray-700">
              Add <span className="font-bold text-amazon-orange">${amountNeededForFreeShipping.toFixed(2)}</span> of eligible items to your order to qualify for FREE Shipping.
            </p>
          )}
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Shopping Cart</h1>
              <p className="text-xs text-gray-500">{itemCount} items in cart</p>
            </div>
            <button
              onClick={clearCart}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          </div>

          {/* Cart Item Cards */}
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.product.id} className="py-5 flex flex-col sm:flex-row items-start gap-4">
                {/* Product Thumbnail */}
                <Link
                  href={`/product/${item.product.id}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-50 rounded-lg border border-gray-200 p-2 overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <Link
                    href={`/product/${item.product.id}`}
                    className="font-bold text-gray-900 text-sm hover:text-amazon-orange transition line-clamp-2 leading-snug"
                  >
                    {item.product.title}
                  </Link>

                  <div className="text-xs text-gray-500 font-medium">Brand: {item.product.brand}</div>

                  <div className="text-xs font-bold text-green-700">In Stock</div>

                  {item.product.primeEligible && (
                    <div className="flex items-center gap-1 text-[11px] text-gray-600">
                      <Truck className="w-3.5 h-3.5 text-amazon-blue" />
                      <span>Eligible for FREE Shipping</span>
                    </div>
                  )}

                  {/* Quantity & Delete Controls */}
                  <div className="flex items-center gap-4 pt-1">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">Qty:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                        className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs font-bold text-gray-800 outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs font-semibold text-amazon-blue hover:text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Item Subtotal Price */}
                <div className="text-right self-start sm:self-auto">
                  <div className="text-lg font-extrabold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-[11px] text-gray-500">
                      ${item.product.price.toFixed(2)} each
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 text-right">
            <span className="text-sm font-medium text-gray-700">
              Subtotal ({itemCount} items):{" "}
            </span>
            <span className="text-xl font-extrabold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <h2 className="text-lg font-extrabold text-gray-900 border-b pb-3">Order Summary</h2>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping:</span>
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

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-gray-500 space-y-2 border-t pt-4">
              <div className="flex items-center gap-1.5 text-gray-700">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Secure 256-Bit SSL Encrypted Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
