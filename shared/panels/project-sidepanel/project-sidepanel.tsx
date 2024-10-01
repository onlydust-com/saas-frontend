import { SquareArrowOutUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { ProjectPrograms } from "@/shared/panels/project-sidepanel/_components/project-programs/project-programs";
import { useProjectSidePanel } from "@/shared/panels/project-sidepanel/project-sidepanel.hooks";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectCategories } from "./_components/project-categories/project-categories";
import { ProjectContributors } from "./_components/project-contributors/project-contributors";
import { ProjectDescription } from "./_components/project-description/project-description";
import { ProjectFinancial } from "./_components/project-financial/project-financial";
import { ProjectLanguages } from "./_components/project-languages/project-languages";
import { ProjectLeads } from "./_components/project-leads/project-leads";
import { ProjectStats } from "./_components/project-stats/project-stats";
import { ProjectSidePanelData } from "./project-sidepanel.types";

export function ProjectSidepanel() {
  const { name } = useProjectSidePanel();
  const { Panel } = useSidePanel({ name });
  const {
    projectId,
    onGrantClick,
    canGoBack = false,
  } = useSinglePanelData<ProjectSidePanelData>(name) ?? { projectId: "" };
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

  const { data: financial, isLoading: loadingFinancial } = ProjectReactQueryAdapter.client.useGetProjectFinancial({
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

  const PanelContent = useMemo(() => {
    if (isLoading || !data) {
      return (
        <>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </>
      );
    }

    return (
      <>
        {!!stats && (
          <>
            <ProjectStats data={stats} rangeType={rangeType} onChangeRangeType={onChangeRangeType} />
            <ProjectFinancial projectId={projectId} />
          </>
        )}

        <ProjectDescription description={data.shortDescription} moreInfo={data.moreInfos} />

        {data.leaders.length && data.topContributors.length && data.programs ? (
          <Paper
            size={"lg"}
            background={"transparent"}
            border={"primary"}
            classNames={{ base: "flex flex-col gap-lg" }}
          >
            <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.information.title" }} />

            <div className="grid grid-cols-3 gap-md">
              <ProjectLeads leaders={data.leaders} />
              <ProjectContributors topContributors={data.topContributors} />
              <ProjectPrograms programs={data.programs} />
            </div>
          </Paper>
        ) : null}

        <ProjectLanguages languages={data.languages} />

        <ProjectCategories categories={data.categories} />
      </>
    );
  }, [isLoading, loadingStats, loadingFinancial, data, stats, financial, rangeType]);

  return (
    <Panel>
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          project_id: projectId,
          type: "panel_sponsor",
        }}
        paramsReady={Boolean(projectId && data)}
      />
      <SidePanelHeader
        title={{
          children: data?.name,
        }}
        canGoBack={canGoBack}
        canClose={true}
      />

      <SidePanelBody>{PanelContent}</SidePanelBody>

      {onGrantClick || !!data ? (
        <SidePanelFooter>
          <div className={"flex w-full flex-row items-center justify-between gap-1"}>
            {onGrantClick && data ? (
              <Button size={"md"} onClick={() => onGrantClick(data?.id)}>
                <Translate token={"panels:projectDetail.grant"} />
              </Button>
            ) : (
              <div />
            )}

            {data ? (
              <Button
                variant={"secondary"}
                endContent={<SquareArrowOutUpRight size={16} />}
                size={"md"}
                as={"a"}
                htmlProps={{
                  href: marketplaceRouting(`/p/${data?.slug}`),
                  target: "_blank",
                }}
              >
                <Translate token={"panels:projectDetail.seeProject"} />
              </Button>
            ) : null}
          </div>
        </SidePanelFooter>
      ) : null}
    </Panel>
  );
}
