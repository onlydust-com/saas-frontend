import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  GetTransactionsPortParams,
  GetTransactionsPortResponse,
  ProgramTransactionsStatsPortParams,
  ProgramTransactionsStatsPortResponse,
} from "../program-contract.types";

export interface ProgramFacadePort {
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetTransactionsPortParams): GetTransactionsPortResponse;
  getProgramTransactionsStats(p: ProgramTransactionsStatsPortParams): ProgramTransactionsStatsPortResponse;
}
