import { usePostHog } from "posthog-js/react";

import { Auth0ClientAdapter } from "@/core/application/auth0-client-adapter";
import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";

import { useImpersonation } from "@/shared/providers/impersonation/impersonation-provider";

export function usePosthog() {
  const posthog = usePostHog();
  const { isImpersonating } = useImpersonation();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { user } = authProvider ?? {};

  const impersonated_by = Auth0ClientAdapter.helpers.getGithubUserIdFromSub(user?.sub) ?? "UNKNOWN";

  function capture(eventName: string, properties?: Record<string, unknown>) {
    const props = isImpersonating ? { ...properties, impersonated_by } : properties;
    posthog.capture(eventName, props);
  }

  return {
    posthog,
    identify: posthog.identify,
    capture,
    reset: posthog.reset,
  };
}
