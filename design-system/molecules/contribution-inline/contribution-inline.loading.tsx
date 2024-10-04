import { Skeleton } from "@/design-system/atoms/skeleton";
import { ContributionBadgeLoading } from "@/design-system/molecules/contribution-badge";

export function ContributionInlineLoading() {
  return (
    <div className={"flex items-center gap-xs"}>
      <ContributionBadgeLoading />
      <Skeleton classNames={{ base: "w-[100px] h-4" }} />
    </div>
  );
}
