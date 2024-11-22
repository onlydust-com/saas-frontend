import { bootstrap } from "@/core/bootstrap";
import { GetBiStatsFinancialsModel } from "@/core/domain/bi/bi-contract.types";
import { BiStatsFinancialsResponse } from "@/core/domain/bi/models/bi-stats-financials-model";

export function useFinancialColumnChart(stats?: GetBiStatsFinancialsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMM")) ?? [];

  const calculateSeries = (key: keyof BiStatsFinancialsResponse) => {
    return stats?.map(stat => stat.getStatTotalUsdEquivalent(key)) ?? [];
  };

  const depositedSeries = calculateSeries("totalDeposited");
  const allocatedSeries = calculateSeries("totalAllocated");
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");

  return {
    categories,
    depositedSeries,
    allocatedSeries,
    grantedSeries,
    rewardedSeries,
  };
}
