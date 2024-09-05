import {
  GetSponsorPortParams,
  GetSponsorPortResponse,
  GetSponsorProgramsPortParams,
  GetSponsorProgramsPortResponse,
  GetSponsorTransactionsStatsPortParams,
  GetSponsorTransactionsStatsPortResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";

export interface SponsorStoragePort {
  routes: Record<string, string>;
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
  getSponsorTransactionsStats(p: GetSponsorTransactionsStatsPortParams): GetSponsorTransactionsStatsPortResponse;
  getSponsorPrograms(p: GetSponsorProgramsPortParams): GetSponsorProgramsPortResponse;
}
