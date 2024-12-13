import { useFeatureFlagVariantKey } from "posthog-js/react";
import { useEffect, useState } from "react";

import { UseFeatureFlagVariantProps } from "./feature-flag.types";

export function useFeatureFlagVariant({ flagName }: UseFeatureFlagVariantProps) {
  const [variantValue, setVariantValue] = useState<string | undefined | null>(null);
  const variant = useFeatureFlagVariantKey(flagName);

  const controlValueEnvVar = process.env.NEXT_PUBLIC_FEATURE_FLAG_PROJECT_RECOMMENDATION_A_A_CONTROL_VALUE;

  useEffect(() => {
    if (variant) {
      if (variant === "control" && controlValueEnvVar) {
        setVariantValue(controlValueEnvVar ?? "");
        return;
      }

      setVariantValue(String(variant));
    }
  }, [variant, controlValueEnvVar]);

  return variantValue;
}
