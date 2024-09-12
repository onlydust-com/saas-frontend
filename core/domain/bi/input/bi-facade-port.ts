import {
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiFacadePort {
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
}
