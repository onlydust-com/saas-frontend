import { Skeleton, SkeletonPort } from "@/design-system/atoms/skeleton";

export function TableRowLoading({ background }: { background?: SkeletonPort["background"] }) {
  return (
    <Skeleton
      background={background}
      classNames={{
        base: "w-full h-14",
      }}
    />
  );
}
