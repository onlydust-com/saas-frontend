import { Config } from "tailwindcss";

import { RADIUS as borderRadius } from "../radius";

const RadiusPreset: Config = {
  content: [],
  theme: {
    extend: {
      borderRadius,
    },
  },
};

export default RadiusPreset;
