import {
  ImpersonationClaim,
  ImpersonationHeaders,
} from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

export interface ImpersonationProvider {
  getClaim: () => ImpersonationClaim | undefined;
  setClaim: (claim: ImpersonationClaim) => void;
  clearClaim: () => void;
  getHeaders: () => ImpersonationHeaders | undefined;
  isImpersonating: boolean;
}
