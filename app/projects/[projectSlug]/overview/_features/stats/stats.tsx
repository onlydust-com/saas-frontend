import { CircleDot, GitMerge, Star, User } from "lucide-react";

import { Stat } from "@/shared/components/stat/stat";

import { StatsProps } from "./stats.types";

export function Stats({ contributors = 0, prMerged = 0, stars = 0, issues = 0 }: StatsProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-y-lg border-b-1 border-border-primary py-4 tablet:grid-cols-4 tablet:gap-0">
      <div className="border-r-1 border-border-primary px-4">
        <Stat
          label={"Contributors"}
          value={Intl.NumberFormat().format(contributors)}
          iconProps={{
            component: User,
            classNames: {
              base: "text-utility-secondary-yellow-500",
            },
          }}
        />
      </div>
      <div className="border-r-1 border-border-primary px-4">
        <Stat
          label={"PRs merged"}
          value={Intl.NumberFormat().format(prMerged)}
          iconProps={{
            component: GitMerge,
            classNames: {
              base: "text-utility-brand-crystalizedviolet-500",
            },
          }}
        />
      </div>
      <div className="border-r-1 border-border-primary px-4">
        <Stat
          label={"Stars"}
          value={Intl.NumberFormat().format(stars)}
          iconProps={{
            component: Star,
            classNames: {
              base: "text-utility-secondary-blue-500",
            },
          }}
        />
      </div>
      <div className="px-4">
        <Stat
          label={"Issues"}
          value={Intl.NumberFormat().format(issues)}
          iconProps={{
            component: CircleDot,
            classNames: {
              base: "text-utility-secondary-green-500",
            },
          }}
        />
      </div>
    </div>
  );
}
