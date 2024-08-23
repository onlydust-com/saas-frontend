import { Config } from "tailwindcss";

const RadiusPreset: Config = {
  content: [],
  theme: {
    extend: {
      borderRadius: {
        none: "var(--radius-none)",
        xxs: "var(--radius-xxs)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
        full: "var(--radius-full)",
      },
    },
  },
};

export default RadiusPreset;
