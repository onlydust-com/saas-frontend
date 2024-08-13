import { useQueryClient } from "@tanstack/react-query";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useImpersonation } from "@/shared/providers/impersonation/impersonation-provider";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

export function useLogout() {
  const { capture, reset } = usePosthog();
  const { isImpersonating, clearImpersonationClaim } = useImpersonation();
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
      clearImpersonationClaim();
      await queryClient.invalidateQueries();
      window.location.reload();
    } else {
      await logoutUser({});
      logout?.({
        logoutParams: {
          returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || NEXT_ROUTER.home.root,
        },
      });
    }
  }

  return handleLogout;
}
