import { ReactNode } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { StatsProps } from "./stats.types";

function Stat({ label, value, border = true }: { label: TranslateProps; value: ReactNode; border?: boolean }) {
  return (
    <div className={cn("flex flex-1 flex-col gap-px px-4", { "border-r-1 border-border-primary": border })}>
      <Typo size="xs" color="secondary" translate={label} />
      <div className="flex w-full flex-row items-center justify-between">
        <Typo size="xs" variant="heading" weight="medium">
          {value}
        </Typo>
      </div>
    </div>
  );
}

export function Stats({ contributors = 0, prMerged = 0, stars = 0, issues = 0 }: StatsProps) {
  return (
    <div className="flex w-full flex-row items-stretch justify-start gap-4 border-b-1 border-border-primary py-4">
      <Stat label={{ token: "project:details.overview.stats.contributors" }} value={contributors} />
      <Stat label={{ token: "project:details.overview.stats.prMerged" }} value={prMerged} />
      <Stat label={{ token: "project:details.overview.stats.stars" }} value={stars} />
      <Stat label={{ token: "project:details.overview.stats.issues" }} value={issues} border={false} />
    </div>
  );
}
