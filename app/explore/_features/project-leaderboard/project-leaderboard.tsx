"use client";

import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle, AvatarLabelSingleLoading } from "@/design-system/molecules/avatar-label-single";

import { ErrorState } from "@/shared/components/error-state/error-state";

export function ProjectLeaderboard() {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 6,
    },
  });

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => <AvatarLabelSingleLoading key={index} size="md" />);
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!data) {
      return null;
    }

    return data.pages.flatMap(({ projects }) =>
      projects.map(project => (
        <AvatarLabelSingle
          key={project.id}
          size="md"
          image={project.}
          title={project.name}
          subtitle={project.shortDescription}
        />
      ))
    );
  }, [data, isError, isLoading]);

  return (
    <Paper background="primary-alt" px="xl" py="xl">
      <div className="flex flex-col gap-md">
        <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:leaderboard.title" }} />
        <Typo color="secondary" size="xs" translate={{ token: "explore:leaderboard.description" }} />
      </div>
      <div className="mt-xl flex flex-col gap-md">{renderProjects()}</div>
    </Paper>
  );
}
