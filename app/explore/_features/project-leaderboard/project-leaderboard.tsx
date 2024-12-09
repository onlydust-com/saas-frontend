"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

export function ProjectLeaderboard() {
  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 6,
    },
  });

  return (
    <Paper background="primary-alt" px="xl" py="xl">
      <div className="flex flex-col gap-md">
        <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:leaderboard.title" }} />
        <Typo color="secondary" size="xs" translate={{ token: "explore:leaderboard.description" }} />
      </div>
      <div className="mt-xl">{/* Content will go here */}</div>
    </Paper>
  );
}
