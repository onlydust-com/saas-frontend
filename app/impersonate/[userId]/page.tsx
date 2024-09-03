"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Auth0ClientAdapter } from "@/core/application/auth0-client-adapter";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { withAdminGuard } from "@/shared/hocs/user/with-admin-guard";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

function ImpersonationPage() {
  const { userId } = useParams();
  const router = useRouter();
  const { getClaim, setClaim, clearClaim } = useClientBootstrapImpersonation();
  const impersonationClaim = getClaim();
  const { refetch } = useAuthUser();
  const { reset } = usePosthog();

  function handleImpersonationFailed() {
    // Clear impersonation claim from storage
    clearClaim();

    // Return to initial Posthog user
    reset();

    // Now get out of here
    router.push(NEXT_ROUTER.notFound);

    return;
  }

  useEffect(() => {
    if (!userId) {
      router.push(NEXT_ROUTER.home.root);
    } else {
      // Reset Posthog before refetching to so once refetch completes Posthog can update with impersonated user
      reset();

      setClaim({ sub: `github|${userId}` });

      refetch()
        .then(response => {
          const { data: user, isFetching, isError } = response;
          const claimedGithubUserId = Auth0ClientAdapter.helpers.getGithubUserIdFromSub(impersonationClaim?.sub);

          if (isError) {
            handleImpersonationFailed();
          }

          if (user && !isFetching && claimedGithubUserId) {
            if (user.githubUserId === claimedGithubUserId) {
              router.push(NEXT_ROUTER.home.root);
              return;
            } else {
              handleImpersonationFailed();
            }
          }
        })
        .catch(handleImpersonationFailed);
    }
  }, [userId, impersonationClaim]);

  return (
    <Button
      as={BaseLink}
      htmlProps={{
        href: NEXT_ROUTER.home.root,
      }}
      isTextButton
    >
      Not found, go home
    </Button>
  );
}

export default withClientOnly(withAdminGuard(ImpersonationPage));
