import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { CheckboxPort } from "@/design-system/atoms/checkbox";

type CheckBoxProps = Omit<CheckboxPort, "classNames" | "variant" | "mixed">;

export interface RewardCardCheckboxProps extends CheckBoxProps {
  numberOfRewardedContributions?: number;
  id: string;
  amount: components["schemas"]["Money"];
  project?: {
    name?: string;
    logoUrl?: string;
  };
}
