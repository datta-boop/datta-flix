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
        "hero-fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "rail-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "wave": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(10deg)" },
          "75%": { transform: "rotate(-10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "loading-pin": "loading-pin 1.8s ease-in-out infinite",
        "hero-fade-up": "hero-fade-up 0.7s ease-out forwards",
        "rail-shimmer": "rail-shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "wave": "wave 0.6s ease-in-out",
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
