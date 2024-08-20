import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { FirstParameter } from "@/core/kernel/types";

export function AllProjectsBadge({
  queryParams,
}: {
  queryParams: FirstParameter<typeof ProjectReactQueryAdapter.client.useGetProjects>["queryParams"];
}) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjects({
    queryParams,
    options: {
      enabled: false,
    },
  });

  return useMemo(() => data?.pages[0].totalItemNumber ?? "-", [data]);
}
