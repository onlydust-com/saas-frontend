import {
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiStoragePort {
  routes: Record<string, string>;
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
}
