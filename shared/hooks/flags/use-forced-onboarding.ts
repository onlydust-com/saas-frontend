import { useAuthUser } from "../auth/use-auth-user";
import { useFeatureFlagVariant } from "../feature-flag/feature-flag.hooks";

export const useForcedOnboarding = (): null | true | false => {
  const { user } = useAuthUser();
  const variantValue = useFeatureFlagVariant({
    flagName: "onboarding-flag",
  });

  return true;

  if (!user) {
    return null;
  }

  if (!user.hasCompletedOnboarding && variantValue === "forcedOnboarding" && user.isNewContributor()) {
    return true;
  }

  return false;
};
