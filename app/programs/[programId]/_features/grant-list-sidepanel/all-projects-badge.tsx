import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

export function AllProjectsBadge() {
  const { data } = ProjectReactQueryAdapter.client.useGetProjects({
    options: {
      enabled: false,
    },
  });

  return useMemo(() => data?.pages[0].totalItemNumber ?? "-", [data]);
}
