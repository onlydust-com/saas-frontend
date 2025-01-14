import { Config } from "tailwindcss";

import { SPACING } from "../spacing";

const SpacingPreset: Config = {
  content: [],
  theme: {
    extend: {
      gap: SPACING,
      padding: SPACING,
      margin: SPACING,
      translate: SPACING,
      space: SPACING,
      inset: SPACING,
      scrollPadding: SPACING,
      scrollMargin: SPACING,
    },
  },
};

export default SpacingPreset;
