import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: "#131921",
          light_dark: "#232F3E",
          yellow: "#FEBD69",
          orange: "#FF9900",
          accent_orange: "#E47911",
          blue: "#007185",
          link_blue: "#007185",
          price_red: "#B12704",
          bg_gray: "#EAEDED",
          card_border: "#DDD",
        },
      },
    },
  },
  plugins: [],
};
export default config;
