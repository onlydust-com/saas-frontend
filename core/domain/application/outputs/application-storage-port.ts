import {
  GetApplicationsPortParams,
  GetApplicationsPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationStoragePort {
  routes: Record<string, string>;
  getApplications(p: GetApplicationsPortParams): GetApplicationsPortResponse;
}
