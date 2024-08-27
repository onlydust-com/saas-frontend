import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { FirstParameter } from "@/core/kernel/types";

export function AlreadyGrantedBadge({
  programId,
  queryParams,
}: {
  programId: string;
  queryParams: FirstParameter<typeof ProgramReactQueryAdapter.client.useGetProgramProjects>["queryParams"];
}) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramProjects({
    pathParams: {
      programId,
    },
    queryParams,
  });

  return useMemo(() => data?.pages[0].totalItemNumber ?? "-", [data]);
}
