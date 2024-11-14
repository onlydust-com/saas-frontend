import { useMemo } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { AddNewBillingProfileCard } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/add-new-billing-profile-card/add-new-billing-profile-card";
import { BillingProfileCard } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-card/billing-profile-card";
import { useBillingProfileSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/billing-profile-selection/billing-profile-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

function Content() {
  const { selectBillingProfile } = useRequestPaymentFlow();

  const { data, isLoading } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});

  const { billingProfiles } = data || {};

  function handleClick(billingProfileId: string) {
    selectBillingProfile(billingProfileId);
    // TODO open reward sidePanel
  }

  function handleAddNewBillingProfile() {
    window.open(marketplaceRouting("/settings/profile"), "_blank");
  }

  const renderBody = useMemo(() => {
    if (isLoading) {
      return (
        <div className={"grid gap-md"}>
          <Skeleton classNames={{ base: "h-16" }} />
          <Skeleton classNames={{ base: "h-16" }} />
          <Skeleton classNames={{ base: "h-16" }} />
          <Skeleton classNames={{ base: "h-16" }} />
        </div>
      );
    }

    return (
      <>
        {billingProfiles?.map(billingProfile => (
          <BillingProfileCard
            key={billingProfile.id}
            name={billingProfile.name}
            requestableRewardCount={billingProfile.requestableRewardCount}
            type={billingProfile.type}
            role={billingProfile.role}
            enabled={billingProfile.enabled}
            isDisabled={billingProfile.requestableRewardCount === 0}
            onClick={() => handleClick(billingProfile.id)}
          />
        ))}
        <AddNewBillingProfileCard onClick={handleAddNewBillingProfile} />
      </>
    );
  }, [billingProfiles, isLoading]);

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            // TODO update title
            token: "panels:singleContributionSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>{renderBody}</SidePanelBody>
    </>
  );
}

export function BillingProfileSelection() {
  const { name } = useBillingProfileSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
