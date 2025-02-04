import { cn } from "@/shared/utils";

import { TTypography } from "./typography.types";
import { getDefaultComponent } from "./typography.utils";
import { typographyVariants } from "./typography.variants";

export function Typography({ variant, className, as, children }: TTypography.Props) {
  const Component = as || getDefaultComponent(variant);

  return <Component className={cn(typographyVariants({ variant }), className)}>{children}</Component>;
}
