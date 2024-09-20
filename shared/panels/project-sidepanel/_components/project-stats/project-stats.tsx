import { Calendar } from "lucide-react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectStatsProps } from "./project-stats.types";

export function ProjectStats({ data, rangeType, onChangeRangeType }: ProjectStatsProps) {
  const rangeMenu = useRangeSelectOptions();
  const map = [
    {
      key: "devsOnboarded",
      title: <Translate token={"panels:projectDetail.kpi.devsOnboarded.title"} />,
      value: data.onboardedContributorCount,
    },
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
  ];

  function onChangeRange(value: string) {
    onChangeRangeType(value as DateRangeType);
  }

  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.kpi.title" }} />

        <Menu items={rangeMenu} selectedIds={[rangeType]} onAction={onChangeRange} isPopOver placement={"bottom-end"}>
          <Button size={"xs"} variant={"secondary"} startIcon={{ component: Calendar }}>
            <Translate token={`common:dateRangeType.${rangeType}`} />
          </Button>
        </Menu>
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
