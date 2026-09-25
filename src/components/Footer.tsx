"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Top Branding & Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Intro */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Apex<span className="text-indigo-400">Mart</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Next-generation commerce startup interface built with React, Next.js App Router, and Prisma SQLite.
            </p>
          </div>

          {/* Quick Departments */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Departments</h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <Link href="/search?category=Electronics" className="hover:text-indigo-400 transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/search?category=Smart+Home" className="hover:text-indigo-400 transition">
                  Smart Home
                </Link>
              </li>
              <li>
                <Link href="/search?category=Audio+%26+Wearables" className="hover:text-indigo-400 transition">
                  Audio & Wearables
                </Link>
              </li>
              <li>
                <Link href="/search?category=Fitness+%26+Sports" className="hover:text-indigo-400 transition">
                  Fitness & Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Customer Care</h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <Link href="/cart" className="hover:text-indigo-400 transition">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-indigo-400 transition">
                  Order Status & Tracking
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-indigo-400 transition">
                  30-Day Return Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Guarantees Badges */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-200">
              <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Free Express Delivery over $35</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authentic Warranty Direct</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Instant Refund & Return Policy</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>&copy; {new Date().getFullYear()} ApexMart, Inc. Designed independently for the 8x assignment.</div>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
