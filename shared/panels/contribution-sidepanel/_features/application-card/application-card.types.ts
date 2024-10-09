import { GetApplicationsResponse } from "@/core/domain/application/application-contract.types";

export interface ApplicationCardProps {
  application: GetApplicationsResponse["applications"][0];
}
