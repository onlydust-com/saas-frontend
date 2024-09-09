import {
  GetSponsorPortParams,
  GetSponsorPortResponse,
  GetSponsorProgramsPortParams,
  GetSponsorProgramsPortResponse,
  GetSponsorTransactionsCsvPortResponse,
  GetSponsorTransactionsPortParams,
  GetSponsorTransactionsPortResponse,
  GetSponsorTransactionsStatsPortParams,
  GetSponsorTransactionsStatsPortResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";

export interface SponsorFacadePort {
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
  getSponsorTransactionsStats(p: GetSponsorTransactionsStatsPortParams): GetSponsorTransactionsStatsPortResponse;
  getSponsorPrograms(p: GetSponsorProgramsPortParams): GetSponsorProgramsPortResponse;
  getSponsorTransactions(p: GetSponsorTransactionsPortParams): GetSponsorTransactionsPortResponse;
  getSponsorTransactionsCsv(p: GetSponsorTransactionsPortParams): GetSponsorTransactionsCsvPortResponse;
}
