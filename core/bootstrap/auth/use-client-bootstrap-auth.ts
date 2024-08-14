import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { authProviderMock } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider-mock";

export function useClientBootstrapAuth() {
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();

  return authProvider ?? authProviderMock;
}
