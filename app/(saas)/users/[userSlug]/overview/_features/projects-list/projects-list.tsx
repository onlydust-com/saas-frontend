import { useMemo } from "react";

import { ContributorReactQueryAdapter } from "@/core/application/react-query-adapter/contributor";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { NEXT_ROUTER } from "@/shared/constants/router";

import { ProjectsListProps } from "./projects-list.types";

export function ProjectsList({ userId, userSlug }: ProjectsListProps) {
  const { data, isLoading, isError } = ContributorReactQueryAdapter.client.useGetContributorProjects({
    queryParams: {
      pageSize: 3,
    },
    pathParams: {
      contributorId: Number(userId),
    },
    options: {
      enabled: Boolean(userId),
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full p-lg">
          <EmptyStateLite />
        </div>
      );
    }

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        as={BaseLink}
        htmlProps={{
          href: NEXT_ROUTER.projects.details.root(project.slug),
        }}
        name={project.name}
        slug={project.slug}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        contributorsStats={project.contributorStats}
      />
    ));
  }, [isLoading, isError, projects]);

  return (
    <div className="flex w-full flex-row items-stretch justify-start gap-4 border-b-1 border-border-primary">
      <Accordion
        inline={true}
        defaultSelected={["activity"]}
        classNames={{ heading: "after:hidden", base: "p-4", content: "py-4" }}
        id={"activity"}
        titleProps={{
          size: "md",
          weight: "medium",
          children: "Projects list",
        }}
        endTitleContent={
          <Button
            as={BaseLink}
            htmlProps={{ href: NEXT_ROUTER.users.details.projects.root(userSlug) }}
            variant="secondary"
            size="xs"
          >
            See all
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{renderProjects}</div>
      </Accordion>
    </div>
  );
}
