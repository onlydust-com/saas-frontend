import { IconSize } from "@/design-system/atoms/icon/icon.types";

const IconWidth: { [key in IconSize]: string } = {
  xxs: "0.75rem",
  xs: "0.875rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
};

const IconStroke: { [key in IconSize]: string } = {
  xxs: "0.063rem",
  xs: "0.073rem",
  sm: "0.084rem",
  md: "0.106rem",
  lg: "0.125rem",
};

export const IconSizeMap = {
  width: IconWidth,
  stroke: IconStroke,
};
