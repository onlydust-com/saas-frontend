import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ProjectStatsProps } from "./project-stats.types";

export function ProjectStats(_: ProjectStatsProps) {
  return (
    <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row gap-1">
          <Icon name={"ri-pie-chart-line"} />
          <Typo size={"xs"} weight={"medium"} translate={{ token: "programs:projectDetail.kpi.title" }} />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {[1, 2, 3].map(item => (
          <Paper key={item} size={"s"} container={"1"} classNames={{ base: "flex flex-col gap-2 flex-1" }}>
            <Typo size={"xxs"}>Active dev</Typo>
            <Typo size={"s"} weight={"medium"} color={"text-2"}>
              264
            </Typo>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}
