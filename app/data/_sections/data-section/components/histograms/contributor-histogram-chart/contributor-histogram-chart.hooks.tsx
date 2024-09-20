import { buildCategories } from "@/app/data/_sections/data-section/components/histograms/histograms.utils";

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
  };
}
