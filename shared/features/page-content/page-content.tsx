import { useLayoutEffect } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { PageContentProps } from "@/shared/features/page-content/page-content.types";
import { cn } from "@/shared/helpers/cn";

export function PageContent({ children, classNames }: PageContentProps) {
  // This is a hack to remove the padding-bottom from the body when the page content is rendered to leave space for Intercom
  useLayoutEffect(() => {
    document.body.classList.remove("pb-16");

    return () => {
      document.body.classList.add("pb-16");
    };
  }, []);

  return (
    <Paper as={"section"} px="none" classNames={{ base: cn("flex-1 pb-20", classNames?.base) }}>
      {children}
    </Paper>
  );
}
