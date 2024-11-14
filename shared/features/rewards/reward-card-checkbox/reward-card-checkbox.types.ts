import { Money } from "@/core/kernel/money/money.types";

import { CheckboxPort } from "@/design-system/atoms/checkbox";

type CheckBoxProps = Omit<CheckboxPort, "classNames" | "variant" | "mixed">;

export interface RewardCardCheckboxProps extends CheckBoxProps {
  numberOfRewardedContributions?: number;
  id: string;
  amount: Money;
  project?: {
    name?: string;
    logoUrl?: string;
  };
}
