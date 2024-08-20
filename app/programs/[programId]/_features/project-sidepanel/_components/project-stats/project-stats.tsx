import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectStatsProps } from "./project-stats.types";

export function ProjectStats({ data }: ProjectStatsProps) {
  const map = [
    {
      key: "activeContributorCount",
      title: <Translate token={"programs:projectDetail.kpi.activeDev.title"} />,
      value: data.activeContributorCount,
    },
    {
      key: "mergedPrCount",
      title: <Translate token={"programs:projectDetail.kpi.prMerged.title"} />,
      value: data.mergedPrCount,
    },
    {
      key: "rewardCount",
      title: <Translate token={"programs:projectDetail.kpi.rewards.title"} />,
      value: data.rewardCount,
    },
  ];

  return (
    <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row gap-1">
          <Icon name={"ri-pie-chart-line"} />
          <Typo size={"xs"} weight={"medium"} translate={{ token: "programs:projectDetail.kpi.title" }} />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {map.map(({ key, title, value }) => (
          <Paper key={key} size={"s"} container={"1"} classNames={{ base: "flex flex-col gap-2 flex-1" }}>
            <Typo size={"xxs"}>{title}</Typo>
            <Typo size={"s"} weight={"medium"} color={"text-2"}>
              {value}
            </Typo>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}
