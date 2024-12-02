import {
  EditProgramPortParams,
  EditProgramPortResponse,
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramProjectPortParams,
  GetProgramProjectPortResponse,
  GetProgramProjectsPortParams,
  GetProgramProjectsPortResponse,
  GetProgramSponsorsPortParams,
  GetProgramSponsorsPortResponse,
  GetProgramTransactionsCsvPortResponse,
  GetProgramTransactionsPortParams,
  GetProgramTransactionsPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  GrantBudgetToProjectPortParams,
  GrantBudgetToProjectPortResponse,
  UnallocateFundsFromProgramPortParams,
  UnallocateFundsFromProgramPortResponse,
  UploadProgramLogoPortParams,
  UploadProgramLogoPortResponse,
} from "../program-contract.types";

export interface ProgramStoragePort {
  routes: Record<string, string>;
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetProgramTransactionsPortParams): GetProgramTransactionsPortResponse;
  getProgramTransactionsCsv(p: GetProgramTransactionsPortParams): GetProgramTransactionsCsvPortResponse;
  getProgramProjects(p: GetProgramProjectsPortParams): GetProgramProjectsPortResponse;
  grantBudgetToProject(p: GrantBudgetToProjectPortParams): GrantBudgetToProjectPortResponse;
  getProgramProject(p: GetProgramProjectPortParams): GetProgramProjectPortResponse;
  uploadProgramLogo(p: UploadProgramLogoPortParams): UploadProgramLogoPortResponse;
  editProgram(p: EditProgramPortParams): EditProgramPortResponse;
  unallocateProgram(p: UnallocateFundsFromProgramPortParams): UnallocateFundsFromProgramPortResponse;
  getProgramSponsors(p: GetProgramSponsorsPortParams): GetProgramSponsorsPortResponse;
}
