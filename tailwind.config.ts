import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

import { BREAKPOINTS } from "./shared/constants/breakpoints";
import { COLORS } from "./shared/theme/colors";

const config: Config = withTV({
  darkMode: "selector",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"], belwe: ["Belwe"] },
      colors: {
        ...COLORS,
      },
      screens: {
        mobile: `${BREAKPOINTS.mobile}px`,
        tablet: `${BREAKPOINTS.tablet}px`,
        laptop: `${BREAKPOINTS.laptop}px`,
        desktop: `${BREAKPOINTS.desktop}px`,
        wide: `${BREAKPOINTS.wide}px`,
      },
    },
  },
  plugins: [
    typography,
    scrollbar,
    nextui({
      defaultTheme: "dark",
      // themes: {
      //   dark: {
      //     colors: {
      //       background: "transparent",
      //       primary: "#AE00FF", // Space Purple 500
      //     },
      //     layout: {
      //       radius: {
      //         large: "10px",
      //       },
      //       boxShadow: {
      //         medium: "0px 8px 64px 0px rgba(0, 0, 0, 0.32)",
      //       },
      //     },
      //   },
      // },
    }),
  ],
});

export default config;
