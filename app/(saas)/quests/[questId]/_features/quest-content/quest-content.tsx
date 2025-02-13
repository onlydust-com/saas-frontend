import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyH2, TypographyMuted, TypographyP } from "@/shared/ui/typography";

import { QuestItemData } from "../../../_data/quest-item.data";
import { IssueItem } from "../issue-item/issue-item";
import { SquadItem } from "../squad-item/squad-item";
import { QuestContentProps } from "./quest-content.types";

export function QuestContent({ questId }: QuestContentProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const quest = QuestItemData;
  const { startDate, endDate, maintainers, issues } = quest;

  const providedProfiles = Object.entries(quest.wantedProfiles).flatMap(([_, value]) =>
    value.provided.map(githubId => ({
      githubId,
    }))
  );

  const wantedProfiles = Object.entries(quest.wantedProfiles).flatMap(([_, value]) =>
    Array(value.wanted).fill({
      githubId: undefined,
      skills: quest.requiredSkills,
    })
  );
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-2">
          <TypographyMuted>Quest?</TypographyMuted>
          <CardTitle>
            <TypographyH2>{quest.name}</TypographyH2>
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{dateKernelPort.format(new Date(startDate), "yyyy-MM-dd")}</Badge>
          <span className="text-muted-foreground">→</span>
          <Badge variant="outline">{dateKernelPort.format(new Date(endDate), "yyyy-MM-dd")}</Badge>
          <Badge variant="secondary" className="ml-2">
            {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days
          </Badge>
          <Badge variant="destructive">
            Starting in {Math.ceil((new Date(startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
          </Badge>
        </div>
        <TypographyP>{quest.longDescription}</TypographyP>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TypographyMuted>Squad</TypographyMuted>
          <div className="flex flex-row gap-2">
            {providedProfiles.map(({ githubId }) => (
              <SquadItem key={githubId} githubId={githubId} skills={quest.requiredSkills} />
            ))}
            {wantedProfiles.map(({ githubId }, index) => (
              <SquadItem key={index} githubId={githubId} skills={quest.requiredSkills} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TypographyMuted>Maintainers</TypographyMuted>
          <div className="flex flex-row gap-2">
            {maintainers.map(githubId => (
              <SquadItem key={githubId} githubId={githubId} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TypographyMuted>Issues</TypographyMuted>
          <div className="flex flex-col gap-2">
            {issues.map(issueId => (
              <IssueItem key={issueId} issueId={issueId} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
