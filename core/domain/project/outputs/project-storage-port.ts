import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectContributorLabelsPortParams,
  GetProjectContributorLabelsPortResponse,
  GetProjectFinancialDetailsByIdPortParams,
  GetProjectFinancialDetailsByIdPortResponse,
  GetProjectFinancialDetailsBySlugPortParams,
  GetProjectFinancialDetailsBySlugPortResponse,
  GetProjectProgramsPortParams,
  GetProjectProgramsPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectTransactionsCsvPortResponse,
  GetProjectTransactionsPortParams,
  GetProjectTransactionsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
  GetProjectsV2PortParams,
  GetProjectsV2PortResponse,
  UnassignContributorFromProjectContributionPortParams,
  UnassignContributorFromProjectContributionPortResponse,
  UngrantFundsFromProjectPortParams,
  UngrantFundsFromProjectPortResponse,
  UpdateProjectContributorLabelsPortParams,
  UpdateProjectContributorLabelsPortResponse,
  UploadProjectLogoPortParams,
  UploadProjectLogoPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectStoragePort {
  routes: Record<string, string>;
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
  getProjectTransactionsCsv(p: GetProjectTransactionsPortParams): GetProjectTransactionsCsvPortResponse;
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
  getProjectContributorLabels(p: GetProjectContributorLabelsPortParams): GetProjectContributorLabelsPortResponse;
  updateProjectContributorLabels(
    p: UpdateProjectContributorLabelsPortParams
  ): UpdateProjectContributorLabelsPortResponse;
  unassignContributorFromProjectContribution(
    p: UnassignContributorFromProjectContributionPortParams
  ): UnassignContributorFromProjectContributionPortResponse;
  getProjectPrograms(p: GetProjectProgramsPortParams): GetProjectProgramsPortResponse;
  ungrantProject(p: UngrantFundsFromProjectPortParams): UngrantFundsFromProjectPortResponse;
  getProjectsV2(p: GetProjectsV2PortParams): GetProjectsV2PortResponse;
}
