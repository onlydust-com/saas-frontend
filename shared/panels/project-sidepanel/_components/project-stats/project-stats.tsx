import { Calendar } from "lucide-react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Dropdown } from "@/design-system/atoms/dropdown";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectStatsProps } from "./project-stats.types";

export function ProjectStats({ data, rangeType, onChangeRangeType }: ProjectStatsProps) {
  const map = [
    {
      key: "activeContributorCount",
      title: <Translate token={"panels:projectDetail.kpi.activeDev.title"} />,
      value: data.activeContributorCount,
    },
    {
      key: "mergedPrCount",
      title: <Translate token={"panels:projectDetail.kpi.prMerged.title"} />,
      value: data.mergedPrCount,
    },
    {
      key: "rewardCount",
      title: <Translate token={"panels:projectDetail.kpi.rewards.title"} />,
      value: data.rewardCount,
    },
  ];

  function onChangeRange(value: string[]) {
    onChangeRangeType(value[0] as DateRangeType);
  }

  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.kpi.title" }} />

        <Dropdown
          selectedKeys={[rangeType]}
          onChange={onChangeRange}
          items={[
            { label: <Translate token={"common:dateRangeType.LAST_WEEK"} />, value: DateRangeType.LAST_WEEK },
            { label: <Translate token={"common:dateRangeType.LAST_MONTH"} />, value: DateRangeType.LAST_MONTH },
            { label: <Translate token={"common:dateRangeType.LAST_SEMESTER"} />, value: DateRangeType.LAST_SEMESTER },
            { label: <Translate token={"common:dateRangeType.LAST_YEAR"} />, value: DateRangeType.LAST_YEAR },
            { label: <Translate token={"common:dateRangeType.ALL_TIME"} />, value: DateRangeType.ALL_TIME },
          ]}
        >
          {({ label }) => (
            <Button size={"xs"} variant={"secondary"} startIcon={{ component: Calendar }}>
              {label || <Translate token={"common:dateRangeType.LAST_WEEK"} />}
            </Button>
          )}
        </Dropdown>
      </div>
      <div className="flex flex-row gap-2">
        {map.map(({ key, title, value }) => (
          <Paper
            key={key}
            size={"md"}
            background={"primary"}
            border={"primary"}
            classNames={{ base: "flex flex-col gap-md flex-1" }}
          >
            <Typo size={"xs"} color={"secondary"}>
              {title}
            </Typo>
            <Typo variant={"heading"} size={"xs"} color={"secondary"}>
              {value}
            </Typo>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}
