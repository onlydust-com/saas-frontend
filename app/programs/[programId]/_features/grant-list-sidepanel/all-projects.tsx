import { useMemo } from "react";

import {
  GrantProject,
  useGrantFormContext,
} from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { FirstParameter } from "@/core/kernel/types";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ShowMore } from "@/shared/components/show-more/show-more";

export function AllProjects({
  queryParams,
}: {
  queryParams: FirstParameter<typeof ProjectReactQueryAdapter.client.useGetProjects>["queryParams"];
}) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjects({
      queryParams,
    });
  const allProjects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const {
    sidePanel: { open: openGrantForm },
    projectState: [, setGrantProject],
  } = useGrantFormContext();

  function handleOpenProjectGrant(project: GrantProject) {
    setGrantProject(project);
    openGrantForm();
  }

  if (isLoading) {
    return (
      <div className={"grid gap-2"}>
        <Skeleton classNames={{ base: "h-24" }} />
        <Skeleton classNames={{ base: "h-24" }} />
        <Skeleton classNames={{ base: "h-24" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={"py-16 text-center"}>
        <Typo translate={{ token: "common:state.error.title" }} color={"text-2"} size={"s"} />
      </div>
    );
  }

  return (
    <div className={"grid gap-2"}>
      {allProjects.map(project => {
        const description = project.truncateDescription(25);

        return (
          <CardProject
            key={project.id}
            title={project.name}
            description={description}
            logoUrl={project.logoUrl}
            languages={project.languages?.map(language => ({ children: language.name }))}
            buttonProps={{
              children: "0 USD",
              classNames: {
                base: "pointer-events-none whitespace-nowrap",
              },
            }}
            onClick={() =>
              handleOpenProjectGrant({
                id: project.id,
                name: project.name,
                logoUrl: project.logoUrl,
                description,
                totalAvailable: {
                  totalUsdEquivalent: 0,
                },
              })
            }
          />
        );
      })}

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}
