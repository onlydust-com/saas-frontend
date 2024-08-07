import { ComponentProps } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";

export function getComponentsVariants(variant: ComponentProps<typeof Button>["variant"]): {
  checkboxColor: ComponentProps<typeof Checkbox>["color"];
} {
  const map = {
    "secondary-light": {
      checkboxColor: "white",
    },
    "secondary-dark": {
      checkboxColor: "black",
    },
    danger: {
      checkboxColor: "white",
    },
    primary: {
      checkboxColor: "black",
    },
  } as const;

  return map[variant || "secondary-light"];
}
