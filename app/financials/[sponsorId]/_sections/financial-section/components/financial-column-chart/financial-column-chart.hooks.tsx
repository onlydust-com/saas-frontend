import { useCallback, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { SponsorTransactionsStatsResponse } from "@/core/domain/sponsor/models/sponsor-transactions-stats-model";
import { GetSponsorTransactionsStatsModel } from "@/core/domain/sponsor/sponsor-contract.types";

import { Typo } from "@/design-system/atoms/typo";

export function useFinancialColumnChart(stats?: GetSponsorTransactionsStatsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.date), "MMMM yyyy")) ?? [];

  const calculateSeries = (key: keyof SponsorTransactionsStatsResponse) => {
    return stats?.map(stat => stat?.getStatTotalUsdEquivalent(key)) ?? [];
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
