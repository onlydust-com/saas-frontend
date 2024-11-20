import { BriefcaseBusiness, Crown, User } from "lucide-react";
import { useMemo } from "react";

import { BillingProfileType, BillingProfileTypeUnion } from "@/core/domain/billing-profile/billing-profile.types";

import { IconPort } from "@/design-system/atoms/icon";

export function useBillingProfileIcons() {
  const billingProfilesIcons: Record<BillingProfileTypeUnion, IconPort> = useMemo(() => {
    return {
      [BillingProfileType.Individual]: { component: User },
      [BillingProfileType.SelfEmployed]: { component: BriefcaseBusiness },
      [BillingProfileType.Company]: { component: Crown },
    };
  }, []);
  return { billingProfilesIcons };
}
