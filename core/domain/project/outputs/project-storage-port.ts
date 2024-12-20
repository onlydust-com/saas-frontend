import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectAvailableIssuesPortParams,
  GetProjectAvailableIssuesPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectBySlugOrIdV2PortParams,
  GetProjectBySlugOrIdV2PortResponse,
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectContributorLabelsPortParams,
  GetProjectContributorLabelsPortResponse,
  GetProjectContributorsV2PortParams,
  GetProjectContributorsV2PortResponse,
  GetProjectFinancialDetailsByIdPortParams,
  GetProjectFinancialDetailsByIdPortResponse,
  GetProjectFinancialDetailsBySlugPortParams,
  GetProjectFinancialDetailsBySlugPortResponse,
  GetProjectProgramsPortParams,
  GetProjectProgramsPortResponse,
  GetProjectRewardsV2PortParams,
  GetProjectRewardsV2PortResponse,
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
  getProjectBySlugOrIdV2(p: GetProjectBySlugOrIdV2PortParams): GetProjectBySlugOrIdV2PortResponse;
  getProjectAvailableIssues(p: GetProjectAvailableIssuesPortParams): GetProjectAvailableIssuesPortResponse;
  getProjectContributorsV2(p: GetProjectContributorsV2PortParams): GetProjectContributorsV2PortResponse;
  getProjectRewardsV2(p: GetProjectRewardsV2PortParams): GetProjectRewardsV2PortResponse;
}
