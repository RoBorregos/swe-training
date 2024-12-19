import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
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
          foreground: "#D2D2D2"
        },
        accent: "#0B84FF"
      }
    },
  },
  plugins: [],
} satisfies Config;
