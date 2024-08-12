import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
} from "../program-contract.types";

export interface ProgramFacadePort {
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
}
