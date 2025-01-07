import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

import { BREAKPOINTS } from "./shared/constants/breakpoints";
import { COLORS } from "./shared/theme/colors";
import GradientsPreset from "./shared/theme/tailwind/gradients-preset";
import RadiusPreset from "./shared/theme/tailwind/radius-preset";
import RingsPreset from "./shared/theme/tailwind/rings-preset";
import ShadowPreset from "./shared/theme/tailwind/shadow-preset";
import SizePreset from "./shared/theme/tailwind/size-preset";
import SpacingPreset from "./shared/theme/tailwind/spacing-preset";

const config: Config = withTV({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [ShadowPreset, RingsPreset, GradientsPreset, SizePreset, SpacingPreset, RadiusPreset],
  theme: {
    extend: {
      fontFamily: {
        clash: "Clash Display",
        inter: "Inter",
      },

      colors: {
        ...COLORS,
        glass: {
          white: "rgba(255, 255, 255, 0.03)",
          "white-gradient":
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255,255,255,0) 100%)",
        },
      },
      screens: {
        mobile: `${BREAKPOINTS.mobile}px`,
        tablet: `${BREAKPOINTS.tablet}px`,
        laptop: `${BREAKPOINTS.laptop}px`,
        desktop: `${BREAKPOINTS.desktop}px`,
        wide: `${BREAKPOINTS.wide}px`,
      },
      maxWidth: {
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
    }),
  ],
});

export default config;
