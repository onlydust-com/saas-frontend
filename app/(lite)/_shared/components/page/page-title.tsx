import { PropsWithChildren } from "react";

import { TypographyH3 } from "@/shared/ui/typography";

export function PageTitle({ children }: PropsWithChildren) {
  return <TypographyH3>{children}</TypographyH3>;
}
