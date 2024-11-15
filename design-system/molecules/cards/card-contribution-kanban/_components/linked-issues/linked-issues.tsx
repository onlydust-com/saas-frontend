import { ContributionInline } from "@/design-system/molecules/contribution-inline";
import { TimelineContribution } from "@/design-system/molecules/timeline-contribution";

import { LinkedIssuesProps } from "./linked-issues.types";

export function LinkedIssues({ linkedIssues }: LinkedIssuesProps) {
  if (!linkedIssues?.length) return null;

  const linkedIssuesCount = linkedIssues.length;

  if (linkedIssuesCount === 1) {
    const [linkedIssue] = linkedIssues;

    return (
      <ContributionInline
        contributionBadgeProps={{
          type: linkedIssue.type,
          githubStatus: linkedIssue.githubStatus,
          number: linkedIssue.githubNumber,
        }}
        githubTitle={linkedIssue.githubTitle}
        truncate
      />
    );
  }

  return (
    <TimelineContribution
      titleProps={{
        translate: {
          token: "cards:cardContributionKanban.linkedIssues",
          values: { count: linkedIssuesCount },
        },
      }}
      contributions={linkedIssues.map(issue => {
        return {
          githubTitle: issue.githubTitle,
          contributionBadgeProps: {
            type: issue.type,
            githubStatus: issue.githubStatus,
            number: issue.githubNumber,
          },
        };
      })}
    />
  );
}
