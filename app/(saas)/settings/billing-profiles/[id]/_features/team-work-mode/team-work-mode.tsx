import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { BillingProfileType } from "@/core/domain/billing-profile/billing-profile.types";

import { Switch } from "@/shared/ui/switch";
import { TypographyMuted } from "@/shared/ui/typography";

import { TeamWorkModeProps } from "./team-work-mode.types";

export function TeamWorkMode({ billingProfileId, type, isSwitchableToSelfEmployed }: TeamWorkModeProps) {
  const { mutate: updateType, isPending } = BillingProfileReactQueryAdapter.client.useUpdateBillingProfileType({
    pathParams: { billingProfileId },
  });

  const isChecked = type === BillingProfileType.Company;

  const handleToggle = (checked: boolean) => {
    const newType = checked ? BillingProfileType.Company : BillingProfileType.SelfEmployed;

    updateType({ type: newType });
  };

  return (
    <div className="flex justify-end">
      <div className="flex flex-col justify-end gap-4">
        <TypographyMuted>Team Work Mode</TypographyMuted>
        <div className="flex justify-end">
          <Switch
            checked={isChecked}
            onCheckedChange={handleToggle}
            disabled={isPending || !isSwitchableToSelfEmployed}
          />
        </div>
      </div>
    </div>
  );
}
