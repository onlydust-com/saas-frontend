import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ChartLegend } from "@/design-system/atoms/chart-legend";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { buildNodesAndDataForSankey } from "@/shared/charts/cashflow/cashflow.utils";
import { HighchartsDefault } from "@/shared/components/charts/highcharts/highcharts-default";
import { useSankeyChartOptions } from "@/shared/components/charts/highcharts/sankey-chart/sankey-chart.hooks";
import { useRangeSelectOptions } from "@/shared/hooks/select/use-range-select-options";
import { Translate } from "@/shared/translation/components/translate/translate";

const mockData = {
  sponsors: [
    { id: "sponsor_1", name: "Big Money Foundation", color: "#004080" },
    { id: "sponsor_2", name: "Tech Giants Foundation", color: "#0066CC" },
    { id: "sponsor_3", name: "Future Investments Group", color: "#003366" },
    { id: "sponsor_4", name: "Sustainable Ventures", color: "#00509E" },
  ],
  programs: [
    { id: "program_1", name: "Coca Cola Program", color: "#800080", sponsorId: "sponsor_1", funding: 70000 },
    { id: "program_2", name: "Optimism Program", color: "#9932CC", sponsorId: "sponsor_1", funding: 30000 },
    { id: "program_3", name: "Tech Innovation Program", color: "#8A2BE2", sponsorId: "sponsor_2", funding: 50000 },
    { id: "program_4", name: "Green Future Program", color: "#9370DB", sponsorId: "sponsor_2", funding: 40000 },
    { id: "program_5", name: "Clean Energy Program", color: "#663399", sponsorId: "sponsor_3", funding: 60000 },
    { id: "program_6", name: "Healthcare Reform Program", color: "#6A5ACD", sponsorId: "sponsor_4", funding: 45000 },
  ],
  projects: [
    { id: "project_1", name: "Onlydust Project", color: "#FF8C00", programId: "program_1", funding: 40000 },
    { id: "project_2", name: "Elmex Project", color: "#FFA500", programId: "program_1", funding: 30000 },
    { id: "project_3", name: "NextGen Tech", color: "#FFB347", programId: "program_2", funding: 20000 },
    { id: "project_4", name: "EcoHomes Initiative", color: "#FFD700", programId: "program_4", funding: 25000 },
    { id: "project_5", name: "Smart Agriculture", color: "#FF7F50", programId: "program_3", funding: 30000 },
    { id: "project_6", name: "SolarGrid Expansion", color: "#FF6347", programId: "program_5", funding: 50000 },
    { id: "project_7", name: "AI for Healthcare", color: "#FFA07A", programId: "program_6", funding: 35000 },
    { id: "project_8", name: "Carbon Capture Tech", color: "#FF4500", programId: "program_5", funding: 55000 },
    { id: "project_9", name: "Education for All", color: "#FF7F24", programId: "program_6", funding: 32000 },
  ],
  contributors: [
    { id: "contributor_1", name: "Pixelfact", projectId: "project_1", amount: 3500 },
    { id: "contributor_2", name: "Alexbeno", projectId: "project_1", amount: 5000 },
    { id: "contributor_3", name: "Ofux", projectId: "project_2", amount: 6000 },
    { id: "contributor_4", name: "Haydencleary", projectId: "project_2", amount: 5300 },
    { id: "contributor_5", name: "TechSavvy", projectId: "project_3", amount: 4500 },
    { id: "contributor_6", name: "GreenGeek", projectId: "project_4", amount: 4000 },
    { id: "contributor_7", name: "FutureFarmer", projectId: "project_5", amount: 8000 },
    { id: "contributor_8", name: "CodeWizard", projectId: "project_1", amount: 2500 },
    { id: "contributor_9", name: "EcoCoder", projectId: "project_4", amount: 5000 },
    { id: "contributor_10", name: "SustainableDev", projectId: "project_5", amount: 7000 },
    { id: "contributor_11", name: "SolarHero", projectId: "project_6", amount: 8500 },
    { id: "contributor_12", name: "AIEnthusiast", projectId: "project_7", amount: 4500 },
    { id: "contributor_13", name: "CarbonChamp", projectId: "project_8", amount: 9000 },
    { id: "contributor_14", name: "EdSupporter", projectId: "project_9", amount: 4000 },
    { id: "contributor_15", name: "GreenCoder", projectId: "project_6", amount: 7500 },
    { id: "contributor_16", name: "TechWhiz", projectId: "project_3", amount: 6500 },
    { id: "contributor_17", name: "FutureGuru", projectId: "project_9", amount: 7000 },
  ],
};

export function Cashflow() {
  const rangeMenu = useRangeSelectOptions();
  // const dateKernelPort = bootstrap.getDateKernelPort();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_YEAR);
  const [filteredData, setFilteredData] = useState(mockData);

  const { nodes, data } = buildNodesAndDataForSankey(filteredData);

  function handleOnChartAction(dataSourceId: string) {
    // TODO temp code to simulate data filtering, this will work as other charts with query params passed to API

    const filteredSponsors = mockData.sponsors.filter(sponsor => sponsor.id === dataSourceId);
    const filteredPrograms = mockData.programs.filter(program =>
      filteredSponsors.length > 0 ? program.sponsorId === dataSourceId : program.id === dataSourceId
    );
    const filteredProjects = mockData.projects.filter(project =>
      filteredPrograms.length > 0
        ? filteredPrograms.some(program => program.id === project.programId)
        : project.id === dataSourceId
    );
    const filteredContributors = mockData.contributors.filter(contributor =>
      filteredProjects.some(project => project.id === contributor.projectId)
    );

    setFilteredData({
      sponsors: filteredSponsors.length > 0 ? filteredSponsors : mockData.sponsors,
      programs: filteredPrograms,
      projects: filteredProjects,
      contributors: filteredContributors,
    });
  }

  function onChangeRangeType(value: string) {
    setRangeType(value as DateRangeType);
  }

  const { options } = useSankeyChartOptions({
    series: [{ nodes, data }],
    onAction: handleOnChartAction,
  });

  return (
    <Paper border={"primary"} classNames={{ base: "w-full" }}>
      <div className="flex flex-1 flex-col gap-lg">
        <div className="flex items-center justify-between gap-lg">
          <Typo
            weight={"medium"}
            size={"md"}
            color={"primary"}
            translate={{ token: "financials:details.financial.budgetInTime.title" }}
          />

          <Menu
            items={rangeMenu}
            selectedIds={[rangeType]}
            onAction={onChangeRangeType}
            isPopOver
            placement={"bottom-end"}
          >
            <Button
              variant={"secondary"}
              size={"sm"}
              startIcon={{ component: Calendar }}
              endIcon={{ component: ChevronDown }}
              translate={{ token: `common:dateRangeType.${rangeType}` }}
            />
          </Menu>
        </div>

        <HighchartsDefault options={options} />

        <div className={"flex items-center gap-xl"}>
          <ChartLegend color="areaspline-primary">
            <Translate token={"financials:details.financial.budgetInTime.legend.allocated"} />
          </ChartLegend>

          <ChartLegend color="areaspline-secondary">
            <Translate token={"financials:details.financial.budgetInTime.legend.granted"} />
          </ChartLegend>

          <ChartLegend color="areaspline-tertiary">
            <Translate token={"financials:details.financial.budgetInTime.legend.rewarded"} />
          </ChartLegend>
        </div>
      </div>
    </Paper>
  );
}
