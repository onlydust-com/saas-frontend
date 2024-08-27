import { CircleDashed } from "lucide-react";

import { IconPort } from "@/design-system/atoms/icon";

import { AlertPort } from "./alert.types";

export function getDefaultIcon(color: AlertPort["color"]): IconPort["component"] {
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
