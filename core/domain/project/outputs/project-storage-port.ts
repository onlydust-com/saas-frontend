import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectFinancialDetailsByIdPortParams,
  GetProjectFinancialDetailsByIdPortResponse,
  GetProjectFinancialDetailsBySlugPortParams,
  GetProjectFinancialDetailsBySlugPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
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
}
