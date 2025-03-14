import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { Badge } from "@/shared/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { TypographyH4, TypographySmall } from "@/shared/ui/typography";

interface ScoreDetailsPopoverProps {
  row: LeaderboardInterface;
}

export function ScoreDetailsPopover({ row }: ScoreDetailsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Badge variant="emphasis">
          <TypographyH4>{row.finalScore}</TypographyH4>
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="max-w-[400px] p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <TypographySmall className="text-muted-foreground">Work Score</TypographySmall>
            <Badge variant="outline">{row.totalWorkScore}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <TypographySmall className="text-muted-foreground">Project Coefficient</TypographySmall>
            <Badge variant="outline">
              x{(row.totalWorkScoreAffectedByProjectCoefficient / row.totalWorkScore).toFixed(2)}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <TypographySmall className="text-muted-foreground">Fidelity Bonus</TypographySmall>
            <Badge variant="outline">{row.totalFidelityBonus}</Badge>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
