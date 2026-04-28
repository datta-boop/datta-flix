import { allThemes, defaultTheme, safeThemeList } from "./themes";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const themer = require("tailwindcss-themer");

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: safeThemeList,
  theme: {
    extend: {
      /* breakpoints */
      screens: {
        ssm: "400px",
      },

      /* fonts */
      fontFamily: {
        "main": "'DM Sans'", // "main": "'Open Sans'",
      },

      /* animations */
      keyframes: {
        "loading-pin": {
          "0%, 40%, 100%": { height: "0.5em", "background-color": "#282336" },
          "20%": { height: "1em", "background-color": "white" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gold-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "loading-pin": "loading-pin 1.8s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "gold-pulse": "gold-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    themer({
      defaultTheme: defaultTheme,
      themes: [
        {
          name: "default",
          selectors: [".theme-default"],
          ...defaultTheme,
        },
        ...allThemes,
      ],
    }),
    plugin(({ addVariant }) => {
      addVariant("dir-neutral", "[dir] &");
    }),
  ],
};

export default config;
