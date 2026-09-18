"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce flex items-center gap-3 bg-amazon-dark text-white border-2 border-amazon-yellow px-4 py-3 rounded-lg shadow-2xl max-w-sm">
      <CheckCircle2 className="w-6 h-6 text-amazon-yellow shrink-0" />
      <span className="text-sm font-semibold flex-1">{toastMessage}</span>
      <button
        onClick={closeToast}
        className="p-1 hover:bg-white/10 rounded transition text-gray-400 hover:text-white"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
