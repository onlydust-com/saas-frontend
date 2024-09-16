import {
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
  GetBiProjectsStatsPortParams,
  GetBiProjectsStatsPortResponse,
  GetBiWorldsMapPortParams,
  GetBiWorldsMapPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiStoragePort {
  routes: Record<string, string>;
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
  getBiProjectsStats(p: GetBiProjectsStatsPortParams): GetBiProjectsStatsPortResponse;
  getBiWorldMap(p: GetBiWorldsMapPortParams): GetBiWorldsMapPortResponse;
}
