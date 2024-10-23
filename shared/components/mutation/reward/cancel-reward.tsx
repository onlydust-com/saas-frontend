import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { toast } from "@/design-system/molecules/toaster";

import { Translate } from "@/shared/translation/components/translate/translate";

import { CancelRewardProps } from "./cancel-reward.types";

export function CancelReward({ projectId, rewardId, children }: CancelRewardProps) {
  const { mutate: cancel, isPending } = RewardReactQueryAdapter.client.useCancelProjectReward({
    pathParams: { projectId, rewardId },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"mutation:reward.cancel.toast.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"mutation:reward.cancel.toast.error"} />);
      },
    },
  });

  return children({
    cancel: () => cancel({}),
    isCanceling: isPending,
  });
}
