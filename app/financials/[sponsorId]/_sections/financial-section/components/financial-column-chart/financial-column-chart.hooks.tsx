import { useCallback, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { GetSponsorTransactionsStatsResponse } from "@/core/domain/sponsor/sponsor-contract.types";

import { Typo } from "@/design-system/atoms/typo";

export function useFinancialColumnChart(stats?: GetSponsorTransactionsStatsResponse["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof GetSponsorTransactionsStatsResponse["stats"][number]) => {
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

  const availableSeries = calculateSeries("totalAvailable");
  const allocatedSeries = calculateSeries("totalAllocated");
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");

  const renderAmount = useCallback(
    (amountSum: number) => {
      return (
        <div className="flex gap-1">
          <Typo size={"xs"} color={"primary"}>
            {moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") }).amount}
          </Typo>
          <Typo size={"xs"} color={"primary"}>
            {moneyKernelPort.format({ amount: amountSum, currency: moneyKernelPort.getCurrency("USD") }).code}
          </Typo>
        </div>
      );
    },
    [moneyKernelPort]
  );
  const renderAvailableAmount = useMemo(
    () => renderAmount(availableSeries.reduce((a, c) => a + c, 0)),
    [availableSeries, renderAmount]
  );
  const renderAllocatedAmount = useMemo(
    () => renderAmount(allocatedSeries.reduce((a, c) => a + c, 0)),
    [allocatedSeries, renderAmount]
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
    availableSeries,
    allocatedSeries,
    grantedSeries,
    rewardedSeries,
    renderAvailableAmount,
    renderAllocatedAmount,
    renderGrantedAmount,
    renderRewardedAmount,
  };
}
