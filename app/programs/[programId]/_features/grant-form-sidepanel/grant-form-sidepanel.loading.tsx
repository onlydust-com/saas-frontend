import { Skeleton } from "@/design-system/atoms/skeleton";

export function GrantFormSidepanelLoading() {
  return (
    <div className={"grid gap-3"}>
      <Skeleton classNames={{ base: "h-16" }} />
      <Skeleton classNames={{ base: "h-72" }} />
      <Skeleton classNames={{ base: "h-72" }} />
    </div>
  );
}
