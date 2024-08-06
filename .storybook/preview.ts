import type { Preview } from "@storybook/react";
import "remixicon/fonts/remixicon.css";

import "@/app/globals.css";

const preview: Preview = {
  parameters: {
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
