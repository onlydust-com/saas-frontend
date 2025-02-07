import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { AddNewBillingProfileCard } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/add-new-billing-profile-card/add-new-billing-profile-card";
import { BillingProfileCard } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-card/billing-profile-card";
import { useBillingProfileSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/billing-profile-selection/billing-profile-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

import { useRewardsSelectionPanel } from "../rewards-selection/rewards-selection.hooks";

function Content() {
  const router = useRouter();
  const { selectBillingProfile } = useRequestPaymentFlow();

  const { open: openRewardsSelection } = useRewardsSelectionPanel();

  const { data, isLoading } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});

  const { billingProfiles } = data || {};

  function handleClick(billingProfileId: string) {
    selectBillingProfile(billingProfileId);
    openRewardsSelection();
  }

  function handleAddNewBillingProfile() {
    router.push(NEXT_ROUTER.settings.billingProfiles.root);
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
            token: "panels:requestPaymentFlow.title",
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
