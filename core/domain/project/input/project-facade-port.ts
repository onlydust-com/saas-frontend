import {
  GetProjectByidPortParams,
  GetProjectByidPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
} from "@/core/domain/project/project-contract.types";


export interface ProjectFacadePort {
  getProjectByid(p: GetProjectByidPortParams): GetProjectByidPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  getProjects(p: GetProjectsPortParams): GetProjectsPortResponse;
}
