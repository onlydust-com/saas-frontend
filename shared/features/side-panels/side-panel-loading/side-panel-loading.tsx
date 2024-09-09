import { Skeleton } from "@/design-system/atoms/skeleton";

export function SidePanelLoading() {
  return (
    <div className={"flex h-full flex-col gap-px"}>
      <Skeleton classNames={{ base: "h-16 rounded-b-none" }} />
      <Skeleton classNames={{ base: "flex-1 rounded-none" }} />
      <Skeleton classNames={{ base: "h-16 rounded-t-none" }} />
    </div>
  );
}
