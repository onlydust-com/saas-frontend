import { useMemo } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function RequestPayment() {
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

  const totalItemNumber = useMemo(() => rewardsData?.pages[0].totalItemNumber ?? 0, [rewardsData]);
  const hasRewards = useMemo(() => Boolean(totalItemNumber), [totalItemNumber]);

  function handleClick() {
    openRequestPaymentFlow({});
  }

  return (
    <Tooltip enabled={!hasRewards} content={<Translate token="myDashboard:detail.actions.disabledRequestPayment" />}>
      <Button
        variant="primary"
        size="sm"
        translate={{
          token: "myDashboard:detail.actions.requestPayment",
        }}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
        onClick={handleClick}
        isDisabled={!hasRewards}
        endContent={
          <Badge
            size={"xxs"}
            color={hasRewards ? "inverse" : "grey"}
            variant={hasRewards ? "solid" : "flat"}
            shape={"rounded"}
            count={totalItemNumber}
          />
        }
      />
    </Tooltip>
  );
}
