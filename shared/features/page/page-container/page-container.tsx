import { PropsWithChildren } from "react";

import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";

import { PageInner } from "../page-inner/page-inner";
import { PageInnerProps } from "../page-inner/page-inner.types";

export function PageContainer({
  children,
  size = "small",
  className,
}: PropsWithChildren<{ size?: PageInnerProps["size"]; className?: string }>) {
  return (
    <PageInner size={size} className={className} type="page">
      <SidePanelsProvider>{children}</SidePanelsProvider>
    </PageInner>
  );
}
