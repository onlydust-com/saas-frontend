import { Skeleton } from "@/design-system/atoms/skeleton";

export function CardContributionKanbanLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-44",
      }}
    />
  );
}
