import { useAuth0 } from "@auth0/auth0-react";
import { usePostHog } from "posthog-js/react";

import { Auth0ClientAdapter } from "@/core/application/auth0-client-adapter";

import { useImpersonation } from "@/shared/providers/impersonation/impersonation-provider";

export function usePosthog() {
  const posthog = usePostHog();
  const { isImpersonating } = useImpersonation();

  const { user } = useAuth0();
  const impersonated_by = Auth0ClientAdapter.helpers.getGithubUserIdFromSub(user?.sub) ?? "UNKNOWN";

  function identify(userId: string, properties?: Record<string, unknown>) {
    posthog.identify(userId, properties);
  }

  function capture(eventName: string, properties?: Record<string, unknown>) {
    const props = isImpersonating ? { ...properties, impersonated_by } : properties;
    posthog.capture(eventName, props);
  }

  function reset() {
    posthog.reset();
  }

  return {
    posthog,
    identify,
    capture,
    reset,
  };
}
