import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectFacadePort {
  getProjectById(p: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  getProjects(p: GetProjectsPortParams): GetProjectsPortResponse;
  editProject(p: EditProjectPortParams): EditProjectPortResponse;
}
