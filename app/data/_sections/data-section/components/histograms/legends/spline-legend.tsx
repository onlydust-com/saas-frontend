import { GitCommitHorizontal } from "lucide-react";
import { PropsWithChildren } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

interface SplineLegendProps extends PropsWithChildren {
  splineType: "grant" | "reward" | "pr";
}

export function SplineLegend({ splineType, children }: SplineLegendProps) {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        <Icon component={GitCommitHorizontal} classNames={{ base: "text-text-1" }} />
        <Typo
          as={"div"}
          size={"xs"}
          weight={"medium"}
          translate={{ token: `data:histograms.legends.${splineType}ed` }}
        />
      </div>
      {children}
    </div>
  );
}
