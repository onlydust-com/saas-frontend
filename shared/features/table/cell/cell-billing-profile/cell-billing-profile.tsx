import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { CellBillingProfileProps } from "@/shared/features/table/cell/cell-billing-profile/cell-billing-profile.types";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useBillingProfileIcons } from "@/shared/panels/_flows/request-payment-flow/_panels/hooks/use-billing-profile-icons/use-billing-profile-icons";
import { Translate } from "@/shared/translation/components/translate/translate";

export function CellBillingProfile({ projectId, billingProfile }: CellBillingProfileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { billingProfilesIcons } = useBillingProfileIcons();
  const { githubUserId } = useAuthUser();

  const { data: rewardsData } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      recipientIds: githubUserId ? [githubUserId] : undefined,
      projectIds: [projectId],
      pageSize: 1,
    },
    options: {
      // Only fetch rewards if the user is authenticated and has no billing profile set for the project
      enabled: Boolean(!billingProfile && githubUserId),
    },
  });
  const nbRewards = useMemo(() => rewardsData?.pages[0].totalItemNumber ?? 0, [rewardsData]);

  const { data: myBillingProfilesData } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({
    options: {
      // User can only select a billing profile if they already have a billing profile set for the project or if they have been rewarded on the project
      enabled: isMenuOpen && Boolean(billingProfile || nbRewards),
    },
  });
  const myBillingProfiles = useMemo(() => myBillingProfilesData?.billingProfiles ?? [], [myBillingProfilesData]);

  const { mutate, isPending } = MeReactQueryAdapter.client.useSetMyPreferenceForProject({});

  const menuItems: MenuItemPort[] =
    myBillingProfiles.map(billingProfile => ({
      id: billingProfile.id,
      label: billingProfile.name,
      icon: billingProfilesIcons[billingProfile.type],
    })) ?? [];

  function handleMenuAction(billingProfileId: string) {
    mutate({ billingProfileId, projectId });
  }

  // User can only select a billing profile if they already have a billing profile set for the project or if they have been rewarded on the project
  if (!billingProfile && nbRewards === 0) {
    return <CellEmpty />;
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
        {billingProfile?.name ?? <Translate token={"myDashboard:detail.projectsTable.pendingBillingProfile"} />}
      </Button>
    </Menu>
  );
}
