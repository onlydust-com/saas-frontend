import { useFeatureFlagVariantKey } from "posthog-js/react";

import { useAuthUser } from "../auth/use-auth-user";

export const useForcedOnboarding = (): null | true | false => {
  const { user } = useAuthUser();

  const variant = useFeatureFlagVariantKey("onboarding-flag-v5");

  return true;
  if (!user) {
    return null;
  }

  if (!user?.hasCompletedOnboarding && variant === "forcedNewOnboarding" && user?.isNewContributor()) {
    return true;
  }

  return false;
};
