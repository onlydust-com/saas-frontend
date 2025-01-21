import { useMemo } from "react";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";
import { cn } from "@/shared/helpers/cn";

import { PageWrapperProps } from "./page-wrapper.types";

export function PageWrapper({ children, containerSize, shouldScroll = false }: PageWrapperProps) {
  const maxWidth = useMemo(() => {
    if (containerSize === "large") return "max-w-[2200px] px-[24px]";
    if (containerSize === "medium") return "max-w-[1600px] px-[24px]";
    if (containerSize === "small") return "max-w-[1360px] px-[24px]";

    return "max-w-[1600px] px-[24px]";
  }, [containerSize]);

  if (!shouldScroll) {
    return (
      <SidePanelsProvider>
        <div className={cn("mx-auto size-full overflow-hidden")}>
          <div className={cn("mx-auto flex size-full flex-col gap-md overflow-hidden py-xl", maxWidth)}>{children}</div>
        </div>
      </SidePanelsProvider>
    );
  }

  return (
    <SidePanelsProvider>
      <ScrollView className={cn("mx-auto size-full")}>
        <div className={cn("mx-auto flex w-full flex-col gap-md py-xl", maxWidth)}>{children}</div>
      </ScrollView>
    </SidePanelsProvider>
  );
}
