/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "#0b1412",
          surface: "#0f1d1a",
          panel: "#132724",
          elevated: "#18322e",
        },
        accent: {
          primary: "#2dd4bf",
          soft: "#5eead4",
          muted: "#134e4a",
        },
        text: {
          primary: "#ecfeff",
          secondary: "#a7f3d0",
          muted: "#6ee7b7",
        },
        border: {
          soft: "rgba(45,212,191,0.15)",
          strong: "rgba(45,212,191,0.35)",
        },
      },
      borderRadius: {
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
      },
      boxShadow: {
        xs: "inset 0 1px 0 rgba(255,255,255,0.04)",
        sm: "0 2px 6px rgba(0,0,0,0.35)",
        md: "0 8px 20px rgba(0,0,0,0.45)",
        lg: "0 16px 40px rgba(0,0,0,0.6)",
        "2-5d":
          "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.4), 0 12px 30px rgba(0,0,0,0.55)",
        inset: "inset 0 3px 6px rgba(0,0,0,0.6)",
        glow: "0 0 20px rgba(45,212,191,0.35)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
