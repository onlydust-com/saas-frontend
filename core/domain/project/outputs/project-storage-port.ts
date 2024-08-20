import {
  GetProjectByidPortParams,
  GetProjectByidPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectStoragePort {
  routes: Record<string, string>;
  getProjectByid(p: GetProjectByidPortParams): GetProjectByidPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
}
