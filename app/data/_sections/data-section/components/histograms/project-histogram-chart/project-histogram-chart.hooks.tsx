import { useMemo } from "react";

import { buildCategories } from "@/app/data/_sections/data-section/components/histograms/histograms.utils";
import { AmountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/amount-legend";
import { CountLegend } from "@/app/data/_sections/data-section/components/histograms/legends/count-legend";

import { GetBiProjectsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiProjectsStatsResponse } from "@/core/domain/bi/models/bi-projects-stats-model";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

export function useProjectHistogramChart(
  stats?: GetBiProjectsStatsModel["stats"],
  timeGroupingType?: TimeGroupingType
) {
  function calculateSeries(key: keyof Omit<BiProjectsStatsResponse, "timestamp">) {
    if (key === "churnedProjectCount") {
      return stats?.map(stat => -stat["churnedProjectCount"] ?? 0) ?? [];
    }
    return stats?.map(stat => stat[key]) ?? [];
  }

  const categories = stats && timeGroupingType ? buildCategories({ stats, timeGroupingType }) : [];
  const grantedSeries = calculateSeries("totalGranted");
  const rewardedSeries = calculateSeries("totalRewarded");
  const mergedPrSeries = calculateSeries("mergedPrCount");
  const newProjectSeries = calculateSeries("newProjectCount");
  const activeProjectSeries = calculateSeries("activeProjectCount");
  const reactivatedProjectSeries = calculateSeries("reactivatedProjectCount");
  const churnedProjectSeries = calculateSeries("churnedProjectCount");
  const minChurnedProject = Math.min(...churnedProjectSeries.map(value => value));

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
        countSum={newProjectSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [newProjectSeries]
  );
  const renderActiveProjectCount = useMemo(
    () => (
      <CountLegend
        countSum={activeProjectSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [activeProjectSeries]
  );
  const renderReactivatedProjectCount = useMemo(
    () => (
      <CountLegend
        countSum={reactivatedProjectSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [reactivatedProjectSeries]
  );
  const renderChurnedProjectCount = useMemo(
    () => (
      <CountLegend
        countSum={churnedProjectSeries.reduce((a, c) => a + c, 0)}
        label={{ token: "data:histograms.legends.devs" }}
      />
    ),
    [churnedProjectSeries]
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
    minChurnedProject,
    renderGrantedAmount,
    renderRewardedAmount,
    renderMergedPrCount,
    renderNewContributorCount,
    renderActiveProjectCount,
    renderReactivatedProjectCount,
    renderChurnedProjectCount,
  };
}
