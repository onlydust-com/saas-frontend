import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramTransactionsPortParams,
  GetProgramTransactionsPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  ProgramTransactionsStatsPortParams,
  ProgramTransactionsStatsPortResponse,
} from "../program-contract.types";

export interface ProgramFacadePort {
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetProgramTransactionsPortParams): GetProgramTransactionsPortResponse;
  getProgramTransactionsStats(p: ProgramTransactionsStatsPortParams): ProgramTransactionsStatsPortResponse;
}
