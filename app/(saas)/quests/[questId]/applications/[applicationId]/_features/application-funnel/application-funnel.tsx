import { ArrowRight, MoveDownRight, MoveUpRight } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted, TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { ApplicationFunnelProps } from "./application-funnel.types";

function FunnelStep({
  label,
  percentage,
  total,
  current,
}: {
  label: string;
  percentage: number;
  total?: number;
  current: number;
}) {
  const isDown = (total || 0) - current >= 0;
  return (
    <div className="flex h-full flex-1 flex-col gap-2">
      <div className="flex h-[300px] flex-col justify-end overflow-hidden rounded-md bg-purple-950 [background-image:linear-gradient(45deg,rgba(0,0,0,.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,.1)_50%,rgba(0,0,0,.1)_75%,transparent_75%)] [background-size:20px_20px]">
        <div className="w-full bg-purple-600" style={{ height: `${percentage}%` }} />
      </div>
      <div className="flex flex-col gap-1">
        <TypographyP>{label}</TypographyP>
        <div className="flex flex-row items-center justify-start gap-2">
          <ArrowRight className="h-4 w-4 text-blue-500" />
          <TypographyMuted>{current} issues</TypographyMuted>
        </div>
        {total ? (
          <>
            {isDown ? (
              <div className="flex flex-row items-center justify-start gap-2">
                <MoveDownRight className="h-4 w-4 text-red-500" />
                <TypographyMuted>{total - current} issues</TypographyMuted>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-start gap-2">
                <MoveUpRight className="h-4 w-4 text-green-500" />
                <TypographyMuted>{current - total} issues</TypographyMuted>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export function ApplicationFunnel({
  issueAppliedCount,
  issueAssignedCount,
  issueCompletedCount,
}: ApplicationFunnelProps) {
  const appliedPercentage = (issueAssignedCount / issueAppliedCount) * 100;
  const assignedPercentage = (issueCompletedCount / issueAppliedCount) * 100;

  // exemple 200 completed issue mais que 150 applied
  return (
    <Card className={cn("flex flex-col gap-4 p-4")}>
      <header className={"flex items-center gap-2"}>
        <TypographyH3>Application Funnel</TypographyH3>
      </header>

      <TypographyP>
        This is the application funnel for the contributor. It shows the steps that the contributor has taken to apply
        to the quest.
      </TypographyP>

      <div className="flex flex-row gap-2">
        <FunnelStep label="Applied issues" percentage={100} current={issueAppliedCount} />
        <FunnelStep
          label="Assigned issues"
          percentage={appliedPercentage}
          total={issueAppliedCount}
          current={issueAssignedCount}
        />
        <FunnelStep
          label="Completed issues"
          percentage={assignedPercentage}
          total={issueAssignedCount}
          current={issueCompletedCount}
        />
      </div>
    </Card>
  );
}
