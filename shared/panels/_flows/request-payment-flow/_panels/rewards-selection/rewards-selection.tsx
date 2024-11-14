import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { BillingProfileAccordion } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-accordion/billing-profile-accordion";
import { RewardsCardsSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/rewards-cards-selection/rewards-cards-selection";
import { useRewardsSelectionPanel } from "@/shared/panels/_flows/request-payment-flow/_panels/rewards-selection/rewards-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

export function Content() {
  const { billingProfileId, rewardIds } = useRequestPaymentFlow();

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
    data: rewards,
    isLoading: isRewardsProfileLoading,
    isError: isRewardsProfileError,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileInvoiceableRewards({
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

  const isLoading = isBillingProfileLoading || isPayoutInformationLoading || isRewardsProfileLoading;
  const isError =
    isBillingProfileError ||
    !billingProfile ||
    isPayoutInformationError ||
    !payoutInformation ||
    isRewardsProfileError ||
    !rewards;

  const canSubmit = !!billingProfileId && rewardIds.length;

  function onSubmit() {
    if (billingProfile?.invoiceMandateAccepted) {
      // TODO redirect to invoice generation
    } else {
      // TODO redirect to mandate
    }
  }

  if (isLoading) {
    return (
      <SidePanelBody>
        <Skeleton className={"h-15"} />
        <Skeleton className={"h-full"} />
      </SidePanelBody>
    );
  }

  if (isError) {
    return (
      <SidePanelBody>
        <EmptyStateLite />
      </SidePanelBody>
    );
  }

  return (
    <>
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
        <RewardsCardsSelection rewards={rewards} />
      </SidePanelBody>
      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:next",
          }}
          isDisabled={!canSubmit}
          onClick={onSubmit}
        />
      </SidePanelFooter>
    </>
  );
}

export function RewardsSelection() {
  const { name } = useRewardsSelectionPanel();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:singleContributionSelection.title",
          },
        }}
        canClose
      />
      <Content />
    </Panel>
  );
}
