import { IconPort } from "@/design-system/atoms/icon";

export interface MetricProps {
  icon: NonNullable<IconPort["component"]>;
  count: number;
}
