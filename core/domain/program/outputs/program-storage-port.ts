import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramProjectsPortParams,
  GetProgramProjectsPortResponse,
  GetProgramTransactionsPortParams,
  GetProgramTransactionsPortResponse,
  GetProgramTransactionsStatsPortParams,
  GetProgramTransactionsStatsPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  GrantBudgetToProjectPortParams,
  GrantBudgetToProjectPortResponse,
} from "../program-contract.types";

export interface ProgramStoragePort {
  routes: Record<string, string>;
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetProgramTransactionsPortParams): GetProgramTransactionsPortResponse;
  getProgramTransactionsStats(p: GetProgramTransactionsStatsPortParams): GetProgramTransactionsStatsPortResponse;
  getProgramProjects(p: GetProgramProjectsPortParams): GetProgramProjectsPortResponse;
  grantBudgetToProject(p: GrantBudgetToProjectPortParams): GrantBudgetToProjectPortResponse;
}
