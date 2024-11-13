import { CircleDashed } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Paper } from "@/design-system/atoms/paper";

import { BillingProfileCardProps } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-card/billing-profile-card.types";

export function BillingProfileCard({ id, type, name, requestableRewardCount }: BillingProfileCardProps) {
  return (
    <Paper size={"lg"} background={"primary-alt"} border="primary" classNames={{ base: "flex gap-md" }}>
      <div>
        <Avatar shape="squared" size="lg" iconProps={{ component: CircleDashed }} />
      </div>
      {name}
    </Paper>
  );
}
