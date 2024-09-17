import {
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
  GetBiProjectsPortParams,
  GetBiProjectsPortResponse,
  GetBiProjectsStatsPortParams,
  GetBiProjectsStatsPortResponse,
  GetBiWorldMapPortParams,
  GetBiWorldMapPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiFacadePort {
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
  getBiProjectsStats(p: GetBiProjectsStatsPortParams): GetBiProjectsStatsPortResponse;
  getBiWorldMap(p: GetBiWorldMapPortParams): GetBiWorldMapPortResponse;
  getBiProjects(p: GetBiProjectsPortParams): GetBiProjectsPortResponse;
}
