import { Clock } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { LastUpdatedAtProps } from "./last-updated-at.types";

export function LastUpdatedAt({ lastUpdatedAt }: LastUpdatedAtProps) {
  if (!lastUpdatedAt) return null;

  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <Typo size={"xs"} classNames={{ base: "flex gap-sm" }} color={"tertiary"}>
      <Icon component={Clock} />
      {dateKernelPort.formatDistanceToNow(new Date(lastUpdatedAt))}
    </Typo>
  );
}
