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

export interface ProjectStoragePort {
  routes: Record<string, string>;
  getProjectById(p: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  getProjects(p: GetProjectsPortParams): GetProjectsPortResponse;
  getProjectFinancialDetails(p: GetProjectFinancialDetailsPortParams): GetProjectFinancialDetailsPortResponse;
}
