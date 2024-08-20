import {
  GetProjectByidPortParams,
  GetProjectByidPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectFacadePort {
  getProjectByid(p: GetProjectByidPortParams): GetProjectByidPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
}
