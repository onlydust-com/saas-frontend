"use client";

import { useEffect } from "react";

import { Auth0ClientAdapter } from "@/core/application/auth0-client-adapter";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";

export function PosthogIdentifyUser() {
  const { isAuthenticated, user: authProviderUser } = useClientBootstrapAuth();

  const authProviderGithubUserId = Auth0ClientAdapter.helpers.getGithubUserIdFromSub(authProviderUser?.sub);
  const { identify, capture } = usePosthog();

  const { user } = useAuthUser();

  useEffect(() => {
    if (isAuthenticated && authProviderGithubUserId && user) {
      const { isAdmin: admin, createdAt: created_at, githubUserId: github_user_id, id, email, projectsLed = [] } = user;

      identify(id, { admin, created_at, email, github_user_id, lead_on: projectsLed.length });

      if (authProviderGithubUserId !== github_user_id) {
        capture("impersonated");
      }
    }
  }, [isAuthenticated, authProviderGithubUserId, user]);

  return null;
}
