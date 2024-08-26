import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { GRADIENTS } from "../gradients";

const GradientsPreset: Config = {
  content: [],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        [`.${GRADIENTS.horizontal_1}`]: {
          background:
            "linear-gradient(180deg, #FFF6EB 0%, #FFEED9 10%, #FFE1CC 20%, #FFC6B2 30%, #FF99A1 40.05%, #FF80AA 49.97%, #F69 59.69%, #FF4DC3 70.37%, #E3F 79.72%, #C61AFF 90.4%, #A0F 100%)",
        },
        [`.${GRADIENTS.vertical_1}`]: {
          background:
            "linear-gradient(270deg, #FFF6EB 0%, #FFEED9 10%, #FFE1CC 20%, #FFC6B2 30%, #FF99A1 40.05%, #FF80AA 49.97%, #F69 59.69%, #FF4DC3 70.37%, #E3F 79.72%, #C61AFF 90.4%, #A0F 100%)",
        },
        [`.${GRADIENTS.angular_1}`]: {
          background:
            "conic-gradient(from 90deg at 50% 50%, #FFF6EB 0deg, #FFEED9 25.20000010728836deg, #FFE1CC 43.199999034404755deg, #FFC6B2 57.59999871253967deg, #FF99A1 75.59999763965607deg, #FF80AA 90deg, #F69 104.3999969959259deg, #FF4DC3 118.80000472068787deg, #E3F 133.20000171661377deg, #C61AFF 151.19999527931213deg, #A0F 172.79999613761902deg, #A0F 187.19999313354492deg, #C61AFF 208.7999939918518deg, #E3F 226.79999828338623deg, #FF4DC3 241.2000060081482deg, #F69 255.59999227523804deg, #FF80AA 270deg, #FF99A1 284.40000772476196deg, #FFC6B2 302.39999055862427deg, #FFE1CC 316.79999828338623deg, #FFEED9 334.80000257492065deg, #FFF6EB 360deg)",
        },
        [`.${GRADIENTS.horizontal_2}`]: {
          background: "linear-gradient(90deg, #FF9000 0%, #AC00FF 50%, #0B0CCB 100%)",
        },
        [`.${GRADIENTS.horizontal_3}`]: {
          background: "linear-gradient(90deg, #FF9000 0%, #AC00FF 33%, #0B0CCB 66%, #0FF 100%)",
        },
        [`.${GRADIENTS.angular_3}`]: {
          background:
            "conic-gradient(from 90deg at 50% 50%, #0B0CCB 0deg, #AC00FF 36.0000005364418deg, #0FF 72.0000010728836deg, #AC00FF 108.00000429153442deg, #0B0CCB 144.0000021457672deg, #0FF 180deg, #0B0CCB 216.00000858306885deg, #AC00FF 251.99999570846558deg, #FF9000 288.0000042915344deg, #AC00FF 323.99999141693115deg, #0B0CCB 360deg)",
        },
        [`.${GRADIENTS.component_card_bg_gradient_1}`]: {
          background:
            "radial-gradient(261.34% 179.05% at 129.06% -46.31%, rgba(255, 246, 235, 0.80) 0%, rgba(255, 238, 217, 0.80) 10%, rgba(255, 225, 204, 0.80) 20%, rgba(255, 198, 178, 0.80) 28%, rgba(255, 153, 161, 0.80) 40.05%, rgba(255, 128, 170, 0.80) 49.97%, rgba(255, 102, 153, 0.80) 59.69%, rgba(255, 77, 195, 0.80) 70.37%, rgba(238, 51, 255, 0.80) 79.72%, rgba(198, 26, 255, 0.80) 90.4%, rgba(170, 0, 255, 0.80) 100%)",
        },
      });
    }),
  ],
};

export default GradientsPreset;
