import { PropsWithChildren } from "react";

import { Paper } from "@/design-system/atoms/paper";

export function SidePanelFooter({ children }: PropsWithChildren) {
  return (
    <Paper
      as={"footer"}
      py={"lg"}
      classNames={{
        base: "relative flex items-center justify-end rounded-none border-t border-t-border-primary border-solid",
      }}
    >
      {children}
    </Paper>
  );
}
