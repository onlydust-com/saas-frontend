import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyP } from "@/shared/ui/typography";

import { ActionableTipsProps } from "./actionable-tips.types";

export function ActionableTips({ projectSlug }: ActionableTipsProps) {
  return (
    <Card className={"flex flex-col gap-4 bg-gradient-to-br from-blue-950 to-transparent to-50% p-4"}>
      <TypographyH3>Actionable Tips</TypographyH3>

      <TypographyP>This project&apos;s available issues, ready for contributions.</TypographyP>
    </Card>
  );
}
