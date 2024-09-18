import { Skeleton } from "@/design-system/atoms/skeleton";

export function ActivityGraphLoading() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1.5">
      {Array.from({ length: 7 }, (_, indexRow) => (
        <div key={`row-${indexRow}`} className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex w-full flex-row items-center justify-start gap-1.5">
            {Array.from({ length: 8 }, (_, indexWeek) => (
              <Skeleton key={`week-${indexRow}-${indexWeek}`} className="h-6 w-6 rounded-[2px]" />
            ))}
          </div>
          {indexRow % 2 !== 1 ? <Skeleton className={"h-4 w-1/3"} /> : <div />}
        </div>
      ))}
    </div>
  );
}
