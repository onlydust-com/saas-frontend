import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { KpiCardProps } from "./kpi-card.types";

export function KpiCard({ children, headerContent }: KpiCardProps) {
  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <Typo size={"sm"} weight={"medium"} translate={{ token: "components:kpi.card.title" }} />

        {headerContent}
      </div>

      <div className="grid grid-cols-3 gap-md">{children}</div>
    </Paper>
  );
}
