import {
  GetSponsorPortParams,
  GetSponsorPortResponse,
  GetSponsorTransactionsStatsPortParams,
  GetSponsorTransactionsStatsPortResponse,
  GetSponsorProgramsPortParams,
  GetSponsorProgramsPortResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";


export interface SponsorFacadePort {
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
  getSponsorTransactionsStats(p: GetSponsorTransactionsStatsPortParams): GetSponsorTransactionsStatsPortResponse;
  getSponsorPrograms(p: GetSponsorProgramsPortParams): GetSponsorProgramsPortResponse;
}
