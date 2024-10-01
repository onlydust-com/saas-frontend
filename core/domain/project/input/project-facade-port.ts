import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectFinancialPortParams,
  GetProjectFinancialPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
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
  getProjectFinancial(p: GetProjectFinancialPortParams): GetProjectFinancialPortResponse;
}
