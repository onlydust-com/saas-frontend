import { ReactNode } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { RadioGroup } from "@/design-system/atoms/radio-group";
import { CustomButtonProps, RadioGroupButtonPort } from "@/design-system/molecules/radio-button-group";

export function CustomButton({ label, children, variant = "secondary-light", ...props }: CustomButtonProps): ReactNode {
  return (
    <Button as={"div"} variant={variant} {...props} startContent={children}>
      {label}
    </Button>
  );
}
export function RadioButtonGroupDefaultAdapter<V extends string>({
  items,
  variant,
  size,
  isDisabled,
  ...props
}: RadioGroupButtonPort<V>) {
  return (
    <RadioGroup
      {...props}
      isDisabled={isDisabled}
      as={CustomButton}
      items={items.map(({ label, ...item }) => ({
        ...item,
        componentProps: { label, variant, size, isDisabled },
      }))}
    />
  );
}
