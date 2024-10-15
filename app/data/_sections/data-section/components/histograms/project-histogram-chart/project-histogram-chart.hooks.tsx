import { buildCategories } from "@/app/data/_sections/data-section/components/histograms/histograms.utils";

import { GetBiProjectsStatsModel } from "@/core/domain/bi/bi-contract.types";
import { BiProjectsStatsResponse } from "@/core/domain/bi/models/bi-projects-stats-model";
import { TimeGroupingType } from "@/core/kernel/date/date-facade-port";

export function useProjectHistogramChart(
  stats?: GetBiProjectsStatsModel["stats"],
  timeGroupingType?: TimeGroupingType
) {
  function calculateSeries(key: keyof Omit<BiProjectsStatsResponse, "timestamp">) {
    if (key === "churnedProjectCount") {
      return stats?.map(stat => -stat["churnedProjectCount"]) ?? [];
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
  };
}
