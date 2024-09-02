import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

export function SidePanelBody({ children }: PropsWithChildren) {
  return (
    <ScrollView className={"h-full flex-1"}>
      <Paper as={"div"} size={"lg"} classNames={{ base: "flex w-full flex-col gap-3 rounded-none h-full" }}>
        {children}
      </Paper>
    </ScrollView>
  );
}
