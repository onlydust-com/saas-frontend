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
  xs: 1.1699999570846558,
  sm: 1.350000023841858,
  md: 1.7000000476837158,
  lg: 2,
};

export const IconSizeMap = {
  width: IconWidth,
  stroke: IconStroke,
};
