import { Config } from "tailwindcss";

const spacingSet = {
  none: "var(--spacing-none)",
  xxs: "var(--spacing-xxs)",
  xs: "var(--spacing-xs)",
  sm: "var(--spacing-sm)",
  md: "var(--spacing-md)",
  "2md": "var(--spacing-2md)",
  lg: "var(--spacing-lg)",
  "2lg": "var(--spacing-2lg)",
  xl: "var(--spacing-xl)",
  "2xl": "var(--spacing-2xl)",
  "3xl": "var(--spacing-3xl)",
  "4xl": "var(--spacing-4xl)",
  "5xl": "var(--spacing-5xl)",
  "6xl": "var(--spacing-6xl)",
  "7xl": "var(--spacing-7xl)",
  "8xl": "var(--spacing-8xl)",
  "9xl": "var(--spacing-9xl)",
  "10xl": "var(--spacing-10xl)",
  "11xl": "var(--spacing-11xl)",
};

const SpacingPreset: Config = {
  content: [],
  theme: {
    extend: {
      gap: spacingSet,
      padding: spacingSet,
      margin: spacingSet,
      translate: spacingSet,
      space: spacingSet,
      inset: spacingSet,
      scrollPadding: spacingSet,
      scrollMargin: spacingSet,
    },
  },
};

export default SpacingPreset;
