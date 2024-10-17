import { CircleCheck, CircleX, GitPullRequest, Medal } from "lucide-react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ApplicationCardProps } from "./application-card.types";

export function ApplicationCard({ application, contributionGithubId, isIgnored }: ApplicationCardProps) {
  const { applicationId = "", contributor, rewardCount, prCount } = application;

  // const dateKernelPort = bootstrap.getDateKernelPort();

  const { mutate: ignoreApplicationMutate, isPending: ignoreApplicationIsPending } =
    ApplicationReactQueryAdapter.client.usePatchApplication({
      pathParams: {
        applicationId,
      },
    });

  const { mutate: acceptApplicationMutate, isPending: acceptApplicationIsPending } =
    ApplicationReactQueryAdapter.client.useAcceptApplication({
      pathParams: {
        applicationId,
      },
      invalidateTagParams: {
        contribution: {
          pathParams: {
            contributionGithubId,
          },
        },
      },
    });

  function handleIgnoreApplication() {
    ignoreApplicationMutate({ isIgnored: true });
  }

  function handleApproveApplication() {
    acceptApplicationMutate({});
  }

  return (
    <Paper background="transparent" border="none" classNames={{ base: "flex gap-md justify-between" }}>
      <div className="flex gap-lg">
        <Avatar size="sm" shape="squared" src={contributor.avatarUrl} />

        <div className="flex flex-col gap-md">
          <div className="flex flex-col">
            <Typo size="sm" weight="medium">
              {contributor.login}
            </Typo>

            {/* TODO https://linear.app/onlydust/issue/E-2154/[contributor]-add-global-ranking-info-to-contributorresponse */}
            {/*<Typo size="xs" color="secondary">*/}
            {/*  {application.getApplicantTitle().wording} • {application.getRank()}*/}
            {/*  {" • "}*/}
            {/*  <Translate token={"panels:contributor.rank"} count={applicant.globalRankPercentile} />*/}
            {/*</Typo>*/}
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

            {/* TODO https://linear.app/onlydust/issue/E-2154/[contributor]-add-global-ranking-info-to-contributorresponse */}
            {/*<Badge size="xs">{dateKernelPort.format(new Date(application.receivedAt), "dd.MM.yyyy")}</Badge>*/}
          </div>
        </div>
      </div>

      <div className="flex gap-md">
        {!isIgnored ? (
          <Button
            variant="secondary"
            size="xs"
            iconOnly
            startIcon={{
              component: CircleX,
            }}
            onClick={handleIgnoreApplication}
            isDisabled={ignoreApplicationIsPending || acceptApplicationIsPending}
          />
        ) : null}

        <Button
          variant="secondary"
          size="xs"
          iconOnly
          startIcon={{
            component: CircleCheck,
          }}
          onClick={handleApproveApplication}
          isDisabled={ignoreApplicationIsPending || acceptApplicationIsPending}
        />
      </div>
    </Paper>
  );
}
