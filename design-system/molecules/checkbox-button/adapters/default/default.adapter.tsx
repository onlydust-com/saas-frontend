import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";

import { CheckboxButtonPort } from "../../checkbox-button.types";

export function CheckboxButtonDefaultAdapter({
  variant = "secondary",
  size,
  children,
  isDisabled,
  ...props
}: CheckboxButtonPort) {
  return (
    <Button
      as={"label"}
      isDisabled={isDisabled}
      variant={variant}
      size={size}
      startContent={<Checkbox isDisabled={isDisabled} {...props} />}
    >
      {children}
    </Button>
  );
}
