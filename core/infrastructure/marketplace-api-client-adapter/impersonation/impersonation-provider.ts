import { ImpersonationHeaders } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

export interface ImpersonationProvider {
  getHeaders: () => ImpersonationHeaders;
}
