import { ChevronRight } from "lucide-react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

export function FinancialSection() {
  const { open: openRequestPaymentFlow } = useRequestPaymentFlow();

  const { githubUserId } = useAuthUser();

  const { data: rewardsData } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      recipientIds: githubUserId ? [githubUserId] : undefined,
      statuses: ["PENDING_REQUEST"],
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col flex-wrap justify-between gap-md tablet:flex-row tablet:items-center">
        <div className="flex flex-col gap-md tablet:flex-row tablet:items-center">
          <p>Financial</p>

          <p>Tabs</p>
        </div>

        <Button
          variant="primary"
          endIcon={{ component: ChevronRight }}
          isTextButton
          size="md"
          translate={{
            token: "myDashboard:detail.requestPayment.trigger",
            count: rewardsData?.pages[0].totalItemNumber,
          }}
          onClick={() => openRequestPaymentFlow({})}
          classNames={{
            base: "max-w-full overflow-hidden",
            label: "whitespace-nowrap text-ellipsis overflow-hidden",
          }}
        />
      </div>

      <p>Financial view</p>
    </div>
  );
}
