import { useQueryClient } from "@tanstack/react-query";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

const MARKETPLACE_URL = process.env.NEXT_PUBLIC_MARKETPLACE_URL;

export function useLogout() {
  const { capture, reset } = usePosthog();
  const { isImpersonating, clearClaim } = useClientBootstrapImpersonation();
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { logout } = authProvider ?? {};
  const { mutateAsync: logoutUser } = UserReactQueryAdapter.client.useLogoutMe({});
  const queryClient = useQueryClient();

  async function handleLogout() {
    capture("user_logged_out");
    reset();

    if (isImpersonating) {
      clearClaim();
      await queryClient.invalidateQueries();
      window.location.reload();
    } else {
      await logoutUser({});

      if (logout && MARKETPLACE_URL) {
        logout({
          logoutParams: {
            returnTo: MARKETPLACE_URL,
          },
        });
      }
    }
  }

  return handleLogout;
}
