import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

export function useCanReward(projectSlug: string) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsBySlug({
    pathParams: { projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  return (data?.totalAvailable.totalUsdEquivalent ?? 0) > 0;
}
