import { create } from "@storybook/theming/create";

// @ts-ignore
import Logo from "./static/logo.svg";

export default create({
  base: "dark",

  colorPrimary: "#FCEAFF",
  colorSecondary: "rgba(255, 255, 255, 0.2)",

  appPreviewBg: "#1A1A33",
  textMutedColor: "#FCEAFF",
  barHoverColor: "rgba(255, 255, 255, 0.6)",
  buttonBg: "rgba(255, 255, 255, 0.2)",
  buttonBorder: "rgba(255, 255, 255, 0.2)",
  booleanBg: "#FCEAFF",
  booleanSelectedBg: "#FCEAFF",
  // UI
  appBg: "#0D121C",
  appContentBg: "#0D121C",
  appBorderColor: "#FCEAFF",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#F8FAFC",
  textInverseColor: "rgba(255, 255, 255, 0.9)",

  // Toolbar default and active colors
  barTextColor: "#F8FAFC",
  barSelectedColor: "#F8FAFC",
  barBg: "#0D121C",

  // Form colors
  inputBg: "#F8FAFC",
  inputBorder: "rgba(255, 255, 255, 0.2)",
  inputTextColor: "#F8FAFC",
  inputBorderRadius: 4,

  brandTitle: "Onlydust - Design System",
  brandUrl: "https://onlydust.com",
  brandImage: Logo,
});
