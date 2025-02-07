"use client";

import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { NEXT_ROUTER } from "@/shared/constants/router";

import { SimilarProjectsProps } from "./similar-projects.types";

export function SimilarProjects({ projectIdOrSlug }: SimilarProjectsProps) {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetSimilarProjects({
    pathParams: {
      projectIdOrSlug,
    },
    queryParams: {
      pageSize: 3,
    },
    options: {
      enabled: Boolean(projectIdOrSlug),
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return <Skeleton className="h-[200px] w-full" background="glass" />;
    }

    if (isError) {
      return <ErrorState />;
    }

    return (
      <>
        {projects.map(project => (
          <AvatarLabelGroup
            key={project.id}
            as={BaseLink}
            htmlProps={{ href: NEXT_ROUTER.projects.details.root(project.slug) }}
            avatars={[
              {
                src: project.logoUrl,
              },
            ]}
            shape={"squared"}
            withPopover={false}
            title={{ children: project.name }}
            description={{ children: project.shortDescription }}
            size="md"
            truncate
          />
        ))}
      </>
    );
  }, [isLoading, isError, projects]);

  if (!projects.length) {
    return null;
  }

  return (
    <Paper size="none" background="primary" border="secondary">
      <div className="flex flex-col divide-y divide-border-primary">
        <div className="p-xl">
          <Typo
            size="xs"
            variant="heading"
            color="primary"
            translate={{ token: "project:details.similarProjects.title" }}
          />
        </div>
        <div className="flex flex-col gap-xl p-xl">{renderProjects}</div>
      </div>
    </Paper>
  );
}
