import { CircleCheck, CircleX, GitPullRequest, Medal, Undo2 } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { AcceptIgnoreApplication } from "@/shared/components/mutation/application/accept-ignore-application/accept-ignore-application";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ApplicationCardProps } from "./application-card.types";

export function ApplicationCard({ application, contributionId, isIgnored, repoId }: ApplicationCardProps) {
  const { applicationId = "", contributor, rewardCount, prCount } = application;
  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <Paper background="transparent" border="none" classNames={{ base: "flex gap-md justify-between" }}>
      <div className="flex gap-lg">
        <Avatar size="sm" shape="squared" src={contributor.avatarUrl} />

        <div className="flex flex-col gap-md">
          <div className="flex flex-col">
            <Typo size="sm" weight="medium">
              {contributor.login}
            </Typo>

            <Typo size="xs" color="secondary">
              {application.contributor.rank.getTitle().wording} • {application.contributor.rank.getRank()}
              {" • "}
              <Translate token={"panels:contributor.rank"} count={application.contributor.globalRankPercentile} />
            </Typo>
          </div>

          <div className="flex flex-wrap gap-md">
            <Badge
              size="xs"
              icon={{
                component: Medal,
              }}
            >
              {rewardCount.value}
            </Badge>

            <Badge
              size="xs"
              icon={{
                component: GitPullRequest,
              }}
            >
              {prCount.value}
            </Badge>

            {application.appliedAt ? (
              <Badge size="xs">{dateKernelPort.format(new Date(application.appliedAt), "dd.MM.yyyy")}</Badge>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex gap-md">
        <AcceptIgnoreApplication applicationId={applicationId} contributionId={contributionId} repoId={repoId}>
          {({ accept, ignore, unignore, isUpdating }) => (
            <>
              {!isIgnored ? (
                <Button
                  variant="secondary"
                  size="xs"
                  iconOnly
                  startIcon={{
                    component: CircleX,
                  }}
                  onClick={ignore}
                  isLoading={isUpdating}
                />
              ) : (
                <Button
                  variant="secondary"
                  size="xs"
                  iconOnly
                  startIcon={{
                    component: Undo2,
                  }}
                  onClick={unignore}
                  isLoading={isUpdating}
                />
              )}

              <Button
                variant="secondary"
                size="xs"
                iconOnly
                startIcon={{
                  component: CircleCheck,
                }}
                onClick={accept}
                isDisabled={isUpdating}
              />
            </>
          )}
        </AcceptIgnoreApplication>
      </div>
    </Paper>
  );
}
