import {
  AllocateBudgetToProgramPortParams,
  AllocateBudgetToProgramPortResponse,
  CreateSponsorProgramPortParams,
  CreateSponsorProgramPortResponse,
  GetSponsorPortParams,
  GetSponsorPortResponse,
  GetSponsorProgramsPortParams,
  GetSponsorProgramsPortResponse,
  GetSponsorTransactionsCsvPortResponse,
  GetSponsorTransactionsPortParams,
  GetSponsorTransactionsPortResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";

export interface SponsorStoragePort {
  routes: Record<string, string>;
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
  getSponsorPrograms(p: GetSponsorProgramsPortParams): GetSponsorProgramsPortResponse;
  getSponsorTransactions(p: GetSponsorTransactionsPortParams): GetSponsorTransactionsPortResponse;
  getSponsorTransactionsCsv(p: GetSponsorTransactionsPortParams): GetSponsorTransactionsCsvPortResponse;
  allocateBudgetToProgram(p: AllocateBudgetToProgramPortParams): AllocateBudgetToProgramPortResponse;
  createSponsorProgram(p: CreateSponsorProgramPortParams): CreateSponsorProgramPortResponse;
}
