import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramTransactionsStatsPortParams,
  GetProgramTransactionsStatsPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
} from "../program-contract.types";

export interface ProgramStoragePort {
  routes: Record<string, string>;
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactionsStats(p: GetProgramTransactionsStatsPortParams): GetProgramTransactionsStatsPortResponse;
}
