import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

export function AlreadyGrantedBadge({ programId }: { programId: string }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramProjects({
    pathParams: {
      programId,
    },
    options: {
      enabled: false,
    },
  });

  return useMemo(() => data?.pages[0].totalItemNumber ?? "-", [data]);
}
