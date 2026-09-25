"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce flex items-center gap-3 bg-slate-900 dark:bg-slate-800 text-white border border-indigo-500/40 px-5 py-4 rounded-2xl shadow-2xl max-w-sm border-l-4 border-l-indigo-500">
      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
      <span className="text-xs md:text-sm font-bold flex-1 text-slate-100 leading-snug">{toastMessage}</span>
      <button
        onClick={closeToast}
        className="p-1 hover:bg-slate-700/60 rounded-lg transition text-slate-400 hover:text-white"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
