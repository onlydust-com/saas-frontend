import { useMemo } from "react";

import { buildCategories } from "@/app/data/_sections/data-section/components/histograms/histograms.utils";
import { AmountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/amount-legend";
import { CountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/count-legend";

import { GetBiContributorsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiContributorsStatsResponse } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

export function useContributorHistogramChart(
  stats?: GetBiContributorsStatsModel["stats"],
  timeGroupingType?: TimeGroupingType
) {
  function calculateSeries(key: keyof Omit<BiContributorsStatsResponse, "timestamp">) {
    if (key === "churnedContributorCount") {
      return stats?.map(stat => -stat["churnedContributorCount"] ?? 0) ?? [];
    }
    return stats?.map(stat => stat[key]) ?? [];
  }
  const categories = stats && timeGroupingType ? buildCategories({ stats, timeGroupingType }) : [];
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
    () => (
      <CountLegend
        countSum={mergedPrSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.pr" }}
      />
    ),
    [mergedPrSeries]
  );
  const renderNewContributorCount = useMemo(
    () => (
      <CountLegend
        countSum={newContributorSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [newContributorSeries]
  );
  const renderActiveContributorCount = useMemo(
    () => (
      <CountLegend
        countSum={activeContributorSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [activeContributorSeries]
  );
  const renderReactivatedContributorCount = useMemo(
    () => (
      <CountLegend
        countSum={reactivatedContributorSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [reactivatedContributorSeries]
  );
  const renderChurnedContributorCount = useMemo(
    () => (
      <CountLegend
        countSum={churnedContributorSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
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
