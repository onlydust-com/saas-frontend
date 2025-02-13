import { User } from "lucide-react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { Stat } from "@/shared/components/stat/stat";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

import { QuestCardProps } from "./quest-card.types";

export function QuestCard({
  projectSlug,
  name,
  shortDescription,
  wantedProfiles,
  requiredSkills,
  startDate,
  endDate,
  onClick,
}: QuestCardProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });
  return (
    <Card className="flex cursor-pointer flex-col gap-4 transition-opacity hover:opacity-80" onClick={onClick}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={project?.logoUrl} alt={projectSlug} />
          <AvatarFallback>{projectSlug.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="capitalize">{projectSlug}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <TypographyH4>{name}</TypographyH4>
          <TypographyMuted>{shortDescription}</TypographyMuted>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Squad</label>
          <div className="flex gap-2">
            {Object.entries(wantedProfiles).map(([key, value]) => (
              <Card key={key} className="flex-1 p-4">
                <Stat
                  label={key}
                  value={`${Intl.NumberFormat().format(value.provided.length)} / ${Intl.NumberFormat().format(value.wanted)}`}
                  iconProps={{
                    component: User,
                    classNames: {
                      base: "text-utility-secondary-yellow-500",
                    },
                  }}
                />
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Expected skills</label>
          <div className="flex gap-2">
            {requiredSkills.map(skill => (
              <Badge variant="outline" key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Duration</label>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{dateKernelPort.format(new Date(startDate), "yyyy-MM-dd")}</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="outline">{dateKernelPort.format(new Date(endDate), "yyyy-MM-dd")}</Badge>
            <Badge variant="secondary" className="ml-2">
              {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </Badge>
            <Badge variant="destructive">
              Starting in {Math.ceil((new Date(startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
              days
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
