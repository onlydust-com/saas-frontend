import { useMemo, useState } from "react";

import { ProjectCategories } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-categories/project-categories";
import { ProjectContributors } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-contributors/project-contributors";
import { ProjectDescription } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-description/project-description";
import { ProjectFinancial } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-financial/project-financial";
import { ProjectLanguages } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-languages/project-languages";
import { ProjectLeads } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-leads/project-leads";
import { ProjectLinks } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-links/project-links";
import { ProjectSponsors } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-sponsors/project-sponsors";
import { ProjectStats } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-stats/project-stats";
import { ProjectSidepanelProps } from "@/app/programs/[programId]/_features/project-sidepanel/project-sidepanel.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Avatar } from "@/design-system/atoms/avatar";
import { ButtonLoading } from "@/design-system/atoms/button/button.loading";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

function ProjectHeader({ logoUrl, name, loading }: { logoUrl?: string; name?: string; loading: boolean }) {
  if (loading) {
    return <ButtonLoading size={"l"} />;
  }
  return (
    <Button
      variant={"secondary-light"}
      startContent={<Avatar shape={"square"} src={logoUrl} alt={name} />}
      endContent={<Icon name={"ri-external-link-line"} />}
      size={"l"}
    >
      {name}
    </Button>
  );
}
export function ProjectSidepanel({ projectId }: ProjectSidepanelProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const [rangeType, setRangeType] = useState<DateRangeType>(DateRangeType.LAST_WEEK);

  const { fromDate, toDate } = useMemo(() => {
    const { from, to } = dateKernelPort.getRangeOfDates(rangeType);

    return {
      fromDate: from ? dateKernelPort.format(from, "yyyy-MM-dd") : undefined,
      toDate: to ? dateKernelPort.format(to, "yyyy-MM-dd") : undefined,
    };
  }, [rangeType, dateKernelPort]);

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId: projectId ?? "" },
    options: {
      enabled: !!projectId,
    },
  });

  const { data: stats, isLoading: loadingStats } = ProjectReactQueryAdapter.client.useGetProjectStats({
    pathParams: { projectId: projectId ?? "" },
    queryParams: {
      fromDate,
      toDate,
    },
    options: {
      enabled: !!projectId,
    },
  });

  function onChangeRangeType(type: DateRangeType) {
    setRangeType(type);
  }

  if (!data) {
    return "loading";
  }

  return (
    <>
      <SidePanelHeader
        startContent={<ProjectHeader name={data?.name} loading={isLoading || loadingStats} logoUrl={data?.logoUrl} />}
        canGoBack={false}
        canClose={true}
      />
      {!!stats && (
        <>
          <ProjectStats data={stats} rangeType={rangeType} onChangeRangeType={onChangeRangeType} />
          <ProjectFinancial data={stats} />
        </>
      )}
      <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-3" }}>
        <ProjectDescription description={data.shortDescription} />
        <ProjectLinks moreInfo={data.moreInfos} />
      </Paper>
      <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-row gap-2" }}>
        <ProjectLeads leaders={data.leaders} />
        <ProjectContributors topContributors={data.topContributors} contributorCount={data?.contributorCount} />
        <ProjectSponsors sponsors={data.sponsors} />
      </Paper>
      <div className={"flex w-full flex-row gap-4"}>
        <ProjectLanguages languages={data.languages} />
        <ProjectCategories categories={data.categories} />
      </div>
    </>
  );
}
