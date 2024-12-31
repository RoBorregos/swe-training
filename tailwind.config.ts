import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { safelist } from "./utils/colors"

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: safelist,
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        code: ["code", ...fontFamily.mono],
        main: ["main", ...fontFamily.mono]
      },
      colors: {
        primary: {
          DEFAULT: "#1A1A1A",
          light: "#282828",
          foreground: "#929292"
        },
        accent: "#0B84FF"
      }
    },
  },
  plugins: [],
} satisfies Config;
