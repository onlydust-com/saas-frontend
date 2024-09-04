import {
  GetSponsorPortParams,
  GetSponsorPortResponse,
  GetSponsorTransactionsStatsPortParams,
  GetSponsorTransactionsStatsPortResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";

export interface SponsorFacadePort {
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
  getSponsorTransactionsStats(p: GetSponsorTransactionsStatsPortParams): GetSponsorTransactionsStatsPortResponse;
}
