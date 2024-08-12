import { GetProgramPortParams, GetProgramPortResponse } from "../program-contract.types";

export interface ProgramFacadePort {
  getProgram(p: GetProgramPortParams): GetProgramPortResponse;
}
