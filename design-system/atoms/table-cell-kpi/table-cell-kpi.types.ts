import { PropsWithChildren } from "react";

import { BadgePort } from "@/design-system/atoms/badge";

type Trend = "UP" | "DOWN" | "STABLE";

interface Variants {
  trend: Trend;
  inverted: boolean;
}

interface ClassNames {
  base: string;
}

export interface TableCellKpiPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  trend?: Trend;
  inverted?: boolean;
  shape?: BadgePort<"span">["shape"];
  badgeClassNames?: BadgePort<"span">["classNames"];
}
