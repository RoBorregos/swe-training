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
      },
      animation: {
        flame: "flame 1.5s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
