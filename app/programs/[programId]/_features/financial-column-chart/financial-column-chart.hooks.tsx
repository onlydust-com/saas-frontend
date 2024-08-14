import { useCallback, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { GetProgramTransactionsStatsResponse } from "@/core/domain/program/program-contract.types";

import { Typo } from "@/design-system/atoms/typo";

export function useFinancialColumnChart(stats?: GetProgramTransactionsStatsResponse["stats"]) {
  const { format: formatDate } = bootstrap.getDateKernelPort();
  const { format, getCurrency } = bootstrap.getMoneyKernelPort();

  const categories = stats?.map(stat => formatDate(new Date(stat.date), "MMMM yyyy")) ?? [];

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

  const receivedSeries = calculateSeries("totalAvailable");
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");

  const renderAmount = useCallback(
    (amountSum: number) => {
      return (
        <div className="flex gap-1">
          <Typo size={"xs"} color={"text-1"}>
            {format({ amount: amountSum, currency: getCurrency("USD") }).amount}
          </Typo>
          <Typo size={"xs"} color={"text-2"}>
            {format({ amount: amountSum, currency: getCurrency("USD") }).code}
          </Typo>
        </div>
      );
    },
    [format, getCurrency]
  );

  const renderReceivedAmount = useMemo(
    () => renderAmount(receivedSeries.reduce((a, c) => a + c, 0)),
    [receivedSeries, renderAmount]
  );
  const renderGrantedAmount = useMemo(
    () => renderAmount(grantedSeries.reduce((a, c) => a + c, 0)),
    [grantedSeries, renderAmount]
  );
  const renderRewardedAmount = useMemo(
    () => renderAmount(rewardedSeries.reduce((a, c) => a + c, 0)),
    [rewardedSeries, renderAmount]
  );

  return {
    categories,
    receivedSeries,
    grantedSeries,
    rewardedSeries,
    renderReceivedAmount,
    renderGrantedAmount,
    renderRewardedAmount,
  };
}
