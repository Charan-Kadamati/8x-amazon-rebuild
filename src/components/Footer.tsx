"use client";

import React from "react";
import Link from "next/link";
import { Zap, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-amazon-dark text-white text-xs mt-auto">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-amazon-light_dark hover:bg-gray-700 py-3 text-center text-xs font-semibold text-gray-200 transition cursor-pointer"
      >
        Back to top
      </button>

      {/* Footer Navigation Columns */}
      <div className="max-w-[1300px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700">
        <div>
          <h3 className="font-bold text-sm text-white mb-3">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">About ApexMart</li>
            <li className="hover:underline cursor-pointer">Investor Relations</li>
            <li className="hover:underline cursor-pointer">Apex Devices</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm text-white mb-3">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Sell products on ApexMart</li>
            <li className="hover:underline cursor-pointer">Sell on ApexMart Business</li>
            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            <li className="hover:underline cursor-pointer">Self-Publish with Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm text-white mb-3">Apex Payment Products</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Apex Business Card</li>
            <li className="hover:underline cursor-pointer">Shop with Points</li>
            <li className="hover:underline cursor-pointer">Reload Your Balance</li>
            <li className="hover:underline cursor-pointer">Apex Currency Converter</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm text-white mb-3">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Apex & COVID-19</li>
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Your Orders</li>
            <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
            <li className="hover:underline cursor-pointer">Returns & Replacements</li>
            <li className="hover:underline cursor-pointer">Help Center</li>
          </ul>
        </div>
      </div>

      {/* Footer Branding & Country Selector */}
      <div className="py-8 flex flex-col md:flex-row items-center justify-center gap-4 text-gray-300 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-1">
          <Zap className="w-5 h-5 text-amazon-yellow fill-amazon-yellow" />
          <span className="text-lg font-bold text-white tracking-tight">
            apex<span className="text-amazon-yellow">mart</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-600 rounded text-xs">
            <Globe className="w-4 h-4 text-gray-300" />
            <span>English</span>
          </div>
          <div className="px-3 py-1.5 border border-gray-600 rounded text-xs font-semibold">
            $ USD - U.S. Dollar
          </div>
          <div className="px-3 py-1.5 border border-gray-600 rounded text-xs">
            🇺🇸 United States
          </div>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="bg-[#0D141E] py-6 text-center text-[11px] text-gray-400 space-y-2">
        <div className="flex flex-wrap justify-center gap-4">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</span>
          <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
        </div>
        <p>© 2026 ApexMart.com, Inc. or its affiliates. Rebuilt for 8x Assignment Demonstration.</p>
      </div>
    </footer>
  );
};
