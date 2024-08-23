import "@/public/fonts/clash/stylesheet.css";
import "@/public/fonts/inter/stylesheet.css";
import type { Preview } from "@storybook/react";
import "remixicon/fonts/remixicon.css";

import "@/app/globals.css";

import { TranslationProvider } from "../shared/translation/components/translation-provider/translation-provider";
import ThemeDark from "./theme";
import ThemeLight from "./theme-light";

const preview: Preview = {
  decorators: [
    Story => (
      <TranslationProvider>
        <Story />
      </TranslationProvider>
    ),
  ],
  parameters: {
    darkMode: {
      dark: { ...ThemeDark },
      light: { ...ThemeLight },
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      stylePreview: true,
    },
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
