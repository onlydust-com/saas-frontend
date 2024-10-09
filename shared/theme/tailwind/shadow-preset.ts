import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { SHADOW } from "../shadow";

const ShadowPreset: Config = {
  content: [],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        [`.${SHADOW.xs}`]: {
          boxShadow: "0px 1px var(--effects-blur-xs) 0px var(--effects-shadow-xs)",
        },
        [`.${SHADOW.sm}`]: {
          boxShadow:
            "0px 1px var(--effects-blur-sm_2) 0px var(--effects-shadow-sm_2), 0px 1px var(--effects-blur-sm_1) 0px var(--effects-shadow-sm_1)",
        },
        [`.${SHADOW.md}`]: {
          boxShadow:
            "0px 1px var(--effects-blur-md_2) 0px var(--effects-shadow-md_2), 0px 1px var(--effects-blur-md_1) 0px var(--effects-shadow-md_1)",
        },
        [`.${SHADOW.lg}`]: {
          boxShadow:
            "0px 1px var(--effects-blur-lg_2) 0px var(--effects-shadow-lg_2), 0px 1px var(--effects-blur-lg_1) 0px var(--effects-shadow-lg_1)",
        },
        [`.${SHADOW.xl}`]: {
          boxShadow:
            "0px 1px var(--effects-blur-xl_2) 0px var(--effects-shadow-xl_2), 0px 1px var(--effects-blur-xl_1) 0px var(--effects-shadow-xl_1)",
        },
        [`.${SHADOW.bg_blur_shadow}`]: {
          boxShadow:
            "0px 1px var(--effects-blur-xl_2) 0px var(--effects-shadow-xl_2), 0px 1px var(--effects-blur-xl_1) 0px var(--effects-shadow-xl_1)",
        },
      });
    }),
  ],
};

export default ShadowPreset;
