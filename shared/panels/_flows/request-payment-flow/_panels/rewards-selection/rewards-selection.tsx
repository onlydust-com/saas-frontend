import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useRewardsSelectionPanel } from "@/shared/panels/_flows/request-payment-flow/_panels/rewards-selection/rewards-selection.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

export function Content() {
  const { billingProfileId } = useRequestPaymentFlow();

  return <div>{billingProfileId}</div>;
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
