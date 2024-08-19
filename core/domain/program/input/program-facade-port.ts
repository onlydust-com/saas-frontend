import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramTransactionsPortParams,
  GetProgramTransactionsPortResponse,
  GetProgramTransactionsStatsPortParams,
  GetProgramTransactionsStatsPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
} from "../program-contract.types";

export interface ProgramFacadePort {
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetProgramTransactionsPortParams): GetProgramTransactionsPortResponse;
  getProgramTransactionsStats(p: GetProgramTransactionsStatsPortParams): GetProgramTransactionsStatsPortResponse;
}
