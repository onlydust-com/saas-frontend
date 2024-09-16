import {
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
  GetBiProjectsStatsPortParams,
  GetBiProjectsStatsPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiFacadePort {
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
  getBiProjectsStats(p: GetBiProjectsStatsPortParams): GetBiProjectsStatsPortResponse;
}
