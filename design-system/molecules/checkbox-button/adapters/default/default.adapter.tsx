import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";

import { CheckboxButtonPort } from "../../checkbox-button.types";

export function CheckboxButtonDefaultAdapter({
  variant = "secondary",
  size,
  children,
  isDisabled,
  value,
  ...props
}: CheckboxButtonPort) {
  function onButtonClick() {
    if (props.onChange) {
      props.onChange(!value);
    }
  }
  return (
    <Button
      as={"button"}
      isDisabled={isDisabled}
      variant={variant}
      size={size}
      onClick={onButtonClick}
      startContent={
        <Checkbox
          isDisabled={isDisabled}
          {...props}
          {...(value ? { attr: { "data-focus": true } } : {})}
          value={value}
          classNames={{ base: "pointer-events-none" }}
        />
      }
    >
      {children}
    </Button>
  );
}
