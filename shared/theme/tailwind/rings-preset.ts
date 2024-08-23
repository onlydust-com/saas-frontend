import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { RINGS } from "../rings";

const RingsPreset: Config = {
  content: [],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        [`.${RINGS.BRAND_SPACED}`]: {
          boxShadow:
            "0px 0px 0px 2px var(--background-primary_alt), 0px 0px 0px 4px var(--effects-focusrings-brand-spaced)",
        },
        [`.${RINGS.BRAND_GLUED}`]: {
          boxShadow: "0px 0px 0px 2px var(--effects-focusrings-brand-glued, rgba(172, 0, 255, 0.14))",
        },
        [`.${RINGS.ERROR_SPACED}`]: {
          boxShadow:
            "0px 0px 0px 2px var(--background-primary_alt), 0px 0px 0px 4px var(--effects-focusrings-error-spaced)",
        },
        [`.${RINGS.ERROR_GLUED}`]: {
          boxShadow: "0px 0px 0px 2px var(--effects-focusrings-error-glued, rgba(172, 0, 255, 0.14))",
        },
      });
    }),
  ],
};

export default RingsPreset;
