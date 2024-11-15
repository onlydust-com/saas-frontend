import {
  CircleCheck,
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

import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";
import { AnyType } from "@/core/kernel/types";

import { BadgeIconPort } from "@/design-system/atoms/badge";

type singleMapping = Record<
  ContributionGithubStatusUnion,
  {
    icon: BadgeIconPort<AnyType>["icon"];
    color: BadgeIconPort<AnyType>["color"];
  }
>;

const PullRequestBadgeMapping: Partial<singleMapping> = {
  OPEN: {
    icon: { component: GitPullRequestArrow },
    color: "success",
  },
  MERGED: {
    icon: { component: GitMerge },
    color: "brand",
  },
  DRAFT: {
    icon: { component: GitPullRequestArrow },
    color: "grey",
  },
  CLOSED: { icon: { component: GitPullRequestClosed }, color: "error" },
};

const IssueBadgeMapping: Partial<singleMapping> = {
  OPEN: { icon: { component: CircleDot }, color: "success" },
  COMPLETED: { icon: { component: CircleCheck }, color: "brand" },
  CANCELLED: { icon: { component: CircleSlash }, color: "error" },
};

const CodeReviewBadgeMapping: Partial<singleMapping> = {
  PENDING: { icon: { component: Clipboard }, color: "success" },
  APPROVED: { icon: { component: ClipboardCheck }, color: "success" },
  CHANGES_REQUESTED: { icon: { component: ClipboardList }, color: "brand" },
  COMMENTED: { icon: { component: ClipboardPen }, color: "brand" },
  DISMISSED: { icon: { component: ClipboardX }, color: "error" },
};

export const ContributionBadgeMapping: Record<ContributionTypeUnion, Partial<singleMapping>> = {
  PULL_REQUEST: PullRequestBadgeMapping,
  ISSUE: IssueBadgeMapping,
  CODE_REVIEW: CodeReviewBadgeMapping,
};
