import { Skeleton } from "@/design-system/atoms/skeleton";

export function ContributorProfileCheckboxLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-20",
      }}
    />
  );
}
