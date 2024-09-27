import {
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectFinancialDetailsPortParams,
  GetProjectFinancialDetailsPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectFacadePort {
  getProjectById(p: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  getProjects(p: GetProjectsPortParams): GetProjectsPortResponse;
  getProjectFinancialDetails(p: GetProjectFinancialDetailsPortParams): GetProjectFinancialDetailsPortResponse;
}
