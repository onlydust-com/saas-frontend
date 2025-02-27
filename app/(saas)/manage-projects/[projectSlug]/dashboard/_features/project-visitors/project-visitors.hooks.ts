import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectVisitorsModel } from "@/core/domain/bi/bi-contract.types";

export function useProjectVisitors(stats?: GetBiProjectVisitorsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "MMMM yyyy")) ?? [];

  const visitorCountSeries = stats?.map(stat => stat.visitorCount) ?? [];

  return {
    categories,
    visitorCountSeries,
  };
}
