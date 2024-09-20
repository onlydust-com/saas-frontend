import { bootstrap } from "@/core/bootstrap";
import { GetProgramTransactionsStatsResponse } from "@/core/domain/program/program-contract.types";

export function useFinancialColumnChart(stats?: GetProgramTransactionsStatsResponse["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof GetProgramTransactionsStatsResponse["stats"][number]) => {
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

  const receivedSeries = calculateSeries("totalReceived");
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");

  return {
    categories,
    receivedSeries,
    grantedSeries,
    rewardedSeries,
  };
}
