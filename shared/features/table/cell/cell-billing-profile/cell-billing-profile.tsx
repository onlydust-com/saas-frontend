import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { CellBillingProfileProps } from "@/shared/features/table/cell/cell-billing-profile/cell-billing-profile.types";
import { useBillingProfileIcons } from "@/shared/panels/_flows/request-payment-flow/_panels/hooks/use-billing-profile-icons/use-billing-profile-icons";
import { Translate } from "@/shared/translation/components/translate/translate";

export function CellBillingProfile({ projectId, billingProfile }: CellBillingProfileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { billingProfilesIcons } = useBillingProfileIcons();

  const { data: myBillingProfilesData } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({
    options: {
      enabled: isMenuOpen,
    },
  });
  const myBillingProfiles = useMemo(() => myBillingProfilesData?.billingProfiles ?? [], [myBillingProfilesData]);

  const { mutate, isPending } = MeReactQueryAdapter.client.useSetMyPreferenceForProject({});

  const menuItems: MenuItemPort[] = myBillingProfiles.map(billingProfile => ({
    id: billingProfile.id,
    label: billingProfile.name,
    icon: billingProfilesIcons[billingProfile.type],
  }));

  function handleMenuAction(billingProfileId: string) {
    mutate({ billingProfileId, projectId });
  }

  return (
    <Menu
      isPopOver
      closeOnSelect
      items={menuItems}
      onAction={handleMenuAction}
      placement="bottom-start"
      onOpenChange={isOpen => {
        // Only set the menu state once to avoid repeating requests
        if (isOpen) {
          setIsMenuOpen(isOpen);
        }
      }}
    >
      <Button
        variant={"secondary"}
        size={"sm"}
        startIcon={billingProfile ? billingProfilesIcons[billingProfile.type] : undefined}
        endIcon={{ component: ChevronDown }}
        isLoading={isPending}
      >
        {billingProfile?.name ?? <Translate token={"features:cell.cellBillingProfile.pendingBillingProfile"} />}
      </Button>
    </Menu>
  );
}
