import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  GetTransactionsPortParams,
  GetTransactionsPortResponse,
} from "../program-contract.types";

export interface ProgramStoragePort {
  routes: Record<string, string>;
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetTransactionsPortParams): GetTransactionsPortResponse;
}
