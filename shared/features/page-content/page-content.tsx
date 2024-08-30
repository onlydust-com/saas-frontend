import { Paper } from "@/design-system/atoms/paper";

import { PageContentProps } from "@/shared/features/page-content/page-content.types";
import { cn } from "@/shared/helpers/cn";

export function PageContent({ children, classNames }: PageContentProps) {
  return (
    <Paper as={"section"} classNames={{ base: cn("flex-1", classNames?.base) }}>
      {children}
    </Paper>
  );
}
