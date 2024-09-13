import { useMemo } from "react";

import { AmountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/amount-legend";
import { DevCountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/dev-count-legend";
import { PrCountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/pr-count-legend";

import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiContributorsStatsResponse } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

export function useContributorHistogramChart(
  stats?: GetBiContributorsStatsModel["stats"],
  timeGroupingType?: TimeGroupingType
) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const categories = useMemo(() => {
    if (timeGroupingType === TimeGroupingType.DAY || timeGroupingType === TimeGroupingType.WEEK) {
      return stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "dd.MM.yyyy")) ?? [];
    }

    if (timeGroupingType === TimeGroupingType.YEAR) {
      return stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "yyyy")) ?? [];
    }

    return stats?.map(stat => dateKernelPort.format(new Date(stat.timestamp), "MMMM yyyy")) ?? [];
  }, [stats, dateKernelPort, timeGroupingType]);

  function calculateSeries(key: keyof Omit<BiContributorsStatsResponse, "timestamp">) {
    if (key === "churnedContributorCount") {
      return stats?.map(stat => -stat["churnedContributorCount"] ?? 0) ?? [];
    }
    return stats?.map(stat => stat[key]) ?? [];
  }

  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");
  const mergedPrSeries = calculateSeries("mergedPrCount");
  const newContributorSeries = calculateSeries("newContributorCount");
  const activeContributorSeries = calculateSeries("activeContributorCount");
  const reactivatedContributorSeries = calculateSeries("reactivatedContributorCount");
  const churnedContributorSeries = calculateSeries("churnedContributorCount");
  const minChurnedContributor = Math.min(...churnedContributorSeries.map(value => value));

  const renderGrantedAmount = useMemo(
    () => <AmountLegend amountSum={grantedSeries.reduce((a, c) => a + c, 0)} />,
    [grantedSeries]
  );
  const renderRewardedAmount = useMemo(
    () => <AmountLegend amountSum={rewardedSeries.reduce((a, c) => a + c, 0)} />,
    [rewardedSeries]
  );
  const renderMergedPrCount = useMemo(
    () => <PrCountLegend countSum={mergedPrSeries.reduce((a, c) => a + c, 0)} />,
    [mergedPrSeries]
  );
  const renderNewContributorCount = useMemo(
    () => <DevCountLegend countSum={newContributorSeries.reduce((a, c) => a + c, 0)} />,
    [newContributorSeries]
  );
  const renderActiveContributorCount = useMemo(
    () => <DevCountLegend countSum={activeContributorSeries.reduce((a, c) => a + c, 0)} />,
    [activeContributorSeries]
  );
  const renderReactivatedContributorCount = useMemo(
    () => <DevCountLegend countSum={reactivatedContributorSeries.reduce((a, c) => a + c, 0)} />,
    [reactivatedContributorSeries]
  );
  const renderChurnedContributorCount = useMemo(
    () => <DevCountLegend countSum={churnedContributorSeries.reduce((a, c) => a + c, 0)} />,
    [churnedContributorSeries]
  );

  return {
    categories,
    grantedSeries,
    rewardedSeries,
    mergedPrSeries,
    newContributorSeries,
    activeContributorSeries,
    reactivatedContributorSeries,
    churnedContributorSeries,
    minChurnedContributor,
    renderGrantedAmount,
    renderRewardedAmount,
    renderMergedPrCount,
    renderNewContributorCount,
    renderActiveContributorCount,
    renderReactivatedContributorCount,
    renderChurnedContributorCount,
  };
}
