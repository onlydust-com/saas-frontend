import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { BillingProfileAccordion } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-accordion/billing-profile-accordion";
import { useRewardsSelectionPanel } from "@/shared/panels/_flows/request-payment-flow/_panels/rewards-selection/rewards-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

export function Content() {
  const { billingProfileId } = useRequestPaymentFlow();
  const {
    data: billingProfile,
    isLoading: isBillingProfileLoading,
    isError: isBillingProfileError,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: billingProfileId ?? "",
    },
    options: {
      enabled: !!billingProfileId,
    },
  });
  const {
    data: payoutInformation,
    isLoading: isPayoutInformationLoading,
    isError: isPayoutInformationError,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfilePayoutInfoById({
    pathParams: {
      billingProfileId: billingProfileId ?? "",
    },
    options: {
      enabled: !!billingProfileId,
    },
  });

  const isLoading = isBillingProfileLoading || isPayoutInformationLoading;
  const isError = isBillingProfileError || !billingProfile || isPayoutInformationError || !payoutInformation;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log("payoutInformation", payoutInformation);

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:singleContributionSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>
        <BillingProfileAccordion
          key={billingProfile.id}
          id={billingProfile.id}
          name={billingProfile.name}
          rewardCount={billingProfile.invoiceableRewardCount ?? 0}
          type={billingProfile.type}
          accounts={{
            aptosAddress: payoutInformation.aptosAddress,
            ethWallet: payoutInformation.ethWallet,
            nearAccountId: payoutInformation.nearAccountId,
            optimismAddress: payoutInformation.optimismAddress,
            starknetAddress: payoutInformation.starknetAddress,
            stellarAccountId: payoutInformation.stellarAccountId,
          }}
        />
      </SidePanelBody>
    </>
  );
}

export function RewardsSelection() {
  const { name } = useRewardsSelectionPanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
