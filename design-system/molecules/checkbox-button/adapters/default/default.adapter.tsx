import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { getComponentsVariants } from "@/design-system/molecules/checkbox-button/checkbox-button.utils";

import { CheckboxButtonPort } from "../../checkbox-button.types";

export function CheckboxButtonDefaultAdapter({ variant = "secondary", size, children, ...props }: CheckboxButtonPort) {
  const { checkboxColor } = getComponentsVariants(variant);
  return (
    <Button as={"label"} variant={variant} size={size} startContent={<Checkbox color={checkboxColor} {...props} />}>
      {children}
    </Button>
  );
}
