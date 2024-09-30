import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectFinancialDetailsByIdPortParams,
  GetProjectFinancialDetailsByIdPortResponse,
  GetProjectFinancialDetailsBySlugPortParams,
  GetProjectFinancialDetailsBySlugPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectTransactionsCsvResponse,
  GetProjectTransactionsPortParams,
  GetProjectTransactionsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
  UploadProjectLogoPortParams,
  UploadProjectLogoPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectFacadePort {
  getProjectById(p: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  getProjects(p: GetProjectsPortParams): GetProjectsPortResponse;
  editProject(p: EditProjectPortParams): EditProjectPortResponse;
  uploadProjectLogo(p: UploadProjectLogoPortParams): UploadProjectLogoPortResponse;
  getProjectFinancialDetailsBySlug(
    p: GetProjectFinancialDetailsBySlugPortParams
  ): GetProjectFinancialDetailsBySlugPortResponse;
  getProjectFinancialDetailsById(
    p: GetProjectFinancialDetailsByIdPortParams
  ): GetProjectFinancialDetailsByIdPortResponse;
  getProjectTransactions(p: GetProjectTransactionsPortParams): GetProjectTransactionsPortResponse;
  getProjectTransactionsCsv(p: GetProjectTransactionsPortParams): GetProjectTransactionsCsvResponse;
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
}
