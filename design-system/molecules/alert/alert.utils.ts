import { CircleDashed } from "lucide-react";

import { IconPort } from "@/design-system/atoms/icon";

import { AlertProps } from "./alert.types";

export function getDefaultIcon(color: AlertProps["color"]): IconPort["component"] {
  const map = {
    white: CircleDashed,
    grey: CircleDashed,
    brand: CircleDashed,
    error: CircleDashed,
    warning: CircleDashed,
    success: CircleDashed,
  } as const;

  return map[color || "white"];
}
