import { ProjectOverview } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-overview/project-overview";
import { ProjectStats } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-stats/project-stats";
import { ProjectSidepanelProps } from "@/app/programs/[programId]/_features/project-sidepanel/project-sidepanel.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Avatar } from "@/design-system/atoms/avatar";
import { ButtonLoading } from "@/design-system/atoms/button/button.loading";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function ProjectSidepanel({ projectId }: ProjectSidepanelProps) {
  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId: projectId ?? "" },
    options: {
      enabled: !!projectId,
    },
  });

  return (
    <>
      <SidePanelHeader
        startContent={
          !isLoading ? (
            <Button
              variant={"secondary-light"}
              startContent={<Avatar shape={"square"} src={data?.logoUrl} alt={data?.name} />}
              endContent={<Icon name={"ri-external-link-line"} />}
              size={"l"}
            >
              {data?.name}
            </Button>
          ) : (
            <ButtonLoading size={"l"} />
          )
        }
        canGoBack={false}
        canClose={true}
      />
      <ProjectStats />
      <ProjectOverview
        description={data?.shortDescription}
        moreInfo={data?.moreInfos || []}
        languages={data?.languages || []}
        categories={data?.categories || []}
      />
    </>
  );
}
