import { ProjectCategories } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-categories/project-categories";
import { ProjectDescription } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-description/project-description";
import { ProjectLanguages } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-languages/project-languages";
import { ProjectLeads } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-leads/project-leads";
import { ProjectLinks } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-links/project-links";
import { ProjectStats } from "@/app/programs/[programId]/_features/project-sidepanel/_components/project-stats/project-stats";
import { ProjectSidepanelProps } from "@/app/programs/[programId]/_features/project-sidepanel/project-sidepanel.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Avatar } from "@/design-system/atoms/avatar";
import { ButtonLoading } from "@/design-system/atoms/button/button.loading";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { UserGroup } from "@/shared/features/user/user-group/user-group";

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
  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId: projectId ?? "" },
    options: {
      enabled: !!projectId,
    },
  });

  if (!data) {
    return "loading";
  }

  return (
    <>
      <SidePanelHeader
        startContent={<ProjectHeader name={data?.name} loading={isLoading} logoUrl={data?.logoUrl} />}
        canGoBack={false}
        canClose={true}
      />
      <ProjectStats />
      <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-3" }}>
        <ProjectDescription description={data.shortDescription} />
        <ProjectLinks moreInfo={data.moreInfos} />
      </Paper>
      <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-row gap-4" }}>
        <ProjectLeads leaders={data.leaders} />
        <div className={"flex-1"}>
          <UserGroup users={data.topContributors} totalUsersCount={data.contributorCount} />
        </div>
      </Paper>
      <div className={"flex w-full flex-row gap-4"}>
        <ProjectLanguages languages={data.languages} />
        <ProjectCategories categories={data.categories} />
      </div>
    </>
  );
}
