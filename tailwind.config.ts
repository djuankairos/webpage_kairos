import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kairos: {
          green: "#6FC2A8",
          "green-dark": "#3A8D7C",
          "green-bright": "#4ADE80",
          dark: "#2E3236",
          "gray-mid": "#6B7280",
          "gray-light": "#E5E7EB",
          white: "#F9FAFB",
          red: "#EF4444",
          "bg-deep": "#1C1F22",
          panel: "#1A1D20",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(111, 194, 168, 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "kairos-grid":
          "linear-gradient(rgba(111,194,168,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(111,194,168,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
