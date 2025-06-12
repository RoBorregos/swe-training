import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { safelist } from "./utils/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: safelist,
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        code: ["code", ...fontFamily.mono],
        main: ["main", ...fontFamily.mono],
      },
      colors: {
        primary: {
          DEFAULT: "#1A1A1A",
          light: "#282828",
          foreground: "#929292",
        },
        accent: "#0B84FF",
      },
      keyframes: {
        flame: {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-120%) scale(0.5)",
            opacity: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        flame: "flame 1.5s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out 0.3s forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
