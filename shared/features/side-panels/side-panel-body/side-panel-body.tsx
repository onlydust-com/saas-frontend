import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

export function SidePanelBody({ children }: PropsWithChildren) {
  return (
    <Paper as={ScrollView} size={"lg"} classNames={{ base: "flex flex-1 w-full flex-col gap-3 rounded-none h-full" }}>
      {children}
    </Paper>
  );
}
