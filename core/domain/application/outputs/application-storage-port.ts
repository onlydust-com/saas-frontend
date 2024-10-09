import {
  GetApplicationsPortParams,
  GetApplicationsPortResponse,
  PatchApplicationPortParams,
  PatchApplicationPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationStoragePort {
  routes: Record<string, string>;
  getApplications(p: GetApplicationsPortParams): GetApplicationsPortResponse;
  patchApplication(p: PatchApplicationPortParams): PatchApplicationPortResponse;
}
