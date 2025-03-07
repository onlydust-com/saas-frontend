import { bootstrap } from "@/core/bootstrap";

import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

export function Metrics({
  applicantsCount,
  commentsCount,
  createdAt,
}: {
  applicantsCount: number;
  commentsCount: number;
  createdAt: string;
}) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const openedSince = dateKernelPort.formatDistanceToNow(new Date(createdAt), { unit: "day", addSuffix: false });

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="flex flex-col gap-1 p-3">
        <TypographyMuted>Applicants</TypographyMuted>
        <TypographyH4>{applicantsCount}</TypographyH4>
      </Card>

      <Card className="flex flex-col gap-1 p-3">
        <TypographyMuted>Comments</TypographyMuted>
        <TypographyH4>{commentsCount}</TypographyH4>
      </Card>

      <Card className="flex flex-col gap-1 p-3">
        <TypographyMuted>Opened since</TypographyMuted>
        <TypographyH4>{openedSince}</TypographyH4>
      </Card>
    </div>
  );
}
