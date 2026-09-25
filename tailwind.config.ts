import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apex: {
          dark: "#0F172A",        // Rich Deep Slate
          darker: "#020617",      // Midnight Navy
          card: "#FFFFFF",
          border: "#E2E8F0",
          indigo: "#4F46E5",      // Vibrant Electric Indigo
          indigo_hover: "#4338CA",
          indigo_light: "#EEF2FF",
          amber: "#F59E0B",       // Warm Gold
          amber_light: "#FEF3C7",
          text_main: "#0F172A",
          text_muted: "#64748B",
          bg_slate: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(79, 70, 229, 0.15)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        card_hover: "0 12px 30px -4px rgba(15, 23, 42, 0.12)",
      }
    },
  },
  plugins: [],
};
export default config;
