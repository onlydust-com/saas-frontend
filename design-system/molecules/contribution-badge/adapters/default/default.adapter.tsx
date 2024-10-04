import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleSlash,
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  ClipboardPen,
  ClipboardX,
  GitMerge,
  GitPullRequestArrow,
  GitPullRequestClosed,
} from "lucide-react";
import { ElementType } from "react";

import { Badge, BadgeIconPort } from "@/design-system/atoms/badge";

import { Contribution, ContributionBadgePort } from "../../contribution-badge.types";

export function ContributionBadgeDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  size = "xxs",
  shape = "rounded",
  contribution,
}: ContributionBadgePort<C>) {
  const Component = as || "div";

  const config: Record<
    Contribution["type"],
    Partial<
      Record<
        Contribution["githubStatus"],
        {
          icon: BadgeIconPort<C>["icon"];
          color: BadgeIconPort<C>["color"];
        }
      >
    >
  > = {
    PULL_REQUEST: {
      OPEN: {
        icon: { component: GitPullRequestArrow, size: "xs" },
        color: "success",
      },
      MERGED: {
        icon: { component: GitMerge, size: "xs" },
        color: "brand",
      },
      DRAFT: {
        icon: { component: CircleDashed, size: "xs" },
        color: "grey",
      },
      CLOSED: { icon: { component: GitPullRequestClosed, size: "xs" }, color: "error" },
    },
    ISSUE: {
      OPEN: { icon: { component: CircleDot, size: "xs" }, color: "success" },
      COMPLETED: { icon: { component: CircleCheck, size: "xs" }, color: "brand" },
      CANCELLED: { icon: { component: CircleSlash, size: "xs" }, color: "error" },
    },
    CODE_REVIEW: {
      PENDING: { icon: { component: Clipboard, size: "xs" }, color: "success" },
      APPROVED: { icon: { component: ClipboardCheck, size: "xs" }, color: "success" },
      CHANGES_REQUESTED: { icon: { component: ClipboardList, size: "xs" }, color: "brand" },
      COMMENTED: { icon: { component: ClipboardPen, size: "xs" }, color: "brand" },
      DISMISSED: { icon: { component: ClipboardX, size: "xs" }, color: "error" },
    },
  };

  const badgeProps = config[contribution.type][contribution.githubStatus];

  if (!badgeProps) return null;

  return (
    <Badge as={Component} {...htmlProps} {...badgeProps} size={size} shape={shape} classNames={classNames}>
      {contribution.githubNumber}
    </Badge>
  );
}
