import {
  AcceptApplicationPortParams,
  AcceptApplicationPortResponse,
  PatchApplicationPortParams,
  PatchApplicationPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationFacadePort {
  patchApplication(p: PatchApplicationPortParams): PatchApplicationPortResponse;
  acceptApplication(p: AcceptApplicationPortParams): AcceptApplicationPortResponse;
}
