import { GetProgramPortParams, GetProgramPortResponse } from "../program-contract.types";

export interface ProgramStoragePort {
  routes: Record<string, string>;
  getProgram(p: GetProgramPortParams): GetProgramPortResponse;
}
