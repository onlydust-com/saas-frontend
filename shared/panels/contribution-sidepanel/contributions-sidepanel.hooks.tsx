import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { bootstrap } from "@/core/bootstrap";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionAs, ContributionAsUnion } from "@/core/domain/contribution/models/contribution.types";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { AssignContributors } from "@/shared/panels/contribution-sidepanel/_features/assign-contributors/assign-contributors";
import { Assignees } from "@/shared/panels/contribution-sidepanel/_features/assignees/assignees";
import { Description } from "@/shared/panels/contribution-sidepanel/_features/description/description";
import { GithubComment } from "@/shared/panels/contribution-sidepanel/_features/github-comment/github-comment";
import { IssueAppliedKpi } from "@/shared/panels/contribution-sidepanel/_features/issue-applied-kpi/issue-applied-kpi";
import { IssueOverview } from "@/shared/panels/contribution-sidepanel/_features/issue-overview/issue-overview";
import { LinkedIssues } from "@/shared/panels/contribution-sidepanel/_features/linked-issues/linked-issues";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

import { Helper } from "./_features/helper/helper";
import { RewardedCardWrapper } from "./_features/rewarded-card-wrapper/rewarded-card-wrapper";

export function useContributionsSidepanel() {
  return useSinglePanelContext<ContributionsPanelData>("contribution-details");
}

interface UseContributionBlocks {
  as?: ContributionAsUnion;
  contribution: ContributionActivityInterface | undefined;
  helperState: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  };
}

function useContributionBlocksAsMaintainer({ contribution, helperState }: UseContributionBlocks) {
  if (!contribution) {
    return null;
  }

  if (contribution.isNotAssigned()) {
    return (
      <>
        <Helper
          type={contribution.activityStatus}
          open={helperState.isOpen}
          onClose={() => helperState.setIsOpen(false)}
        />
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} />
        <AssignContributors contributionId={contribution.id} repoId={contribution.repo.id} />
      </>
    );
  }

  if (contribution.isInProgress()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} />
        <Assignees showRemove={true} contribution={contribution} />
        {/* KEEP THIS */}
        {/*<Timeline id={contribution.id} />*/}
      </>
    );
  }

  if (contribution.isToReview()) {
    return (
      <>
        <Helper
          type={contribution.activityStatus}
          open={helperState.isOpen}
          onClose={() => helperState.setIsOpen(false)}
        />
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} />
        <LinkedIssues issues={contribution.linkedIssues} />
        <Assignees contribution={contribution} />
        {/* KEEP THIS */}
        {/*<Timeline id={contribution.id} />*/}
      </>
    );
  }

  if (contribution.isArchived() || contribution.isDone()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} />
        <Assignees contribution={contribution} />
        {/* KEEP THIS */}
        {/*<Timeline id={contribution.id} />*/}
      </>
    );
  }
}

function useContributionBlocksAsContributor({ contribution }: UseContributionBlocks) {
  const { githubUserId } = useAuthUser();
  const recipientIds = githubUserId ? [githubUserId] : undefined;
  const dateKernelPort = bootstrap.getDateKernelPort();

  const contributorApplicationId =
    contribution?.applicants.find(applicant => applicant.githubUserId === githubUserId)?.applicationId ?? "";

  const { data: application } = ApplicationReactQueryAdapter.client.useGetApplicationById({
    pathParams: { applicationId: contributorApplicationId },
    options: {
      enabled: !!contributorApplicationId,
    },
  });

  if (!contribution) {
    return null;
  }

  // Applied
  if (contribution.isNotAssigned()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} recipientIds={recipientIds} />
        <IssueAppliedKpi
          applicants={contribution.applicants.length}
          comments={contribution.githubCommentCount}
          openSince={parseInt(dateKernelPort.formatDistanceToNow(new Date(contribution.createdAt), { unit: "day" }))}
        />
        <Description description={contribution.githubBody} />
        <GithubComment comment={application?.githubComment} />
      </>
    );
  }

  // Assigned issue
  if (contribution.isInProgress()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} recipientIds={recipientIds} />
        {/*<UserCard title={{ translate: {token: "panels:contribution.userCard.assignedBy" }}} user={} />*/}
        <Description description={contribution.githubBody} />
        {/*// Timeline*/}
      </>
    );
  }

  // Pending review
  if (contribution.isToReview()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} recipientIds={recipientIds} />
        <Description description={contribution.githubBody} />
        {/*// Timeline*/}
      </>
    );
  }

  // Done
  if (contribution.isArchived() || contribution.isDone()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <RewardedCardWrapper contribution={contribution} recipientIds={recipientIds} />
        {/*<UserCard title={{ translate: {token: "panels:contribution.userCard.mergedBy" }}} user={} />*/}
        <Description description={contribution.githubBody} />
        {/*// Timeline*/}
      </>
    );
  }
}

export function useContributionBlocks(props: UseContributionBlocks) {
  const maintainer = useContributionBlocksAsMaintainer(props);
  const contributor = useContributionBlocksAsContributor(props);

  if (props.as === ContributionAs.MAINTAINER) {
    return maintainer;
  }

  if (props.as === ContributionAs.CONTRIBUTOR) {
    return contributor;
  }

  return null;
}
