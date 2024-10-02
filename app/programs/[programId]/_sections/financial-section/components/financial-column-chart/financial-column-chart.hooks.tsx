import { bootstrap } from "@/core/bootstrap";
import { GetBiStatsFinancialsResponse } from "@/core/domain/bi/bi-contract.types";

export function useFinancialColumnChart(stats?: GetBiStatsFinancialsResponse["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof GetBiStatsFinancialsResponse["stats"][number]) => {
    return (
      stats?.map(stat => {
        const value = stat[key];
        if (typeof value === "object" && value !== null && "totalUsdEquivalent" in value) {
          return Number(value.totalUsdEquivalent.toFixed(2));
        }
        return 0;
      }) ?? []
    );
  };

  const allocatedSeries = calculateSeries("totalAllocated");
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");

  return {
    categories,
    allocatedSeries,
    grantedSeries,
    rewardedSeries,
  };
}
