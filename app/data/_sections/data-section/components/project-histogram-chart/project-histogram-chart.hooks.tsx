import { useCallback, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiProjectsStatsResponse } from "@/core/domain/bi/models/bi-projects-stats-model";

import { Typo } from "@/design-system/atoms/typo";

export function useProjectHistogramChart(stats?: GetBiProjectsStatsModel["stats"]) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const categories = stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "MMMM yyyy")) ?? [];

  function calculateSeries(key: keyof Omit<BiProjectsStatsResponse, "timestamp">) {
    return stats?.map(stat => stat[key]) ?? [];
  }

  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");
  const mergedPrSeries = calculateSeries("mergedPrCount");
  const newProjectSeries = calculateSeries("newProjectCount");
  const activeProjectSeries = calculateSeries("activeProjectCount");
  const reactivatedProjectSeries = calculateSeries("reactivatedProjectCount");
  const churnedProjectSeries = calculateSeries("churnedProjectCount");

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

  const renderDevsCount = useCallback((countSum: number) => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"primary"}>
          {countSum}
        </Typo>
        <Typo size={"xs"} color={"primary"} translate={{ token: "data:contributorsHistogram.legends.devs" }} />
      </div>
    );
  }, []);

  const renderPrCount = useCallback((countSum: number) => {
    return (
      <div className="flex gap-1">
        <Typo size={"xs"} color={"primary"}>
          {countSum}
        </Typo>
        <Typo size={"xs"} color={"primary"} translate={{ token: "data:contributorsHistogram.legends.pr" }} />
      </div>
    );
  }, []);

  const renderGrantedAmount = useMemo(
    () => renderAmount(grantedSeries.reduce((a, c) => a + c, 0)),
    [grantedSeries, renderAmount]
  );
  const renderRewardedAmount = useMemo(
    () => renderAmount(rewardedSeries.reduce((a, c) => a + c, 0)),
    [rewardedSeries, renderAmount]
  );
  const renderMergedPrCount = useMemo(
    () => renderPrCount(mergedPrSeries.reduce((a, c) => a + c, 0)),
    [mergedPrSeries, renderPrCount]
  );
  const renderNewContributorCount = useMemo(
    () => renderDevsCount(newProjectSeries.reduce((a, c) => a + c, 0)),
    [newProjectSeries, renderDevsCount]
  );
  const renderActiveProjectCount = useMemo(
    () => renderDevsCount(activeProjectSeries.reduce((a, c) => a + c, 0)),
    [activeProjectSeries, renderDevsCount]
  );
  const renderReactivatedProjectCount = useMemo(
    () => renderDevsCount(reactivatedProjectSeries.reduce((a, c) => a + c, 0)),
    [reactivatedProjectSeries, renderDevsCount]
  );
  const renderChurnedProjectCount = useMemo(
    () => renderDevsCount(churnedProjectSeries.reduce((a, c) => a + c, 0)),
    [churnedProjectSeries, renderDevsCount]
  );

  return {
    categories,
    grantedSeries,
    rewardedSeries,
    mergedPrSeries,
    newProjectSeries,
    activeProjectSeries,
    reactivatedProjectSeries,
    churnedProjectSeries,
    renderGrantedAmount,
    renderRewardedAmount,
    renderMergedPrCount,
    renderNewContributorCount,
    renderActiveProjectCount,
    renderReactivatedProjectCount,
    renderChurnedProjectCount,
  };
}
