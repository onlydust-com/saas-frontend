import { ComponentProps } from "react";

import { Skeleton } from "@/design-system/atoms/skeleton";

export function PaperLoading(props: ComponentProps<typeof Skeleton>) {
  return <Skeleton {...props} />;
}
