import {
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
  GetBiProjectsStatsPortParams,
  GetBiProjectsStatsPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiStoragePort {
  routes: Record<string, string>;
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
  getBiProjectsStats(p: GetBiProjectsStatsPortParams): GetBiProjectsStatsPortResponse;
}
