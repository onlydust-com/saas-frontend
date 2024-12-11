import { ThemedButtonProps } from "@/app/explore/_features/project-banner/_components/themed-button/themed-button.types";
import { ThemedButtonVariants } from "@/app/explore/_features/project-banner/_components/themed-button/themed-button.variants";

import { Button } from "@/design-system/atoms/button/variants/button-default";

export function ThemedButton({ bannerTheme, ...buttonProps }: ThemedButtonProps) {
  const { base } = ThemedButtonVariants({ bannerTheme, variant: buttonProps.variant });

  return (
    <Button
      {...buttonProps}
      classNames={{
        base: base(),
      }}
    />
  );
}
