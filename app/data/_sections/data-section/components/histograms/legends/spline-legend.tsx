import { GitCommitHorizontal } from "lucide-react";
import { PropsWithChildren, useMemo } from "react";

import { SplineType } from "@/app/data/_sections/data-section/components/histograms/histograms.types";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

interface SplineLegendProps extends PropsWithChildren {
  splineType: SplineType;
}

export function SplineLegend({ splineType, children }: SplineLegendProps) {
  const legendToken = useMemo(() => {
    switch (splineType) {
      case "grant":
        return "data:histograms.legends.granted";
      case "reward":
        return "data:histograms.legends.rewarded";
      case "pr":
      default:
        return "data:histograms.legends.prMerged";
    }
  }, [splineType]);
  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        <Icon component={GitCommitHorizontal} classNames={{ base: "text-text-1" }} />
        <Typo as={"div"} size={"xs"} weight={"medium"} translate={{ token: legendToken }} />
      </div>
      {children}
    </div>
  );
}
