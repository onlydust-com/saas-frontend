import { IconSize } from "@/design-system/atoms/icon/icon.types";

const IconWidth: { [key in IconSize]: number } = {
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
};

const IconStroke: { [key in IconSize]: number } = {
  xxs: 1,
  xs: 1.17,
  sm: 1.35,
  md: 1.7,
  lg: 2,
};

export const IconSizeMap = {
  width: IconWidth,
  stroke: IconStroke,
};
