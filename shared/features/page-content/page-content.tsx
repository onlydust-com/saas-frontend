import { useLayoutEffect } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { PageContentProps } from "@/shared/features/page-content/page-content.types";
import { cn } from "@/shared/utils";

export function PageContent({ children, classNames }: PageContentProps) {
  // This is a hack to remove the padding-bottom from the PageContainer when the page content is rendered to leave space for Intercom
  useLayoutEffect(() => {
    document.querySelector(".page-container")?.classList.remove("pb-20");

    return () => {
      document.querySelector(".page-container")?.classList.add("pb-20");
    };
  }, []);

  return (
    <Paper as={"section"} px="none" classNames={{ base: cn("flex-1 pb-20", classNames?.base) }}>
      {children}
    </Paper>
  );
}
