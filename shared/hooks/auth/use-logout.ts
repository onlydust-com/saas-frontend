import { useQueryClient } from "@tanstack/react-query";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

export function useLogout() {
  const { capture, reset } = usePosthog();
  const { isImpersonating, clearClaim } = useClientBootstrapImpersonation();
  const { logout } = useClientBootstrapAuth();
  const { mutateAsync: logoutUser } = MeReactQueryAdapter.client.useLogoutMe({});
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

      if (logout) {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      }
    }
  }

  return handleLogout;
}
