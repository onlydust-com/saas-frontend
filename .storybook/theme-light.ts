import { create } from "@storybook/theming/create";

// @ts-ignore
import Logo from "./static/logo.svg";

export default create({
  base: "light",

  colorPrimary: "#500060",
  colorSecondary: "#CDD5DF",

  appPreviewBg: "#1A1A33",
  textMutedColor: "#500060",
  barHoverColor: "#E3E8EF",
  buttonBg: "transparent",
  buttonBorder: "#E3E8EF",
  booleanBg: "#500060",
  booleanSelectedBg: "#500060",

  // UI
  appBg: "#EEF2F6",
  appContentBg: "#EEF2F6",
  appBorderColor: "#500060",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#121926",
  textInverseColor: "white",

  // Toolbar default and active colors
  barTextColor: "#121926",
  barSelectedColor: "#121926",
  barBg: "#EEF2F6",

  // Form colors
  inputBg: "#121926",
  inputBorder: "#E3E8EF",
  inputTextColor: "#121926",
  inputBorderRadius: 4,

  brandTitle: "Onlydust - Design System",
  brandUrl: "https://onlydust.com",
  brandImage: Logo,
});
