import { Skeleton } from "@/design-system/atoms/skeleton";

export function ProfileCardLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-20",
      }}
    />
  );
}
