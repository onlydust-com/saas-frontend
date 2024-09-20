import { bootstrap } from "@/core/bootstrap";
import { SponsorTransactionsStatsResponse } from "@/core/domain/sponsor/models/sponsor-transactions-stats-model";
import { GetSponsorTransactionsStatsModel } from "@/core/domain/sponsor/sponsor-contract.types";

export function useFinancialColumnChart(stats?: GetSponsorTransactionsStatsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof SponsorTransactionsStatsResponse) => {
    return stats?.map(stat => stat?.getStatTotalUsdEquivalent(key)) ?? [];
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
