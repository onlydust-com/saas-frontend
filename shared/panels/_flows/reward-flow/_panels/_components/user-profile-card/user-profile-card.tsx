import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { TimelineContribution } from "@/design-system/molecules/timeline-contribution";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";
import { ProfileCardLoading } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card.loading";
import { UserProfileCardProps } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-profile-card/user-profile-card.types";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export function UserProfileCard({ timelineContributionProps }: UserProfileCardProps) {
  const { selectedGithubUserIds } = useRewardFlow();

  const [selectedGithubUserId] = selectedGithubUserIds;

  const { data, isLoading, isError } = UserReactQueryAdapter.client.useGetUserById({
    pathParams: { githubId: selectedGithubUserId },
    options: {
      enabled: Boolean(selectedGithubUserId),
    },
  });

  if (isLoading) {
    return <ProfileCardLoading />;
  }

  if (!data || isError) return null;

  return (
    <ProfileCard
      user={data}
      footerContent={timelineContributionProps ? <TimelineContribution {...timelineContributionProps} /> : undefined}
    />
  );
}
