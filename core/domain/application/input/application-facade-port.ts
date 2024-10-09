import {
  GetApplicationsPortParams,
  GetApplicationsPortResponse,
  PatchApplicationPortParams,
  PatchApplicationPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationFacadePort {
  getApplications(p: GetApplicationsPortParams): GetApplicationsPortResponse;
  patchApplication(p: PatchApplicationPortParams): PatchApplicationPortResponse;
}
