import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { BillingProfileCard } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-card/billing-profile-card";
import { useBillingProfileSelection } from "@/shared/panels/_flows/request-payment-flow/_panels/billing-profile-selection/billing-profile-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

function Content() {
  const { selectBillingProfile, billingProfileId } = useRequestPaymentFlow();

  const { data, isLoading, isError } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});

  const { billingProfiles } = data || {};

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
        {billingProfiles?.map(billingProfile => (
          <BillingProfileCard
            key={billingProfile.id}
            id={billingProfile.id}
            name={billingProfile.name}
            requestableRewardCount={billingProfile.requestableRewardCount}
            type={billingProfile.type}
            // onClick={() => selectBillingProfile(billingProfile.id)}
          />
        ))}
      </SidePanelBody>
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
