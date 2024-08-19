import { GetProjectByidPortParams, GetProjectByidPortResponse } from "@/core/domain/project/project-contract.types";

export interface ProjectFacadePort {
  getProjectByid(p: GetProjectByidPortParams): GetProjectByidPortResponse;
}
