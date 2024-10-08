import {
  GetApplicationsPortParams,
  GetApplicationsPortResponse,
} from "@/core/domain/application/application-contract.types";

export interface ApplicationFacadePort {
  getApplications(p: GetApplicationsPortParams): GetApplicationsPortResponse;
}
