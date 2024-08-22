import { SquareArrowOutUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProjectCategories } from "./_components/project-categories/project-categories";
import { ProjectContributors } from "./_components/project-contributors/project-contributors";
import { ProjectDescription } from "./_components/project-description/project-description";
import { ProjectFinancial } from "./_components/project-financial/project-financial";
import { ProjectLanguages } from "./_components/project-languages/project-languages";
import { ProjectLeads } from "./_components/project-leads/project-leads";
import { ProjectLinks } from "./_components/project-links/project-links";
import { ProjectSponsors } from "./_components/project-sponsors/project-sponsors";
import { ProjectStats } from "./_components/project-stats/project-stats";
import { ProjectSidepanelProps } from "./project-sidepanel.types";

export function ProjectSidepanel({ projectId, onGrantClick }: ProjectSidepanelProps) {
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

  if (isLoading || loadingStats || !data) {
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
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          project_id: projectId,
          type: "panel_sponsor",
        }}
        paramsReady={Boolean(projectId && data)}
      />
      <SidePanelHeader
        startContent={
          <Button
            variant={"secondary-light"}
            startContent={<Avatar shape={"square"} size={"xs"} src={data.logoUrl} alt={data.name} />}
            endContent={<SquareArrowOutUpRight size={16} />}
            size={"l"}
            as={"a"}
            htmlProps={{
              href: marketplaceRouting(`/p/${data.slug}`),
              target: "_blank",
            }}
          >
            {data.name}
          </Button>
        }
        canGoBack={false}
        canClose={true}
      />
      <ScrollView>
        <div className={"flex w-full flex-col gap-3"}>
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
        </div>
      </ScrollView>
      {onGrantClick && (
        <SidePanelFooter>
          <div className={"flex w-full flex-row items-center justify-between gap-1"}>
            <Button size={"l"} onClick={() => onGrantClick(data.id)}>
              <Translate token={"panels:projectDetail.grant"} />
            </Button>
            <Button
              variant={"secondary-light"}
              endContent={<SquareArrowOutUpRight size={16} />}
              size={"l"}
              as={"a"}
              htmlProps={{
                href: marketplaceRouting(`/p/${data.slug}`),
                target: "_blank",
              }}
            >
              <Translate token={"panels:projectDetail.seeProject"} />
            </Button>
          </div>
        </SidePanelFooter>
      )}
    </>
  );
}
