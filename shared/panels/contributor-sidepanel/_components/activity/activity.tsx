import { useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { ActivityGraph } from "@/shared/features/contributors/activity-graph/activity-graph";
import { DataSourceSelect } from "@/shared/panels/contributor-sidepanel/_components/data-source-select/data-source-select";
import { DateSourceSelect } from "@/shared/panels/contributor-sidepanel/_components/data-source-select/data-source-select.types";

import { ActivityProps } from "./activity.types";

export function Activity({ user }: ActivityProps) {
  const [filters, setFilters] = useState<{ dataSource: DateSourceSelect; dataSourceProjectId?: string[] }>({
    dataSource: DateSourceSelect.ALL,
  });
  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorActivityById({
    pathParams: { contributorId: user.contributor.githubUserId },
    queryParams: {
      ...filters,
      // TODO CONVERT TO ARRAY
      dataSourceProjectId: filters?.dataSourceProjectId?.[0],
    },
    options: {
      enabled: !!user.contributor.githubUserId,
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <div className={"flex w-full flex-row items-center justify-between gap-1"}>
        <Typo
          size={"sm"}
          weight={"medium"}
          translate={{ token: "panels:contributor.activity.title", values: { number: data?.totalCount || 0 } }}
        />
        <DataSourceSelect
          user={user}
          name="timeline-data-source"
          selectedProjects={filters.dataSourceProjectId}
          selectedSource={filters.dataSource as DateSourceSelect | undefined}
          isMultiple={true}
          disabledAutoOrdering={true}
          onSelect={(projectsIds, source) =>
            setFilters({
              dataSourceProjectId: projectsIds,
              dataSource: source ?? DateSourceSelect.ALL,
            })
          }
        />
      </div>
      <ActivityGraph data={data?.days} />
    </Paper>
  );
}
