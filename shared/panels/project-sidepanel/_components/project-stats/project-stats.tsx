import { Calendar } from "lucide-react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";

import { KpiBlock } from "@/shared/components/kpi/kpi-block/kpi-block";
import { KpiCard } from "@/shared/components/kpi/kpi-card/kpi-card";
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
    <KpiCard
      headerContent={
        <Menu items={rangeMenu} selectedIds={[rangeType]} onAction={onChangeRange} isPopOver placement={"bottom-end"}>
          <Button size={"xs"} variant={"secondary"} startIcon={{ component: Calendar }}>
            <Translate token={`common:dateRangeType.${rangeType}`} />
          </Button>
        </Menu>
      }
    >
      {map.map(kpi => (
        <KpiBlock key={kpi.key} title={kpi.title} value={kpi.value} />
      ))}
    </KpiCard>
  );
}
