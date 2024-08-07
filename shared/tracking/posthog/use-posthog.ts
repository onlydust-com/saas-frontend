import { useAuth0 } from "@auth0/auth0-react";
import { usePostHog } from "posthog-js/react";

import { getGithubUserIdFromSub } from "@/core/application/auth0-client-adapter/helpers/get-github-user-id-from-sub";

export function usePosthog() {
  const posthog = usePostHog();
  // const { isImpersonating } = useImpersonation();

  // TODO @impersonation
  // MOCK
  const isImpersonating = false;

  const { user } = useAuth0();
  const impersonated_by = getGithubUserIdFromSub(user?.sub) ?? "UNKNOWN";

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
