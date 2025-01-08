import { CircleDot } from "lucide-react";
import { useMemo } from "react";

import { Icon } from "@/design-system/atoms/icon/variants/icon-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

import { IssueButtonProps } from "./issue-button.types";

export function IssueButton({ issueCount, issueType, slug }: IssueButtonProps) {
  const issueTypeLabel = useMemo(() => {
    if (issueType === "AVAILABLE_ISSUE") {
      return "common:count.openIssues";
    }
    if (issueType === "GOOD_FIRST_ISSUE") {
      return "common:count.goodFirstIssues";
    }
    return "common:count.odhack";
  }, [issueType]);

  const startContent = useMemo(() => {
    if (issueType === "AVAILABLE_ISSUE") {
      return <Icon component={CircleDot} size="lg" classNames={{ base: "text-utility-secondary-green-500" }} />;
    }
    return (
      <div className={"relative mr-0.5 size-1.5"}>
        <div className="absolute -inset-px animate-ping rounded-full bg-utility-secondary-green-500 opacity-75" />
        <div className="size-full rounded-full bg-utility-secondary-green-500" />
      </div>
    );
  }, [issueType]);

  return (
    <Paper
      as={BaseLink}
      htmlProps={{
        href: marketplaceRouting(MARKETPLACE_ROUTER.projects.details.root(slug)),
      }}
      classNames={{
        base: "flex flex-col gap-0 w-full",
      }}
      background="glass"
      border="primary"
      size="md"
    >
      <Typo
        size="xs"
        color="tertiary"
        translate={{
          token: issueTypeLabel,
        }}
        classNames={{
          base: "line-clamp-1 w-full",
        }}
      />
      <div className="flex items-center gap-md">
        {startContent}
        <Typo size="xs" color="primary" variant="heading">
          {issueCount}
        </Typo>
      </div>
    </Paper>
  );
}
