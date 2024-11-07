import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

export function useCanReward(projectSlug: string) {
  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsBySlug({
    pathParams: { projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  if (isLoading) return false;

  if (data?.totalAvailable.totalUsdEquivalent === 0) return false;

  return true;
}
