import { Calendar, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";

import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useMapChartOptions } from "@/shared/components/charts/highcharts/map-chart/map-chart.hooks";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ProgramEcosystemPopover } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ActiveUsersChart() {
  const { t } = useTranslation();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const rangeMenu = useRangeSelectOptions();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_SEMESTER);
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiWorldMap({
    queryParams: {
      fromDate,
      toDate,
      kpi: "ACTIVE_CONTRIBUTORS",
      ...(selectedProgramAndEcosystem.length && { programOrEcosystemIds: selectedProgramAndEcosystem }),
    },
  });

  const { options } = useMapChartOptions({
    title: t("data:activeUsers.legends.contributors"),
    series: [
      {
        name: t("data:activeUsers.legends.contributors"),
        data: data?.map(item => item.getChartFormattedData(item)) ?? [],
      },
    ],
  });

  function onChangeRangeType(value: string) {
    if (dateKernelPort.isDateRangeType(value)) setRangeType(value as DateRangeType);
  }

  function onProgramEcosystemChange(ids: string[]) {
    setSelectedProgramAndEcosystem(ids);
  }

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: "w-full min-h-[300px]",
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        titleTranslate={{ token: "data:activeUsers.emptyState.title" }}
        descriptionTranslate={{ token: "data:activeUsers.emptyState.description" }}
      />
    );
  }

  return (
    <div className="flex min-h-[300px] flex-col gap-4">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <ProgramEcosystemPopover
            name={"programAndEcosystem"}
            placeholder={t("data:details.allDataFilter.placeholder")}
            onSelect={onProgramEcosystemChange}
            selectedProgramsEcosystems={selectedProgramAndEcosystem}
          />
          <Menu items={rangeMenu} selectedIds={[rangeType]} onAction={onChangeRangeType} isPopOver>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
            >
              <Translate token={`common:dateRangeType.${rangeType}`} />
            </Button>
          </Menu>
        </div>
      </div>

      <Paper size={"xs"} background={"secondary"}>
        <HighchartsDefault options={options} constructorType={"mapChart"} />
      </Paper>
    </div>
  );
}
