import { Config } from "tailwindcss";

const sizeSet = {
  xxs: "var(--widths-xxs)",
  xs: "var(--widths-xs)",
  sm: "var(--widths-sm)",
  md: "var(--widths-md)",
  lg: "var(--widths-lg)",
  xl: "var(--widths-xl)",
  "2xl": "var(--widths-2xl)",
  "3xl": "var(--widths-3xl)",
  "4xl": "var(--widths-4xl)",
  "5xl": "var(--widths-5xl)",
  "6xl": "var(--widths-6xl)",
  "7xl": "var(--widths-7xl)",
  "8xl": "var(--widths-8xl)",
  "9xl": "var(--widths-9xl)",
};

const SizePreset: Config = {
  content: [],
  theme: {
    extend: {
      width: sizeSet,
      height: sizeSet,
      minHeight: sizeSet,
      minWidth: sizeSet,
      maxWidth: sizeSet,
      maxHeight: sizeSet,
    },
  },
};

export default SizePreset;
