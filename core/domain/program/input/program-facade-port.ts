import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  ProgramTransactionsStatsPortParams,
  ProgramTransactionsStatsPortResponse,
} from "../program-contract.types";

export interface ProgramFacadePort {
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactionsStats(p: ProgramTransactionsStatsPortParams): ProgramTransactionsStatsPortResponse;
}
