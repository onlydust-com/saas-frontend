import { bootstrap } from "@/core/bootstrap";
import { GetBiStatsFinancialsModel } from "@/core/domain/bi/bi-contract.types";
import { BiStatsFinancialsResponse } from "@/core/domain/bi/models/bi-stats-financials-model";

export function useFinancialColumnChart(stats?: GetBiStatsFinancialsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof BiStatsFinancialsResponse) => {
    return stats?.map(stat => stat?.getStatTotalUsdEquivalent(key)) ?? [];
  };

  const rewardedSeries = calculateSeries("totalRewarded");
  const paidSeries = calculateSeries("totalPaid");

  return {
    categories,
    rewardedSeries,
    paidSeries,
  };
}
