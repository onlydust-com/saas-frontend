import { CircleCheck, CircleX, GitPullRequest, Medal } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

import { ApplicationCardProps } from "./application-card.types";

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { applicant } = application;

  const dateKernelPort = bootstrap.getDateKernelPort();

  function handleCancelApplication() {
    console.log("cancel application");
  }

  function handleApproveApplication() {
    console.log("approve application");
  }

  return (
    <Paper background="transparent" border="none" classNames={{ base: "flex gap-md justify-between" }}>
      <div className="flex gap-lg">
        <Avatar size="sm" shape="squared" src={applicant.avatarUrl} />

        <div className="flex flex-col gap-md">
          <div className="flex flex-col">
            <Typo size="sm" weight="medium">
              {applicant.login}
            </Typo>

            <Typo size="xs" color="secondary">
              {application.getApplicantTitle().wording} • {application.getRank()}
              {" • "}
              <Translate token={"panels:contributor.rank"} count={applicant.globalRankPercentile} />
            </Typo>
          </div>

          <div className="flex flex-wrap gap-md">
            <Badge
              size="xs"
              icon={{
                component: Medal,
              }}
            >
              {applicant.rewardCount}
            </Badge>

            <Badge
              size="xs"
              icon={{
                component: GitPullRequest,
              }}
            >
              {applicant.prCount}
            </Badge>

            <Badge size="xs">{dateKernelPort.format(new Date(application.receivedAt), "dd.MM.yyyy")}</Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-md">
        <Button
          variant="secondary"
          size="xs"
          iconOnly
          startIcon={{
            component: CircleX,
          }}
          onClick={handleCancelApplication}
        />

        <Button
          variant="secondary"
          size="xs"
          iconOnly
          startIcon={{
            component: CircleCheck,
          }}
          onClick={handleApproveApplication}
        />
      </div>
    </Paper>
  );
}
