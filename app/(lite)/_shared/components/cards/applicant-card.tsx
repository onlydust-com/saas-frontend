import { ArrowRight } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

export function ApplicantCard({
  avatarUrl,
  login,
  rank,
  appliedAt,
  languages,
}: {
  avatarUrl: string;
  login: string;
  rank?: string;
  appliedAt?: string;
  languages?: { id: string; name: string; logoUrl: string }[];
}) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <Card className="flex flex-col gap-3 p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{login.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <TypographyP>{login}</TypographyP>
            {rank ? <TypographyMuted>{rank}</TypographyMuted> : null}
          </div>
        </div>

        <TypographyMuted>{appliedAt ? dateKernelPort.formatDistanceToNow(new Date(appliedAt)) : null}</TypographyMuted>
      </div>

      <div className="flex items-center justify-between">
        {languages?.length ? (
          <div className="flex flex-wrap gap-1">
            {languages.map(language => (
              <Avatar key={language.id} className="size-5">
                <AvatarImage src={language.logoUrl} />
                <AvatarFallback>{language.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        ) : (
          <div />
        )}

        <Button variant="secondary" size="sm">
          View
          <ArrowRight />
        </Button>
      </div>
    </Card>
  );
}
