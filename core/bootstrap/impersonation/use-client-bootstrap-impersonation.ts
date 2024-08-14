import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { impersonationProviderMock } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider-mock";

export function useClientBootstrapImpersonation() {
  const {
    clientBootstrap: { impersonationProvider },
  } = useClientBootstrapContext();

  return impersonationProvider ?? impersonationProviderMock;
}
