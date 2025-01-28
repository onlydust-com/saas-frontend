import { CircleDot, Folder, GitPullRequest, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

import { Stat } from "@/shared/components/stat/stat";
import { useStatDiffFormatter } from "@/shared/hooks/stats/use-stat-diff-formatter";

import { UserStatsProps } from "./user-stats.types";

export function UserStats({ rewardCount, projectCount, inProgressIssueCount, prCount }: UserStatsProps) {
  const { t } = useTranslation();
  const { formatDiff, getBadgeColor } = useStatDiffFormatter();

  return (
    <div className="grid w-full grid-cols-2 gap-y-xl border-b-1 border-border-primary py-lg tablet:grid-cols-4 tablet:gap-0">
      <div className="border-r-1 border-border-primary px-lg">
        <Stat
          label={t("users:details.overview.stats.rewardCount")}
          value={Intl.NumberFormat().format(rewardCount?.value ?? 0)}
          iconProps={{
            component: User,
            classNames: {
              base: "text-utility-secondary-yellow-500",
            },
          }}
          badgeProps={
            rewardCount !== undefined && rewardCount.diff !== undefined
              ? {
                  children: (
                    <Typo size="xs" classNames={{ base: "text-inherit" }}>
                      {formatDiff(rewardCount.diff)}
                    </Typo>
                  ),
                  color: getBadgeColor(rewardCount.diff),
                  variant: "solid",
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-lg tablet:border-r-1">
        <Stat
          label={t("users:details.overview.stats.contributionCount")}
          value={Intl.NumberFormat().format(projectCount?.value ?? 0)}
          iconProps={{
            component: Folder,
            classNames: {
              base: "text-utility-secondary-blue-500",
            },
          }}
        />
      </div>
      <div className="border-border-primary px-lg tablet:border-r-1">
        <Stat
          label={t("users:details.overview.stats.inProgressIssueCount")}
          value={Intl.NumberFormat().format(inProgressIssueCount ?? 0)}
          iconProps={{
            component: CircleDot,
            classNames: {
              base: "text-utility-secondary-green-500",
            },
          }}
        />
      </div>
      <div className="border-border-primary px-lg tablet:border-r-1">
        <Stat
          label={t("users:details.overview.stats.prCount")}
          value={Intl.NumberFormat().format(prCount?.value ?? 0)}
          iconProps={{
            component: GitPullRequest,
            classNames: {
              base: "text-utility-brand-crystalizedviolet-500",
            },
          }}
          badgeProps={
            prCount !== undefined && prCount.diff !== undefined
              ? {
                  children: (
                    <Typo size="xs" classNames={{ base: "text-inherit" }}>
                      {formatDiff(prCount.diff)}
                    </Typo>
                  ),
                  color: getBadgeColor(prCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
